import React from "react";
import Header from "./../../shared/Header/Header";
import Footer from "./../../shared/Footer/Footer";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <img
          src="https://i.ibb.co/52pbmVG/no-page-found-screen-illustration-1x.png"
          alt=""
          className="d-block mx-auto"
        />
        <Link to="/">
          <button className="btn btn-danger mx-auto d-block  my-5">
            Go Back to Home!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
