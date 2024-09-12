import { LRUCacheNode } from './LRUCacheNode';

export interface LRUCacheOptions<TKey, TValue> {
  /**
   * The max number of items the cache can hold. Once the cache reaches this number, the least recently used entries will start to be evicted to make room for new entries. Defaults to 25.
   */
  maxSize?: number;

  /**
   * The time to live for cache entries. Setting this to `null` will make entries never expire. Default value is `null`.
   */
  entryExpirationTimeInMS?: number | null;

  /**
   * Function to be called whenever an entry is evicted from the cache (when evicted due to needing to make room, is expired, or deleted using delete()). Passed argument is an object:
   * ```typescript
   * {
   *   key: TKey;
   *   value: TValue;
   *   isExpired: boolean;
   * }
   * ```
   */
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;

  /**
   * Function to be called whenever an entry is marked as recently used (on set, get, find, etc). Passed argument is an object:
   * ```typescript
   * {
   *   key: TKey;
   *   value: TValue;
   * }
   * ```
   */
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;

  /**
   * Clone values being set and fetched from the cache (clones on set and any retrievals). Useful to maintain immutability.
   * NOTE! This does come with performance overhead (almost twice as slow). Defaults to false.
   */
  clone?: boolean;

  /**
   * Custom function to be used with the `clone` option. If not passed, `JSON.parse(JSON.stringify(value))` is used for cloning objects.
   */
  cloneFn?: (value: TValue) => TValue;
}

export interface LRUCacheSetEntryOptions<TKey, TValue> {
  /**
   * The time to live for this cache entry. Setting this to `null` will make entry never expire. Default value is `null`.
   */
  entryExpirationTimeInMS?: number | null;

  /**
   * Function to be called whenever _this_ entry is evicted from the cache (when evicted due to needing to make room, is expired, or deleted using delete()). Passed argument is an object:
   * ```typescript
   *  {
   *    key: TKey;
   *    value: TValue;
   *    isExpired: boolean;
   *  }
   * ```
   */
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;

  /**
   * Function to be called whenever _this_ entry is marked as recently used (on set, get, find, etc). Passed argument is an object:
   * ```typescript
   *  {
   *    key: TKey;
   *    value: TValue;
   *  }
   * ```
   */
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;

  /**
   * Clone values being set and fetched from the cache (clones on set and any retrievals). Useful to maintain immutability.
   * NOTE! This does come with performance overhead (almost twice as slow). Defaults to false.
   */
  clone?: boolean;

  /**
   * Custom function to be used with the `clone` option. If not passed, `JSON.parse(JSON.stringify(value))` is used for cloning objects.
   */
  cloneFn?: (value: TValue) => TValue;
}

export interface LRUCacheEntry<TKey, TValue> {
  key: TKey;
  value: TValue;
}

/**
 * A key value cache that implements the LRU policy.
 *
 * @typeparam TKey The type of the keys in the cache. Defaults to `string`.
 * @typeparam TValue The type of the values in the cache. Defaults to `any`.
 *
 * @see {@link https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)}
 */
export class LRUCache<TKey = string, TValue = any> implements Iterable<LRUCacheEntry<TKey, TValue>> {
  private readonly lookupTable: Map<TKey, LRUCacheNode<TKey, TValue>> = new Map();

  private readonly entryExpirationTimeInMS: number | null;

  private readonly onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;

  private readonly onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;

  private readonly cloneFn?: (value: TValue) => TValue;

  private readonly clone?: boolean;

  private maxSizeInternal: number;

  private head: LRUCacheNode<TKey, TValue> | null = null;

  private tail: LRUCacheNode<TKey, TValue> | null = null;

  /**
   * Creates a new instance of the LRUCache.
   *
   * @param options Additional configuration options for the LRUCache.
   *
   * @example
   * ```typescript
   * // No options.
   * const cache = new LRUCache();
   *
   * // With options.
   * const cache = new LRUCache({
   *  entryExpirationTimeInMS: 10000
   * });
   * ```
   */
  public constructor(options?: LRUCacheOptions<TKey, TValue>) {
    const {
      maxSize = 25,
      entryExpirationTimeInMS = null,
      onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed,
      cloneFn,
      clone
    } = options ?? {};

    if (Number.isNaN(maxSize) || maxSize <= 0) {
      throw new Error('maxSize must be greater than 0.');
    }

    if (
      typeof entryExpirationTimeInMS === 'number' &&
      (entryExpirationTimeInMS <= 0 || Number.isNaN(entryExpirationTimeInMS))
    ) {
      throw new Error('entryExpirationTimeInMS must either be null (no expiry) or greater than 0');
    }

    this.maxSizeInternal = maxSize;
    this.entryExpirationTimeInMS = entryExpirationTimeInMS;
    this.onEntryEvicted = onEntryEvicted;
    this.onEntryMarkedAsMostRecentlyUsed = onEntryMarkedAsMostRecentlyUsed;
    this.clone = clone;
    this.cloneFn = cloneFn;
  }

