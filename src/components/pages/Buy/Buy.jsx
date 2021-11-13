import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "./../../../hooks/useAuth";
import "./Buy.css";
import Header from "./../../shared/Header/Header";
import Footer from "./../../shared/Footer/Footer";
import Swal from "sweetalert2";
const Buy = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  //success modal
  const successModal = (type, message) => {
    Swal.fire({
      icon: type,
      title: message,
      showConfirmButton: true,
      timer: 1500,
    });
  };

  //save to database by api
  const onSubmit = async (data) => {
    const newData = { ...data };
    newData.status = "pending";
    newData.username = user.displayName;
    newData.email = user.email;
    newData.product_name = product.product_name;
    newData.order_date = new Date().toLocaleDateString();
    newData.product_price = Math.round(
      parseInt(newData.product_quantity) * parseInt(product.price)
    );
    try {
      const result = await axios.post(
        "https://blooming-escarpment-34729.herokuapp.com/orders",
        newData
      );
      reset();
      if (result.data._id) {
        successModal(
          "success",
          "order successfully, placed. please, check your dashboard."
        );
      } else {
        successModal("error", "Something is wrong!");
      }
    } catch (error) {
      successModal("error", "Something is wrong!");
    }
  };
  useEffect(() => {
    //fetch the single service by id form api
    axios
      .get(`https://blooming-escarpment-34729.herokuapp.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="container mb-5 mt-0">
        <div className="row">
          <div className="col">
            <img
              src={product.product_image}
              className="img-fluid d-block w-100 h-50 rounded-3"
              alt="service banner"
            />
            <h1 className="fw-500">{product.product_name}</h1>
            <p className="fw-bold">Price: ${product.price}</p>
            <p>{product.product_desc}</p>
          </div>
        </div>
        <section className="we_are_ready_sectoion we_are_ready_two we_are_ready_three">
          <div className="container my-5">
            <div className="we_are_content">
              <div className="online_booking">
                <h2>Place an Order</h2>
                <p className="fw-bold">Delivery information</p>
                <form
                  className="booking_form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={user.displayName}
                        placeholder="name"
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="location">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={user.email}
                        placeholder="email"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="count">Product quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="how may??"
                        {...register("product_quantity", {
                          required: true,
                        })}
                      />
                      {errors.product_quantity && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="phone">Phone number?</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="phone number"
                        {...register("phone", {
                          required: true,
                        })}
                      />
                      {errors.phone && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="image">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="country"
                        {...register("country", {
                          required: true,
                        })}
                      />
                      {errors.country && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="city"
                        {...register("city", {
                          required: true,
                        })}
                      />
                      {errors.city && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label htmlFor="district">District</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="district"
                        {...register("district", {
                          required: true,
                        })}
                      />
                      {errors.district && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 form-group">
                      <label htmlFor="description">Your address?</label>
                      <p className="fw-normal">Delivery address</p>
                      <textarea
                        className="form-control text_area"
                        placeholder="address"
                        spellcheck="true"
                        {...register("delivery_address", {
                          required: true,
                        })}
                      ></textarea>
                      {errors.description && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Buy;
