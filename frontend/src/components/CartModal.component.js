import React, { useContext, useState } from "react";
import { CartContext } from "../App.js";

function CartModal(props) {
  const { state, dispatch } = useContext(CartContext);
  const [useless, setUseless] = useState(0);

  let content = null;
  if (state) {
    content = state.cartItems.map((product) => {
      return (
        <div key={product.productId} className="col-12">
          <div className="media">
            <img
              src={product.thumbnail}
              className="mr-3"
              style={{ width: "120px", height: "80px", display: "block" }}
              alt=""
            />
            <div className="media-body">
              <h5 className="mt-0">{product.name}</h5>
              <h6 className="mt-0">{product.price}</h6>
              {/* Quantity logic to be added here */}
              <h6 className="mt-0">Quantity: </h6>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  dispatch({
                    type: "quantity",
                    payload: {
                      productId: product.productId,
                      quantity: product.quantity - 1,
                    },
                  });
                  setUseless((useless) => useless - 1);
                }}
              >
                <i className="ti-minus"></i>
              </button>
              {"   "}
              {product.quantity}
              {"   "}
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  dispatch({
                    type: "quantity",
                    payload: {
                      productId: product.productId,
                      quantity: product.quantity + 1,
                    },
                  });
                  setUseless((useless) => useless + 1);
                }}
              >
                <i className="ti-plus"></i>
              </button>
              {"   "}
              <button
                className=" btn btn-sm btn-danger"
                onClick={() => {
                  dispatch({ type: "decrease", payload: product });
                }}
              >
                <i className="ti-trash"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div
      className="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#e9ecef" }}>
            <h5 className="modal-title" id="cartModalLabel">
              Your Cart
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">{content}</div>
            </div>
          </div>
          <div className="modal-footer" style={{ backgroundColor: "#e9ecef" }}>
            <button
              type="button"
              className="btn btn-secondary mr-auto"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary ml-auto"
              onClick={() => {
                console.log(state);
                console.log(process.env.REACT_APP_BACKEND_HOST);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
