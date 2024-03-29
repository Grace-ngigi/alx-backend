#!/usr/bin/env python3
''' Lifo Caching '''

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    ''' Fifo Caching '''

    def __init__(self):
        ''' Init Fifo'''
        super().__init__()
        self.order_list = []

    def put(self, key, item):
        ''' add item to cache'''
        if key is not None and item is not None:
            leng = len(self.cache_data)
            capacity = BaseCaching.MAX_ITEMS
            if leng >= capacity and key not in self.cache_data:
                print(f"DISCARD: {self.order_list[-1]}")
                del self.cache_data[self.order_list[-1]]
                self.order_list.pop()
            self.order_list.append(key)
            self.cache_data[key] = item

    def get(self, key):
        ''' get item from cache'''
        return self.cache_data.get(key, None)
