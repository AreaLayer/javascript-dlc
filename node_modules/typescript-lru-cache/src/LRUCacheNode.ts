export interface LRUCacheNodeOptions<TKey, TValue> {
  next?: LRUCacheNode<TKey, TValue> | null;
  prev?: LRUCacheNode<TKey, TValue> | null;
  entryExpirationTimeInMS?: number | null;
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;
  clone?: boolean;
  cloneFn?: (value: TValue) => TValue;
}

export class LRUCacheNode<TKey, TValue> {
  public readonly key: TKey;

  public readonly created: number;

  public readonly entryExpirationTimeInMS: number | null;

  public next: LRUCacheNode<TKey, TValue> | null;

  public prev: LRUCacheNode<TKey, TValue> | null;

  private readonly internalValue: TValue;

  private readonly onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;

  private readonly onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;

  private readonly cloneFn: (value: TValue) => TValue;

  private readonly clone: boolean;

  public constructor(key: TKey, value: TValue, options?: LRUCacheNodeOptions<TKey, TValue>) {
    const {
      entryExpirationTimeInMS = null,
      next = null,
      prev = null,
      onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed,
      clone,
      cloneFn
    } = options ?? {};

    if (
      typeof entryExpirationTimeInMS === 'number' &&
      (entryExpirationTimeInMS <= 0 || Number.isNaN(entryExpirationTimeInMS))
    ) {
      throw new Error('entryExpirationTimeInMS must either be null (no expiry) or greater than 0');
    }

    this.clone = clone ?? false;
    this.cloneFn = cloneFn ?? this.defaultClone;

    this.key = key;
    this.internalValue = this.clone ? this.cloneFn(value) : value;
    this.created = Date.now();
    this.entryExpirationTimeInMS = entryExpirationTimeInMS;
    this.next = next;
    this.prev = prev;
    this.onEntryEvicted = onEntryEvicted;
    this.onEntryMarkedAsMostRecentlyUsed = onEntryMarkedAsMostRecentlyUsed;
  }

  public get value(): TValue {
    return this.clone ? this.cloneFn(this.internalValue) : this.internalValue;
  }

  public get isExpired(): boolean {
    return typeof this.entryExpirationTimeInMS === 'number' && Date.now() - this.created > this.entryExpirationTimeInMS;
  }

  public invokeOnEvicted(): void {
    if (this.onEntryEvicted) {
      const { key, value, isExpired } = this;
      this.onEntryEvicted({ key, value, isExpired });
    }
  }

  public invokeOnEntryMarkedAsMostRecentlyUsed(): void {
    if (this.onEntryMarkedAsMostRecentlyUsed) {
      const { key, value } = this;
      this.onEntryMarkedAsMostRecentlyUsed({ key, value });
    }
  }

  private defaultClone(value: TValue): TValue {
    if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    return JSON.parse(JSON.stringify(value));
  }
}
