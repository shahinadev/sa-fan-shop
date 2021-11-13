import React from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Login = () => {
  const { signInWithGoogle, signInWithEmailPassword, error, message } =
    useAuth();
  const location = useLocation();
  const redirect = location?.state?.from || "/";
  const handleGoogleSignIn = () => {
    signInWithGoogle(redirect);
  };

  const regx = {
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newData = { ...data };
    newData.redirect = redirect;
    signInWithEmailPassword(newData);
  };
  return (
    <div className="container" style={{ marginTop: 100 }}>
      <div className="signup-form">
        <h2>Welcome Back Login </h2>
        <p className="hint-text">
          Login up with your social media account or email address
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm">
          {error && (
            <span className="text-danger d-block my-2">
              {error.includes("wrong-password") ? (
                <>
                  "Password Not match" <span>did Forgot password?</span>
                  <Link to="/reset_password">reset here.</Link>
                </>
              ) : (
                error
              )}
            </span>
          )}
          <span>{message && message}</span>
          <div className="form-group">
            <input
              type="email"
              className="form-control input-lg"
              {...register("email", {
                required: true,
                pattern: {
                  value: regx.email,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email Address"
            />
            {errors.email && (
              <span className="text-danger">
                {errors.email?.message
                  ? errors.email.message
                  : "This filed is required"}
              </span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control input-lg"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password minimum length must be 6",
                },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-danger">
                {errors.password?.message
                  ? errors.password.message
                  : "This filed is required"}
              </span>
            )}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-lg btn-block signup-btn"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          Need an account? <Link to="/register">Register here</Link>
        </div>
        <div className="or-seperator">
          <b>or</b>
        </div>
        <div className="social-btn text-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-danger btn-lg"
          >
            <i className="fab fa-google"></i> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
