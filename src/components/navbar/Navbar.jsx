import React from "react";
import logo from "../../assets/img/logo.png";
import { CartWidget } from "../cartWidget/CartWidget";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="ROCO TRAINER"></img>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/category/ropa">
                Ropa
              </NavLink>
            </li>
            <li>
              <NavLink to="/category/accesorios">
                Accesorios
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="redes-container">
          <CartWidget></CartWidget>
        </div>
      </header>
    </>
  );
};

export default Navbar;
