#!/usr/bin/env python3
''' LRU Caching '''

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    ''' LRU Caching '''

    def __init__(self):
        ''' Init LRU'''
        super().__init__()
        self.order_list = []

    def put(self, key, item):
        ''' add item to cache'''
        if key is not None and item is not None:
            leng = len(self.cache_data)
            capacity = BaseCaching.MAX_ITEMS
            if leng >= capacity and key not in self.cache_data:
                print(f"DISCARD: {self.order_list[0]}")
                del self.cache_data[self.order_list[0]]
                del self.order_list[0]
            if key in self.order_list:
                del self.order_list[self.order_list.index(key)]
            self.order_list.append(key)
            self.cache_data[key] = item

    def get(self, key):
        ''' get item from cache'''
        if key is not None and key in self.cache_data.keys():
            del self.order_list[self.order_list.index(key)]
            self.order_list.append(key)
            return self.cache_data[key]
        return None
