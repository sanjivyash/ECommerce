import React, { useReducer } from "react";
import "./App.css";
import Contents from "./components/Contents.component.js";
import NavBarCustom from "./components/NavBar.component.js";
import Footer from "./components/Footer.component.js";

const initialState = {
  cartItems: [],
  numberItems: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increase":
      let newCartitem = action.payload;
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].productId === newCartitem.productId) {
          state.cartItems[i].quantity += 1;
          return state;
        }
      }
      newCartitem.quantity = 1;
      let newProducts = [...state.cartItems, newCartitem];
      let newNumberItems = state.numberItems + 1;
      return { cartItems: newProducts, numberItems: newNumberItems };
    case "decrease":
      let newCartProducts = state.cartItems.filter(
        (product) => product.productId !== action.payload.productId
      );
      let newCartNumberItems = state.numberItems - 1;
      return { cartItems: newCartProducts, numberItems: newCartNumberItems };
    case "quantity":
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].productId === action.payload.productId) {
          state.cartItems[i].quantity = Math.max(action.payload.quantity, 1);
        }
      }
      return state;
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export const CartContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <CartContext.Provider value={{ state, dispatch }}>
        <NavBarCustom />
        <Contents />
        <Footer />
      </CartContext.Provider>
    </div>
  );
}

export default App;
