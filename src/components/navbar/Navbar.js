// Navbar.js

import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import style from "./navbar.module.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateShoppingCart = () => {
    navigate("/shopping-cart");
  };
  const navigateProduct = () => {
    navigate("/products");
  };

  return (
    <nav className={style.navbar}>
      <img
        className={style.logo}
        src="https://www.navankur.org/logo.svg"
        alt="logo"
      />
      <ul className={style.navLinks}>
        <li
          className={`${
            location.pathname === "/products" ? style.active : style.navLink
          }`}
          onClick={() => navigateProduct()}
          onKeyDown={(e) => e.key === "Enter" && navigateProduct()}
        >
          Products
        </li>
      </ul>
      <div className={style.cartIcon} onClick={() => navigateShoppingCart()}>
        <FaShoppingCart style={{ fontSize: "1.6rem", color: "#000" }} />
        <span className={style.cartCount}>
          {cart.items.reduce((acc, curr) => acc + curr.quantity, 0)}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