  /**
   * Returns the number of entries in the LRUCache object.
   * If the cache has entryExpirationTimeInMS set, expired entries will be removed before the size is returned.
   *
   * @returns The number of entries in the cache.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const size = cache.size;
   *
   * // Will log 1
   * console.log(size);
   * ```
   */
  public get size(): number {
    this.cleanCache();
    return this.lookupTable.size;
  }

  /**
   * Returns the number of entries that can still be added to the LRUCache without evicting existing entries.
   *
   * @returns The number of entries that can still be added without evicting existing entries.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const remainingSize = cache.remainingSize;
   *
   * // Will log 9 due to 9 spots remaining before reaching maxSize of 10.
   * console.log(remainingSize);
   * ```
   */
  public get remainingSize(): number {
    return this.maxSizeInternal - this.size;
  }

  /**
   * Returns the most recently used (newest) entry in the cache.
   * This will not mark the entry as recently used.
   * If the newest node is expired, it will be removed.
   *
   * @returns The most recently used (newest) entry in the cache.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const newest = cache.newest;
   *
   * // Will log testValue
   * console.log(newest.value);
   *
   * // Will log testKey
   * console.log(newest.key);
   * ```
   */
  public get newest(): LRUCacheEntry<TKey, TValue> | null {
    if (!this.head) {
      return null;
    }

    if (this.head.isExpired) {
      this.removeNodeFromListAndLookupTable(this.head);
      return this.newest;
    }

    return this.mapNodeToEntry(this.head);
  }

  /**
   * Returns the least recently used (oldest) entry in the cache.
   * This will not mark the entry as recently used.
   * If the oldest node is expired, it will be removed.
   *
   * @returns The least recently used (oldest) entry in the cache.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const oldest = cache.oldest;
   *
   * // Will log testValue
   * console.log(oldest.value);
   *
   * // Will log testKey
   * console.log(oldest.key);
   * ```
   */
  public get oldest(): LRUCacheEntry<TKey, TValue> | null {
    if (!this.tail) {
      return null;
    }

    if (this.tail.isExpired) {
      this.removeNodeFromListAndLookupTable(this.tail);
      return this.oldest;
    }

    return this.mapNodeToEntry(this.tail);
  }

  /**
   * Gets or sets the maxSize of the cache.
   * This will evict the least recently used entries if needed to reach new maxSize.
   *
   * @param value The new value for maxSize. Must be greater than 0.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * // Will be 10
   * const maxSize = cache.maxSize;
   *
   * // Set new maxSize to 5. If there are more than 5 items in the cache, the least recently used entries will be removed until cache size is 5.
   * cache.maxSize = 5;
   * ```
   */
  public get maxSize(): number {
    return this.maxSizeInternal;
  }

  public set maxSize(value: number) {
    if (Number.isNaN(value) || value <= 0) {
      throw new Error('maxSize must be greater than 0.');
    }

    this.maxSizeInternal = value;

    this.enforceSizeLimit();
  }

  /**
   * Sets the value for the key in the LRUCache object. Returns the LRUCache object.
   * This marks the newly added entry as the most recently used entry.
   * If adding the new entry makes the cache size go above maxSize,
   * this will evict the least recently used entries until size is equal to maxSize.
   *
   * @param key The key of the entry.
   * @param value The value to set for the key.
   * @param entryOptions Additional configuration options for the cache entry.
   *
   * @returns The LRUCache instance.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // Set the key key2 to value value2. Pass in optional options.
   * cache.set('key2', 'value2', { entryExpirationTimeInMS: 10 });
   * ```
   */
  public set(key: TKey, value: TValue, entryOptions?: LRUCacheSetEntryOptions<TKey, TValue>): LRUCache<TKey, TValue> {
    const currentNodeForKey = this.lookupTable.get(key);

    if (currentNodeForKey) {
      this.removeNodeFromListAndLookupTable(currentNodeForKey);
    }

    const node = new LRUCacheNode(key, value, {
      entryExpirationTimeInMS: this.entryExpirationTimeInMS,
      onEntryEvicted: this.onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed: this.onEntryMarkedAsMostRecentlyUsed,
      clone: this.clone,
      cloneFn: this.cloneFn,
      ...entryOptions
    });
    this.setNodeAsHead(node);
    this.lookupTable.set(key, node);

    this.enforceSizeLimit();

    return this;
  }

