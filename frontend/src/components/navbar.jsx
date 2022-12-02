import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import navbar from "../css/navbar.module.css"
import { SignOut } from '../redux/user/action';
const Navbar = () => {
  const { token } = useSelector((state) => state.authReducer.login);
  const [cartcount, setcartcount] = useState();
    const navigate=useNavigate()
    const dispatch=useDispatch()
  function HandleLogout(){
    dispatch(SignOut())
  }

     useEffect(() => {
       // console.log(token)
       axios
         .get("https://ecommerce-electronics.onrender.com/cart/get", {
           headers: {
             "Content-type": "appliocation/json",
             token: "bearer " + token,
           },
         })
         .then((res) => res.data)
         .then((data) => {
           setcartcount(data.length);
         });
     }, []);
  return (
    <div className={navbar.navbar}>
      {/* <p onClick={() => navigate("/")}>Home</p> */}
      <p onClick={() => navigate("/")}>Home</p>
      <p onClick={() => navigate("/create")}>Create</p>
      {token ? <p onClick={HandleLogout}>Logout</p> : <p onClick={() => navigate("/login")}>Login</p>}  
      <div className={navbar.cart} onClick={() => navigate("/cart")}>{cartcount}</div>
    </div>
  );
}

export default Navbar
