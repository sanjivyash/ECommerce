import React from "react";
import "./App.css";
import Contents from "./components/Contents.component.js";
import NavBarCustom from "./components/NavBar.component.js";
import Footer from "./components/Footer.component.js";

function App() {
  return (
    <div>
      <NavBarCustom />
      <Contents />
      <Footer />
    </div>
  );
}

export default App;