  /**
   * Returns the value associated to the key, or null if there is none or if the entry is expired.
   * If an entry is returned, this marks the returned entry as the most recently used entry.
   *
   * @param key The key of the entry to get.
   *
   * @returns The cached value or null.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // Will be 'testValue'. Entry will now be most recently used.
   * const item1 = cache.get('testKey');
   *
   * // Will be null
   * const item2 = cache.get('keyNotInCache');
   * ```
   */
  public get(key: TKey): TValue | null {
    const node = this.lookupTable.get(key);

    if (!node) {
      return null;
    }

    if (node.isExpired) {
      this.removeNodeFromListAndLookupTable(node);
      return null;
    }

    this.setNodeAsHead(node);

    return node.value;
  }

  /**
   * Returns the value associated to the key, or null if there is none or if the entry is expired.
   * If an entry is returned, this will not mark the entry as most recently accessed.
   * Useful if a value is needed but the order of the cache should not be changed.
   *
   * @param key The key of the entry to get.
   *
   * @returns The cached value or null.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // Will be 'testValue'
   * const item1 = cache.peek('testKey');
   *
   * // Will be null
   * const item2 = cache.peek('keyNotInCache');
   * ```
   */
  public peek(key: TKey): TValue | null {
    const node = this.lookupTable.get(key);

    if (!node) {
      return null;
    }

    if (node.isExpired) {
      this.removeNodeFromListAndLookupTable(node);
      return null;
    }

    return node.value;
  }

  /**
   * Deletes the entry for the passed in key.
   *
   * @param key The key of the entry to delete
   *
   * @returns True if an element in the LRUCache object existed and has been removed,
   * or false if the element does not exist.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // Will be true
   * const wasDeleted = cache.delete('testKey');
   *
   * // Will be false
   * const wasDeleted2 = cache.delete('keyNotInCache');
   * ```
   */
  public delete(key: TKey): boolean {
    const node = this.lookupTable.get(key);

    if (!node) {
      return false;
    }

    return this.removeNodeFromListAndLookupTable(node);
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key in the LRUCache object or not.
   * This does not mark the entry as recently used.
   * If the cache has a key but the entry is expired, it will be removed and false will be returned.
   *
   * @param key The key of the entry to check if exists
   *
   * @returns true if the cache contains the supplied key. False if not.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // Will be true
   * const wasDeleted = cache.has('testKey');
   *
   * // Will be false
   * const wasDeleted2 = cache.has('keyNotInCache');
   * ```
   */
  public has(key: TKey): boolean {
    const node = this.lookupTable.get(key);

    if (!node) {
      return false;
    }

    if (node.isExpired) {
      this.removeNodeFromListAndLookupTable(node);
      return false;
    }

    return true;
  }

  /**
   * Removes all entries in the cache.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // Clear cache.
   * cache.clear();
   * ```
   */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this.lookupTable.clear();
  }

  /**
   * Searches the cache for an entry matching the passed in condition.
   * Expired entries will be skipped (and removed).
   * If multiply entries in the cache match the condition, the most recently used entry will be returned.
   * If an entry is returned, this marks the returned entry as the most recently used entry.
   *
   * @param condition The condition to apply to each entry in the
   *
   * @returns The first cache entry to match the condition. Null if none match.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * // item will be { key: 'testKey', value: 'testValue }
   * const item = cache.find(entry => {
   *   const { key, value } = entry;
   *
   *   if (key === 'testKey' || value === 'something') {
   *     return true;
   *   }
   *
   *   return false;
   * });
   *
   * // item2 will be null
   * const item2 = cache.find(entry => entry.key === 'notInCache');
   * ```
   */
  public find(condition: (entry: LRUCacheEntry<TKey, TValue>) => boolean): LRUCacheEntry<TKey, TValue> | null {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const next = node.next;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
        continue;
      }

      const entry = this.mapNodeToEntry(node);

      if (condition(entry)) {
        this.setNodeAsHead(node);

        return entry;
      }

