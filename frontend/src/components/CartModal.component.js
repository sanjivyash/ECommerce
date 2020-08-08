import React, { useContext } from 'react';
import { CartContext } from '../App.js';

function CartModal(props) {
    const { state, dispatch } = useContext(CartContext);
    
    let content = null;
    if(state){
        content = state.cartItems.map((product) => {
            return (<div key={product.productId} className="col-12">
                <div className="card text-center card-product">
                    <div className="card-product__img">
                        <img className="card-img" src="../../public/Gravator-icon.png" alt="" />
                        <div className="card-body">
                            <p>{product.productId}</p>
                            <h5 className="card-product__title">{product.name}</h5>
                            <p className="card-product__price">{product.price}</p>
                        </div>
                    </div>
                </div>
            </div>);
        })
    }

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
                        <div className="container">
                            <div className="row">
                                {content}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer" style={{backgroundColor: "#e9ecef"}}>
                        <button type="button" className="btn btn-secondary mr-auto" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary ml-auto" onClick={() => {
                            console.log(state);
                            console.log(process.env.REACT_APP_BACKEND_HOST);
                        }}>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal;