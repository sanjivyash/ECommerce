import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import CartModal from "./CartModal.component";

function NavBarCustom() {
  return (
    <header id="header" className="header_area">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link className="navbar-brand logo_h" to="/main">
                Brand Placeholder
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarComponent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="collapse navbar-collapse offset" id="navBarComponent">
                <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/main">Home</Link>
                  </li>
                  <li className="nav-item submenu dropdown">
                    <Link className="nav-link" to="/products" >Shop</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/main">Contact</Link>
                  </li>
                </ul>

                <ul className="nav-shop">
                  <li className="nav-item">
                    <button type="button" className="btn btn-primary"><i className="ti-search"></i></button>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#cartModal"><i className="ti-shopping-cart"></i></button>
                  </li>
                  <li className="nav-item">
                    <button><Link className="button button-header" to="/" style={{textDecoration: "none"}}>Buy Now</Link></button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <CartModal />
      </header>
  );
}

export default NavBarCustom;
