import React from 'react'
import footer from "../css/footer.module.css"
const Footer = () => {
  return (
    <div className={footer.main}>
      <div>
        <h3>About</h3>
        <p>Contact us</p>
        <p>Career</p>
        <p>Corporate Information</p>
      </div>
      <div>
        <h3>Help</h3>
        <p>Payment</p>
        <p>Shipping</p>
        <p>FAQ</p>
      </div>
      <div>
        <h3>Policy</h3>
        <p>Return Policy</p>
        <p>Privacy</p>
        <p>Terms Of Use</p>
      </div>
      <div>
        <h3>Social</h3>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>YouTube</p>
      </div>
    </div>
  );
}

export default Footer
