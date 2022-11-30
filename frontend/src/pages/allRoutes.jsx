import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from '../HOC/RequireAuth'
import Cart from './Cart'
import Create from './Create'
import Home from './Home'
import Login from './Login'
import NotFound from './NotFound'
import Product from './product'
import Products from './Products'
import Signup from './Signup'

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
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
      </Routes>
    </div>
  );
};

export default Allroutes;