      node = node.next;
    }

    return null;
  }

  /**
   * Iterates over and applies the callback function to each entry in the cache.
   * Iterates in order from most recently accessed entry to least recently.
   * Expired entries will be skipped (and removed).
   * No entry will be marked as recently used.
   *
   * @param callback the callback function to apply to the entry
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * cache.forEach((key, value, index) => {
   *   // do something with key, value, and/or index
   * });
   * ```
   */
  public forEach(callback: (value: TValue, key: TKey, index: number) => void): void {
    let node = this.head;
    let index = 0;

    while (node) {
      if (node.isExpired) {
        const next = node.next;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
        continue;
      }

      callback(node.value, node.key, index);
      node = node.next;
      index++;
    }
  }

  /**
   * Creates a Generator which can be used with for ... of ... to iterate over the cache values.
   * Iterates in order from most recently accessed entry to least recently.
   * Expired entries will be skipped (and removed).
   * No entry will be marked as accessed.
   *
   * @returns A Generator for the cache values.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * for (const value of cache.values()) {
   *   // do something with the value
   * }
   * ```
   */
  public *values(): Generator<TValue> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const next = node.next;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
        continue;
      }

      yield node.value;
      node = node.next;
    }
  }

  /**
   * Creates a Generator which can be used with for ... of ... to iterate over the cache keys.
   * Iterates in order from most recently accessed entry to least recently.
   * Expired entries will be skipped (and removed).
   * No entry will be marked as accessed.
   *
   * @returns A Generator for the cache keys.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * for (const key of cache.keys()) {
   *   // do something with the key
   * }
   * ```
   */
  public *keys(): Generator<TKey> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const next = node.next;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
        continue;
      }

      yield node.key;
      node = node.next;
    }
  }

  /**
   * Creates a Generator which can be used with for ... of ... to iterate over the cache entries.
   * Iterates in order from most recently accessed entry to least recently.
   * Expired entries will be skipped (and removed).
   * No entry will be marked as accessed.
   *
   * @returns A Generator for the cache entries.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * for (const entry of cache.entries()) {
   *   const { key, value } = entry;
   *   // do something with the entry
   * }
   * ```
   */
  public *entries(): Generator<LRUCacheEntry<TKey, TValue>> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const next = node.next;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
        continue;
      }

      yield this.mapNodeToEntry(node);
      node = node.next;
    }
  }

  /**
   * Creates a Generator which can be used with for ... of ... to iterate over the cache entries.
   * Iterates in order from most recently accessed entry to least recently.
   * Expired entries will be skipped (and removed).
   * No entry will be marked as accessed.
   *
   * @returns A Generator for the cache entries.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * // Set the key testKey to value testValue
   * cache.set('testKey', 'testValue');
   *
   * for (const entry of cache) {
   *   const { key, value } = entry;
   *   // do something with the entry
   * }
   * ```
   */
  public *[Symbol.iterator](): Generator<LRUCacheEntry<TKey, TValue>> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const next = node.next;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
        continue;
      }

      yield this.mapNodeToEntry(node);
      node = node.next;
    }
  }

  private enforceSizeLimit(): void {
    let node = this.tail;

    while (node !== null && this.size > this.maxSizeInternal) {
      const prev = node.prev;
      this.removeNodeFromListAndLookupTable(node);
      node = prev;
    }
  }

  private mapNodeToEntry({ key, value }: LRUCacheNode<TKey, TValue>): LRUCacheEntry<TKey, TValue> {
    return {
      key,
      value
    };
  }

  private setNodeAsHead(node: LRUCacheNode<TKey, TValue>): void {
    this.removeNodeFromList(node);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    node.invokeOnEntryMarkedAsMostRecentlyUsed();
  }

  private removeNodeFromList(node: LRUCacheNode<TKey, TValue>): void {
    if (node.prev !== null) {
      node.prev.next = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = node.next;
    }

    if (this.tail === node) {
      this.tail = node.prev;
    }

    node.next = null;
    node.prev = null;
  }

  private removeNodeFromListAndLookupTable(node: LRUCacheNode<TKey, TValue>): boolean {
    node.invokeOnEvicted();
    this.removeNodeFromList(node);

    return this.lookupTable.delete(node.key);
  }

  private cleanCache(): void {
    // Don't spend time cleaning if entries don't expire.
    if (!this.entryExpirationTimeInMS) {
      return;
    }

    const expiredNodes: LRUCacheNode<TKey, TValue>[] = [];

    for (const node of this.lookupTable.values()) {
      if (node.isExpired) {
        expiredNodes.push(node);
      }
    }

    expiredNodes.forEach(node => this.removeNodeFromListAndLookupTable(node));
  }
}
