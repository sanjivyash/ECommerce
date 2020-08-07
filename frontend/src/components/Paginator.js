import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function Paginator(props) {
    let items = null;
    const getItems = (startNumber, endNumber) => {
        const items = [];
        for(let i = startNumber; i<=endNumber; i++){
            items.push(
                <Pagination.Item key={i}
                                onClick={() => props.PageChangeHandler(i)}
                                active={i===props.currentPage}>
                                    {i}
                </Pagination.Item>
            );
        }
        return items;
    }

    if(props.totalPages <= 6){
        items = getItems(1 + props.totalPages*(props.serverPage-1), props.totalPages*props.serverPage);
    }
    else{
        if(props.currentPage <= 3){
            items = getItems(1 + props.totalPages*(props.serverPage-1),4 +props.totalPages*(props.serverPage-1));
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(props.totalPages*props.serverPage, props.totalPages*props.serverPage));
        }
        else if(props.currentPage > 3 && props.currentPage < props.totalPages -3){
            items = getItems(1 +props.totalPages*(props.serverPage-1),1 +props.totalPages*(props.serverPage-1));
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(props.currentPage +props.totalPages*(props.serverPage-1) -1, props.currentPage +props.totalPages*(props.serverPage-1) -1));
            items = items.concat(getItems(props.currentPage +props.totalPages*(props.serverPage-1), props.currentPage +props.totalPages*(props.serverPage-1)));
            items = items.concat(getItems(props.currentPage +props.totalPages*(props.serverPage-1) +1, props.currentPage +props.totalPages*(props.serverPage-1) +1));
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(props.totalPages*props.serverPage, props.totalPages*props.serverPage));
        }
        else {
            items = getItems(1 +props.totalPages*(props.serverPage-1),1 +props.totalPages*(props.serverPage-1));
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(props.totalPages*props.serverPage-3, props.totalPages*props.serverPage));
        }
    }

    return (
        <Pagination>
            {props.serverPage>1 &&
            <Pagination.First onClick={() => props.ServerPageHandler(props.serverPage -1) }/> }
            {props.currentPage>1 && 
                <Pagination.Prev onClick={() => props.PageChangeHandler(props.currentPage -1)} />    
            }
            {items}
            {props.currentPage<props.totalPages && 
                <Pagination.Next onClick={() => props.PageChangeHandler(props.currentPage +1)} />    
            }
            <Pagination.Last onClick={() => props.ServerPageHandler(props.serverPage +1)} />
        </Pagination>
    )
}