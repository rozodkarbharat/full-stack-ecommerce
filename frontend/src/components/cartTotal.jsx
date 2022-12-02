import { color } from '@mui/system'
import React, { useEffect, useState } from 'react'
import carttotal from "../css/carttotal.module.css"
const CartTotal = ({data}) => {
const [amount, setamount] = useState(0)
const [discount, setdiscount] = useState(0)
console.log(data,"data")
useEffect(() => {
var count=data.reduce((acc,elem)=>{
    return acc+=+elem.price* +elem.quantity
},0)
var disc = data.reduce((acc, elem) => {
  return (acc += +elem.original_price * +elem.quantity);
}, 0);
setdiscount(() => count - disc);
setamount(()=>count)
}, [data])
  return (
    <div className={carttotal.cart_total_div}>
      
        <h3>PRICE DETAILS</h3>

      <div className={carttotal.item}>
        <p>No. of Items : </p>
        <p> {data.length}</p>
      </div>
      <div className={carttotal.item}>
        <p>Discount : </p>
        <p style={discount < 0 ? { color: "green" } : {}}> ₹ {discount}</p>
      </div>
      <div className={carttotal.item}>
        <p>Delivery Charges : </p>
        <p style={amount > 10000 ? { color: "green" } : {}}>
          {amount > 10000 ? "Free" : "50 Rs"}
        </p>
      </div>
      <hr />
      <div className={carttotal.item}>
        <p>Cart Total : </p>
        <p>₹ {amount}</p>
      </div>
    </div>
  );
}

export default CartTotal
