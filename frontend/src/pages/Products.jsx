import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CarouselComp from '../components/Carousel';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import SmallCarousal from '../components/SmallCarousal';
import Toast from '../components/Toast';
import product from "../css/products.module.css"

const Products = () => {
const [mobile, setmobile] = useState([])
const [tv, settv] = useState([])
const [tab, settab] = useState([])
const navigate=useNavigate()
    useEffect(() => {
       axios
         .get("https://ecommerce-electronics.onrender.com/product/all")
         .then((res) => res.data)
         .then((data) => {
           var tv_data = data.filter((elem) => elem.category === "television");
           var mobile_data = data.filter((elem) => elem.category === "mobile");
           var tablet_data = data.filter((elem) => elem.category === "tablet");
           setmobile(() => mobile_data);
           settv(() => tv_data);
           settab(() => tablet_data);
         }).catch((err)=>{console.log(err)})
    }, [])

    function handleclick(type){
       navigate(`/product/${type}`)
    }
  return (
    <div>
      <Navbar />
      <Toast />
      <div className={product.large_car}>
        <CarouselComp />
      </div>
      <div className={product.small_car}>
        <SmallCarousal />
      </div>
      <div className={product.main}>
        <div className={product.title_box}>
          <h2 className={product.title}>Mobiles </h2>
          <p onClick={() => handleclick("mobile")}>Show more...</p>
        </div>

        <div className={product.box}>
          {mobile &&
            mobile.map((elem, index) => {
              if (index < 4) {
                return (
                  <div className={product.product_card} key={elem._id}>
                    <h3>{elem.name}</h3>
                    <img className={product.image} src={elem.image} alt="" />
                    <div className={product.price_box}>
                      <p>Price:</p>
                      <p>₹ {elem.price}</p>
                      <p className={product.original_price}>
                        ₹ {elem.original_price}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className={product.title_box}>
          <h2 className={product.title}>TV </h2>
          <p onClick={() => handleclick("television")}>Show more...</p>
        </div>
        <div className={product.box}>
          {tv &&
            tv.map((elem, index) => {
              if (index < 4) {
                return (
                  <div className={product.product_card} key={elem._id}>
                    <h3>{elem.name}</h3>
                    <img className={product.tvimage} src={elem.image} alt="" />
                    <div className={product.price_box}>
                      <p>Price:</p>
                      <p>₹ {elem.price}</p>
                      <p className={product.original_price}>
                        ₹ {elem.original_price}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className={product.title_box}>
          <h2 className={product.title}>Tablet </h2>
          <p onClick={() => handleclick("tablet")}>Show more...</p>
        </div>
        <div className={product.box}>
          {tab &&
            tab.map((elem, index) => {
              if (index < 4) {
                return (
                  <div className={product.product_card} key={elem._id}>
                    <h3>{elem.name}</h3>
                    <img className={product.image} src={elem.image} alt="" />
                    <div className={product.price_box}>
                      <p>Price:</p>
                      <p>₹ {elem.price}</p>
                      <p className={product.original_price}>
                        ₹ {elem.original_price}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products
