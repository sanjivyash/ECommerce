import React, {useReducer} from "react";
import "./App.css";
import Contents from "./components/Contents.component.js";
import NavBarCustom from "./components/NavBar.component.js";
import Footer from "./components/Footer.component.js";

const initialState = {
  cartItems: {},
  numberItems: 0,
}

function reducer(state, action) {
  switch(action.type) {
    case "increase":
      const newCartitem = action.payload;
      const newProducts = [...state.cartItems, newCartitem];
      const newNumberItems = state.numberItems + 1;
      return {cartItems: newProducts, numberItems: newNumberItems};
    case "decrease":
      const newCartProducts = state.cartItems.filter(product => product.productId !== action.payload.productId);
      const newCartNumberItems = state.numberItems - 1;
      return {cartItems: newCartProducts, numberItems: newCartNumberItems};
    case "reset":
      return initialState;
    default:
      return initialState;
  }
}

export const CartContext = React.createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <CartContext.Provider value={{state, dispatch}}>
        <NavBarCustom />
        <Contents />
        <Footer />
      </CartContext.Provider>
    </div>
  );
}

export default App;
