import  Pagination  from '../components/Pagination';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import product from "../css/product.module.css"
import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/footer';
import { AddtToCart } from '../redux/Cart/action';
import Toast from '../components/Toast';

const Product = () => {
    const [data, setdata] = useState([])
    const [page, setpage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [sort, setsort] = useState("")
   const { token } = useSelector((state) => state.authReducer.login);
      const state = useSelector((state) => state.cartReducer);
     let { category } = useParams();
     const dispatch=useDispatch()
     
     useEffect(() => {
        var body={page,category}
        if(sort){
            body.sort=sort
        }
  axios
    .post("http://localhost:5000/product/",body)
    .then((res) => res.data)
    .then((data) => {
        settotalPage(()=>+data.totalPages)
      setdata(() => data.data);
    });
    setsort("")
     }, [page,sort])

     function addToCart(data){

      axios
        .post("http://localhost:5000/cart/", { ...data },{
          headers:{
            token:"bearer "+token
          }
        })
        .then((res) => res.data)
        .then((data) => dispatch(AddtToCart(data)));
     }
  return (
    <div>
      <Navbar />
      <Toast  />
      <div className={product.sort_box}>
        <p>Sort by : </p>
        <select
          //   onChange={handleChange}
          label="Category"
          value={sort}
          onChange={(e) => {
            setsort(e.target.value);
          }}
          className={product.sort}
        >
          <option value="">Sort by</option>
          <option value={"asc"}>Price low to high</option>
          <option value={"desc"}>Price high to low</option>
        </select>
      </div>

      <div className={product.box}>
        {data &&
          data.map((elem, index) => {
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
                  <button
                    className={product.add_to_cart}
                    onClick={() => addToCart(elem)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <Pagination
        arr={new Array(totalPage).fill(0)}
        totalPage={totalPage}
        page={page}
        setpage={setpage}
      />
      <Footer />
    </div>
  );
}

export default Product
