import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer-main bg-success text-light py-5 px-0 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <h3>About us</h3>
              <hr width="25%" />
              <p>
                This is worldclass fan store. on this site you will get all
                types of fan by famous company's!
              </p>
              <div className="follow-us">
                <p>Following us:</p>
                <a target="_blank" href="https://www.fb.com/shahinadev">
                  <i className="fab social-icon mr-5 fa-facebook"></i>{" "}
                </a>
                <a target="_blank" href="https://www.fb.com/shahinadev">
                  <i className="fab social-icon mr-5 d-inline fa-twitter"></i>
                </a>
                <a target="_blank" href="https://www.fb.com/shahinadev">
                  <i className="fab social-icon mr-5 d-inline fa-linkedin"></i>
                </a>
                <a target="_blank" href="https://www.fb.com/shahinadev">
                  <i className="fab social-icon mr-5 d-inline fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-md-3 my-md-0 my-5">
              <h3>Quick Links</h3>
              <hr width="25%" />
              <div className="follow-us">
                <Link className="d-block my-2 text-light" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="d-block my-2 text-light" to="/reviews">
                  Reviews
                </Link>
                <Link className="d-block my-2 text-light" to="/shop">
                  Shop
                </Link>
              </div>
            </div>
            <div className="col-md-3 my-md-0 my-5">
              <h3>Contact info</h3>
              <hr width="25%" />
              <div className="follow-us">
                <p>
                  <i className="fas fa-map-marker-alt"></i> Chinora Naogaon 6530{" "}
                  <br />
                  Bangladesh
                </p>
                <p>
                  <i className="fa fa-envelope"></i> dev.shahin2@gmail.com
                </p>
                <p>
                  <i className="fa fa-phone"></i> +8801318965415
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-copyright d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <p>&copy; 2021 Shahin Alam</p>
          <div>
            <Link to="/terms-services" className="text-light m-3">
              Terms of Services
            </Link>
            <Link to="/privacy" className="text-light">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
