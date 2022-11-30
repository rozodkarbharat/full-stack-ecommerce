import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CarouselComp from '../components/Carousel';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const Home = () => {
const state=useSelector((state)=>state)

const navigate = useNavigate();

    return (
      <>
        <Navbar />
        <CarouselComp />
        <Footer />
      </>
    );

}

export default Home;
