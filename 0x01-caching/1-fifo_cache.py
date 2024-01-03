#!/usr/bin/env python3
''' Fifo Caching '''

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    ''' Fifo Caching '''

    def __init__(self):
        ''' Init Fifo'''
        super().__init__()
        self.order_list = []

    def put(self, key, item):
        ''' add item to cache'''
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print(f"DISCARD: {self.order_list[0]}") 
                del self.cache_data[self.order_list[0]]
                self.order_list.pop(0)
            self.order_list.append(key)    
            self.cache_data[key] = item

    def get(self, key):
        ''' get item from cache'''
        return self.cache_data.get(key, None)
    