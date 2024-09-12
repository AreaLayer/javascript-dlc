# typescript-lru-cache

This is a simple LRU cache implementation written in Typescript.
An LRU cache will evict the least recently used item to make room for new items.
Useful for when a cache size should be limited but the most used items should be kept.

## Installation:

```typescript
npm i typescript-lru-cache
```

## Why use this LRU Cache?

This library was written in Typescript so type definitions are included out of the box and are always up to date. The Typescript source code is included in the package so users can easily look at the implementation. This cache uses a `Map` object for internal entry tracking, so any type can be used as a key (including reference types!). Also, this library has no run-time dependencies!

## Usage:

See TypeDoc documentation [here.](https://rob893.github.io/typescript-lru-cache/)

```typescript
import { LRUCache } from 'typescript-lru-cache';

// Create a cache. Optional options object can be passed in.
const cache = new LRUCache<string, string>();

// Set a value in the cache with a key
cache.set('testKey', 'testValue');

// value will be 'testValue'
const value = cache.get('testKey');
console.log(value);
```

## Options:

### LRUCache Options:

Pass in an optional options object into the constructor of the LRU cache.

The options object has the following properties:

```typescript
export interface LRUCacheOptions<TKey, TValue> {
  maxSize?: number;
  entryExpirationTimeInMS?: number | null;
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;
  clone?: boolean;
  cloneFn?: (value: TValue) => TValue;
}
```

- `maxSize` The max number of items the cache can hold. Once the cache reaches this number, the least recently used entries will start to be evicted to make room for new entries. Defaults to 25.
- `entryExpirationTimeInMS` The time to live for cache entries. Setting this to `null` will make entries never expire. Default value is `null`.
- `onEntryEvicted` Function to be called whenever an entry is evicted from the cache (when evicted due to needing to make room, is expired, or deleted using delete()). Passed argument is an object:
  ```typescript
  {
    key: TKey;
    value: TValue;
    isExpired: boolean;
  }
  ```
- `onEntryMarkedAsMostRecentlyUsed` Function to be called whenever an entry is marked as recently used (on set, get, find, etc). Passed argument is an object:
  ```typescript
  {
    key: TKey;
    value: TValue;
  }
  ```
- `clone` Clone values being set and fetched from the cache (clones on set and any retrievals). Useful to maintain immutability. NOTE! This does come with performance overhead (almost twice as slow). Defaults to false.
- `cloneFn` Custom function to be used with the `clone` option. If not passed, `JSON.parse(JSON.stringify(value))` is used for cloning objects.

Example using options:

```typescript
import { LRUCache } from 'typescript-lru-cache';

// Create a cache. Optional options object can be passed in.
const cache = new LRUCache<string, string>({
  maxSize: 100,
  entryExpirationTimeInMS: 5000,
  onEntryEvicted: ({ key, value, isExpired }) =>
    console.log(`Entry with key ${key} and value ${value} was evicted from the cache. Expired: ${isExpired}`),
  onEntryMarkedAsMostRecentlyUsed: ({ key, value }) =>
    console.log(`Entry with key ${key} and value ${value} was just marked as most recently used.`)
});

// Set a value in the cache with a key
cache.set('testKey', 'testValue');

// value will be 'testValue'
const value = cache.get('testKey');
console.log(value);
```

### LRUCache Set Entry Options:

Pass in an optional options object as the third argument of the `set` method to configure options for just that entry. These options will override LRUCache options if applicable (including callback methods like onEntryEvicted).

The options object has the following properties:

```typescript
export interface LRUCacheSetEntryOptions<TKey, TValue> {
  entryExpirationTimeInMS?: number | null;
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean }) => void;
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue }) => void;
  clone?: boolean;
  cloneFn?: (value: TValue) => TValue;
}
```

- `entryExpirationTimeInMS` The time to live for the entry. Setting this to `null` will make the entry never expire.
- `onEntryEvicted` Function to be called whenever _this_ entry is evicted from the cache (when evicted due to needing to make room, is expired, or deleted using delete()). Passed argument is an object:
  ```typescript
  {
    key: TKey;
    value: TValue;
    isExpired: boolean;
  }
  ```
- `onEntryMarkedAsMostRecentlyUsed` Function to be called whenever _this_ entry is marked as recently used (on set, get, find, etc). Passed argument is an object:
  ```typescript
  {
    key: TKey;
    value: TValue;
  }
  ```
- `clone` Clone values being set and fetched from the cache (clones on set and any retrievals). Useful to maintain immutability. NOTE! This does come with performance overhead (almost twice as slow). Defaults to false.
- `cloneFn` Custom function to be used with the `clone` option. If not passed, `JSON.parse(JSON.stringify(value))` is used for cloning objects.

Example:

```typescript
// Cache defaults to 1000ms TTL for cache entries
const cache = new LRUCache({ entryExpirationTimeInMS: 1000 });

// For this entry, TTL will be 10000ms (overriding the cache config of 1000ms).
cache.set('key', 'value', { entryExpirationTimeInMS: 10000 });
```

## API

- `set(key, value, options?)` Sets the value for the key in the LRUCache object. Returns the LRUCache object. This marks the newly added entry as the most recently used entry. If adding the new entry makes the cache size go above maxSize, this will evict the least recently used entries until size is equal to maxSize.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// Set the key key2 to value value2. Pass in optional options.
cache.set('key2', 'value2', { entryExpirationTimeInMS: 10 });
```

- `get(key)` Returns the value associated to the key, or null if there is none or if the entry is expired. If an entry is returned, this marks the returned entry as the most recently used entry.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// Will be 'testValue'. Entry will now be most recently used.
const item1 = cache.get('testKey');

// Will be null
const item2 = cache.get('keyNotInCache');
```

- `peek(key)` Returns the value associated to the key, or null if there is none or if the entry is expired. If an entry is returned, this will not mark the entry as most recently accessed. Useful if a value is needed but the order of the cache should not be changed.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// Will be 'testValue'
const item1 = cache.peek('testKey');

// Will be null
const item2 = cache.peek('keyNotInCache');
```

- `delete(key)` Deletes the entry for the passed in key. Returns true if item was deleted. False if item is not in cache.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// Will be true
const wasDeleted = cache.delete('testKey');

// Will be false
const wasDeleted2 = cache.delete('keyNotInCache');
```

- `has(key)` Returns a boolean asserting whether a value has been associated to the key in the LRUCache object or not. This does not mark the entry as recently used.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// Will be true
const wasDeleted = cache.has('testKey');

// Will be false
const wasDeleted2 = cache.has('keyNotInCache');
```

- `clear()` Removes all entries in the cache.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// Clear cache.
cache.clear();
```

- `find(entry => boolean)` Searches the cache for an entry matching the passed in condition. If multiply entries in the cache match the condition, the most recently used entry will be returned. If an entry is returned, this marks the returned entry as the most recently used entry. Expired entries will be skipped (and removed).

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

// item will be { key: 'testKey', value: 'testValue }
const item = cache.find(entry => {
  const { key, value } = entry;

  if (key === 'testKey' || value === 'something') {
    return true;
  }

  return false;
});

// item2 will be null
const item2 = cache.find(entry => entry.key === 'notInCache');
```

- `forEach((key, value, index) => void)` Iterates over and applies the callback function to each entry in the cache. Iterates in order from most recently accessed entry to least recently. Expired entries will be skipped (and removed). No entry will be marked as recently used.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

cache.forEach((key, value, index) => {
  // do something with key, value, and/or index
});
```

- `values()` Creates a Generator which can be used with for ... of ... to iterate over the cache values. Iterates in order from most recently accessed entry to least recently. Expired entries will be skipped (and removed). No entry will be marked as accessed.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

for (const value of cache.values()) {
  // do something with the value
}
```

- `keys()` Creates a Generator which can be used with for ... of ... to iterate over the cache keys. Iterates in order from most recently accessed entry to least recently. Expired entries will be skipped (and removed). No entry will be marked as accessed.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

for (const key of cache.keys()) {
  // do something with the key
}
```

- `entries()` Creates a Generator which can be used with for ... of ... to iterate over the cache entries. Iterates in order from most recently accessed entry to least recently. Expired entries will be skipped (and removed). No entry will be marked as accessed.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

for (const entry of cache.entries()) {
  const { key, value } = entry;
  // do something with the entry
}
```

- `[Symbol.iterator]()` Creates a Generator which can be used with for ... of ... to iterate over the cache entries. Iterates in order from most recently accessed entry to least recently. Expired entries will be skipped (and removed). No entry will be marked as accessed.

```typescript
const cache = new LRUCache();

// Set the key testKey to value testValue
cache.set('testKey', 'testValue');

for (const entry of cache) {
  const { key, value } = entry;
  // do something with the entry
}
```

- `size` Returns the number of entries in the LRUCache.

```typescript
const cache = new LRUCache();

cache.set('testKey', 'testValue');

const size = cache.size;

// Will log 1
console.log(size);
```

- `remainingSize` Returns the number of entries that can still be added to the LRUCache without evicting existing entries.

```typescript
const cache = new LRUCache({ maxSize: 10 });

cache.set('testKey', 'testValue');

const remainingSize = cache.remainingSize;

// Will log 9 due to 9 spots remaining before reaching maxSize of 10.
console.log(remainingSize);
```

- `newest` Returns the most recently used (newest) entry in the cache. This will not mark the entry as recently used.

```typescript
const cache = new LRUCache({ maxSize: 10 });

cache.set('testKey', 'testValue');

const newest = cache.newest;

// Will log testValue
console.log(newest.value);
// Will log testKey
console.log(newest.key);
```

- `oldest` Returns the least recently used (oldest) entry in the cache. This will not mark the entry as recently used.

```typescript
const cache = new LRUCache({ maxSize: 10 });

cache.set('testKey', 'testValue');

const oldest = cache.oldest;

// Will log testValue
console.log(oldest.value);
// Will log testKey
console.log(oldest.key);
```

- `maxSize` Gets or sets the maxSize of the cache. Setting this to a lower maxSize will evict the least recently used entries if needed to reach new maxSize.

```typescript
const cache = new LRUCache({ maxSize: 10 });

cache.set('testKey', 'testValue');

// Will be 10
const maxSize = cache.maxSize;

// Set new maxSize to 5. If there are more than 5 items in the cache, the least recently used entries will be removed until cache size is 5.
cache.maxSize = 5;
```
