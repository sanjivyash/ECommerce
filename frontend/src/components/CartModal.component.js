import React, { useContext } from 'react';
import { CartContext } from '../App.js';

function CartModal(props) {
    const { state, dispatch } = useContext(CartContext);

    

    return (
        <div className="modal fade" id="cartModal"
            tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" 
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header" style={{backgroundColor: "#e9ecef"}}>
                        <h5 className="modal-title" id="cartModalLabel">Your Cart</h5>
                        <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>modal content placeholder</p>
                    </div>
                    <div className="modal-footer" style={{backgroundColor: "#e9ecef"}}>
                        <button type="button" className="btn btn-secondary mr-auto" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary ml-auto">Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal;