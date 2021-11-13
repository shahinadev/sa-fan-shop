import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import useAuth from "./../../../hooks/useAuth";
const Header = () => {
  const { logOut, user } = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top top-0 navbar-light bg-custom">
        <div className="container-fluid">
          <NavLink className="navbar-brand mx-5" exact to="/">
            <img
              src="https://i.ibb.co/dG55z2X/dev-shahin1-gmail-com.jpg"
              className="img-fluid w-25 rounded-circle logo"
              alt=""
            />
            SA FAN SHOP
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  activeClassName="nav-active"
                  className="nav-link"
                  to="/review"
                >
                  Review us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="nav-active"
                  className="nav-link"
                  to="/shop"
                >
                  Products
                </NavLink>
              </li>
              {user?.email ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="nav-active"
                      className="nav-link"
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link border-0 bg-custom dropdown-toggle"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user?.displayName}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link my-md-0 my-3 btn btn-danger text-light p-2"
                      onClick={logOut}
                    >
                      <i className="fas fa-sign-out-alt text-light"></i>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="nav-active"
                      className="nav-link my-md-0 my-3 btn btn-danger text-light"
                      to="/login"
                    >
                      <i className="fas fa-sign-in-alt text-light mx-2 align-items-center"></i>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
