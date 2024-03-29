import React from "react";
import { Route, Routes } from "react-router-dom";
import HasAuth from "../HOC/HasAuth";
import RequireAuth from "../HOC/RequireAuth";
import Cart from "./Cart";
import Create from "./Create";
import Login from "./Login";
import NotFound from "./NotFound";
import Product from "./product";
import Products from "./Products";
import Signup from "./Signup";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutError from "./CheckoutError";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        {/* <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        /> */}
        <Route
          path="/login"
          element={
            <HasAuth>
              <Login />
            </HasAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <HasAuth>
              <Signup />
            </HasAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Products />} />
        
        <Route
          path="/product/:category"
          element={
            <RequireAuth>
              <Product />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout-success"
          element={
            <RequireAuth>
              <CheckoutSuccess />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout-cancel"
          element={
            <RequireAuth>
              <CheckoutError />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default Allroutes;
