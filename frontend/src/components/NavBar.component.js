import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar_Custom() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark inverse">
        <Link to="/">
          <div className="navbar-brand">Company Logo</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCustom"
          aria-controls="navbarCustom"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCustom">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navBarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </div>
              <div className="dropdown-menu" aria-labelledby="navBarDropdown">
                <Link to="/products" className="dropdown-item">
                  Category 1
                </Link>
                <Link to="/products" className="dropdown-item">
                  Category 2
                </Link>
                <Link to="/products" className="dropdown-item">
                  Category 3
                </Link>
                <Link to="/products" className="dropdown-item">
                  Category 4
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar_Custom;
