import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CartTotal from '../components/cartTotal';
import Footer from '../components/footer';
import Navbar from '../components/navbar'
import cart from "../css/cart.module.css"

const Cart = () => {
     const {token } = useSelector(
       (state) => state.authReducer.login
     );
     const [data, setdata] = useState([])
    useEffect(() => {
        console.log(token)
      axios
        .get("https://ecommerce-electronics.onrender.com/cart/get", {
          headers: {
            "Content-type": "appliocation/json",
            token: "bearer " + token,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setdata(data);
        });
    }, [])
    function cartQuantity(e,change){
     axios
       .post(
         "https://ecommerce-electronics.onrender.com/cart/cartcount",
         {
           ...e,
           quantity: e.quantity + change,
         },
         {
           headers: {
             token: "bearer " + token,
           },
         }
       )
       .then((res) => res.data)
       .then((data) => {
         setdata(data);
       });
    }
  return (
    <div>
      <Navbar />
      <div className={cart.cart_div}>
        <div className={cart.cart_products}>
          {data.length > 0 &&
            data.map((elem, index) => {
              // console.log(elem)
              return (
                <div className={cart.product_box} key={index}>
                  <img className={cart.img} src={elem.image} alt="" />
                  <p className={cart.name}> {elem.name}</p>
                  <p>₹{elem.price}</p>
                  <div className={cart.quantity}>
                    <button
                      onClick={() => cartQuantity(elem, 1)}
                      className={cart.btn}
                    >
                      +
                    </button>
                    <p>Quantity : {elem.quantity}</p>
                    <button
                      onClick={() => cartQuantity(elem, -1)}
                      className={cart.btn}
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <CartTotal data={data} />
      </div>
      <Footer />
    </div>
  );
}

export default Cart
