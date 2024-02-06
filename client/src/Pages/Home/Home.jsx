import React from "react";
// import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import HowItWorks from "../../components/how-it-works/howitworks";  
import  Footer  from "../../components/footer/footer";
import  PriceSection  from "../../components/priceSection/PriceSection";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <PriceSection/>
      <Footer />
    </div>
  );
}

export default Home;
