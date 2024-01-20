#!/usr/bin/env python3
''' LFU Caching '''

from base_caching import BaseCaching
from collections import defaultdict

class LFUCache(BaseCaching):
    def __init__(self):
        super().__init__()
        # Dictionary to store the frequency of each key
        self.key_frequency = defaultdict(int)

    def put(self, key, item):
        if key is None or item is None:
            return

        # Check if cache is at max capacity
        if len(self.cache_data) >= self.MAX_ITEMS:
            if not self.key_frequency:
            # If key_frequency is empty, there are no items to discard
                return
            # Find the item(s) with the least frequency
            min_frequency = min(self.key_frequency.values())
            items_to_discard = [k for k, v in self.key_frequency.items() if v == min_frequency]

            # If there is more than one item with the least frequency, use LRU algorithm
            if len(items_to_discard) > 1:
                lru_key = min(self.cache_data, key=lambda k: self.cache_data[k][1])
                print(f"DISCARD: {lru_key}")
                if lru_key in self.key_frequency:
                    del self.key_frequency[lru_key]
                del self.cache_data[lru_key]
            else:
                # Discard the least frequency used item
                discard_key = items_to_discard[0]
                print(f"DISCARD: {discard_key}")
                if discard_key in self.key_frequency:
                    del self.key_frequency[discard_key]
                del self.cache_data[discard_key]

        # Add the new item to the cache
        self.cache_data[key] = (item, 0)  # Tuple with item and frequency

    def get(self, key):
        if key is None or key not in self.cache_data:
            return None

        # Increment the frequency of the accessed key
        self.key_frequency[key] += 1

        # Get the value from the cache and update the frequency
        value, frequency = self.cache_data[key]
        self.cache_data[key] = (value, frequency + 1)

        return value
