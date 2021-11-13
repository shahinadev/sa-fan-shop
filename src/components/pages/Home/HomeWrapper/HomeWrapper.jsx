import React from "react";
import Banner from "../Banner/Banner";
import Reviews from "./../Reviews/Reviews";
import BlogContainer from "./../BlogContainer/BlogContainer";
import Products from "./../Products/Products.jsx";

const HomeWrapper = () => {
  return (
    <>
      <Banner />
      <Products />
      <Reviews />
      <BlogContainer />
    </>
  );
};

export default HomeWrapper;
