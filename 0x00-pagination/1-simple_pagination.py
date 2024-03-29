#!/usr/bin/env python3
''' Simple Helper Function '''
import csv
import math
from typing import List


def index_range(page, page_size):
    '''
    return a tuple of size two containing a start index and an end index
    correponding to the range of indexes
    '''
    if page >= 1:
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''
        paginate dataset and return appropriate page of the dataset
        '''
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        row_list = self.dataset()
        try:
            index = index_range(page, page_size)
            return row_list[index[0]:index[1]]
        except ImportError:
            return []
