#!/usr/bin/python3
''' Fifo Cacin '''

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    def __init__(self):
        ''' Init Fifo'''
        super().__init__()

    def put(self, key, item):
        ''' add item to cache'''
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                first_item = list(self.cache_data.keys())[0]
                del self.cache_data[first_item]
                print(f"DISCARD: {first_item}")
            self.cache_data[key] = item

    def get(self, key):
        ''' get item from cache'''
        return self.cache_data.get(key, None)