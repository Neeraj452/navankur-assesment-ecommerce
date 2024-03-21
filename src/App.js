import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import ProductListingPage from "./components/products/ProductListingPage";
import ProtectedRoute from "./components/PrivateRoute";
import ProductDetailed from "./components/productDetailedPage/ProductDetailed";
import Navbar from "./components/navbar/Navbar";
import ShoppingCartPage from "./components/shoppingCart/ShoppingCartPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product-detailed" element={<ProductDetailed />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <ToastContainer />

    </>
  );
};

export default App;
