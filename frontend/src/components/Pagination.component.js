import React, { useState } from 'react';

const displayItems = (currentPage, itemsPerPage, index) => {
    const startIndex = (currentPage-1)*itemsPerPage + 1;
    const endIndex = currentPage*itemsPerPage;
    if(((index+1)>=startIndex) && ((index+1)<=endIndex)){
        return true;
    }
    return false;
}

export const usePagination = (itemList, maxItemsPerPage) => {
    const [items, setItems] = useState(itemList);
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(items.length/maxItemsPerPage);

    const pageItems = items.filter((val, index) => {
        if(!displayItems(currentPage, maxItemsPerPage, index)){
            return false;
        }
        return true;
    });
    const setItemsList = (items) => {
        setCurrentPage(1);
        setItems(items);
    }

    return {
        setItemsList,
        currentPage,
        setCurrentPage,
        pageItems,
        totalPages
    };
}