import React from "react";
import "./App.css";
import Contents from './components/Contents.component.js';
import NavBar_Custom from "./components/NavBar.component.js";
import Footer from "./components/Footer.component.js";

function App() {
  return (
    <div>
      <NavBar_Custom />
      <Contents />
      <Footer />
    </div>
  );
}

export default App;
