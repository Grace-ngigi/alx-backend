#!/usr/bin/python3
'''
class BasicCache that inherits from BaseCaching and is a caching system
'''


BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    ''' a cacin system'''
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        ''' add item to cache'''
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        ''' get item from cache'''
        return self.cache_data.get(key, None)