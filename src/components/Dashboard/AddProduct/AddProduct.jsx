import React from "react";
import "./AddService.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "./../../../hooks/useAuth";
const AddProduct = () => {
  const { user } = useAuth();
  //upload file to firebase storage
  const storage = getStorage();
  const handleFileUpload = (file, data) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newData = { ...data };
          newData.product_image = downloadURL;
          newData.added_by = user.email;
          newData.added_date = new Date().toLocaleDateString();
          axios
            .post(
              "https://blooming-escarpment-34729.herokuapp.com/add-product",
              newData
            )
            .then((res) => {
              console.log(res.data);
              successMessage();
              reset();
            })
            .catch((e) => {
              console.log(newData);
            });
        });
      }
    );
  };
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const successMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Product added successfully..",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //save to database by api
  const onSubmit = (data) => {
    handleFileUpload(data.product_image[0], data);
  };
  return (
    <>
      <section className="my-5 we_are_ready_sectoion we_are_ready_two we_are_ready_three">
        <div className="container">
          <div className="we_are_content">
            <div className="online_booking">
              <h2>Add a New Product</h2>
              <form className="booking_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-6 col-sm-12 form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="product name"
                      {...register("product_name", {
                        required: true,
                        min: {
                          value: 5,
                          message: "service name must be minimum 5 letter",
                        },
                      })}
                    />
                    {errors.product_name && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-12 form-group">
                    <label htmlFor="price">Product price</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="price"
                      {...register("price", {
                        required: true,
                      })}
                    />
                    {errors.price && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-sm-12 form-group">
                    <label htmlFor="product_image">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="image"
                      {...register("product_image", {
                        required: true,
                      })}
                    />
                    {errors.product_image && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-12 form-group">
                    <label htmlFor="product_quantity">Product quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="product quantity"
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
                </div>

                <div className="row">
                  <div className="col-lg-12 col-sm-12 form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control text_area"
                      placeholder="description"
                      spellcheck="true"
                      {...register("product_desc", {
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
                <div className="col-lg-12 col-sm-12 form-group custom_button">
                  <button type="submit" className="btn btn-success">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
