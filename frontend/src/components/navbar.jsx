import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import navbar from "../css/navbar.module.css"
import { SignOut } from '../redux/user/action';
const Navbar = () => {
  const { token } = useSelector((state) => state.authReducer.login);
    const navigate=useNavigate()
    const dispatch=useDispatch()
  function HandleLogout(){
    dispatch(SignOut())
  }
  return (
    <div className={navbar.navbar}>
      {/* <p onClick={() => navigate("/")}>Home</p> */}
      {token ? <p onClick={HandleLogout}>Logout</p> : <p onClick={() => navigate("/login")}>Login</p>}
      <p onClick={() => navigate("/create")}>Create</p>
      <p onClick={() => navigate("/products")}>Products</p>
      <div className={navbar.cart} onClick={() => navigate("/cart")}>Cart</div>
    </div>
  );
}

export default Navbar
