import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "./../../../hooks/useAuth";
import "../MyOrders/MyOrders.css";
import Loading from "./../../shared/Loading/Loading";
import { Rating } from "@mui/material";
const MyReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Review has been successfully deleted.",
            "success"
          );
          deleteReview(id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Review is safe :)",
            "error"
          );
        }
      });
  };
  //delete booking
  const deleteReview = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://blooming-escarpment-34729.herokuapp.com/reviews/${id}`)
      .then((res) => {
        //filter orders after delete successfully..
        const newOrders = reviews.filter((review) => review._id !== id);
        setReviews(newOrders);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    const url = `https://blooming-escarpment-34729.herokuapp.com/reviews/${user.email}`;
    axios
      .get(url)
      .then((result) => setReviews(result.data))
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
    console.log(reviews);
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center fw-normal">My Reviews</h1>
        {isLoading ? (
          <Loading />
        ) : reviews.length === 0 ? (
          <>
            <p className="display-6 text-center">No reviews found!</p>
          </>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <div className="table-wrapper">
                  <div className="table-title"></div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Photo</th>
                        <th>rating</th>
                        <th>Review</th>
                        <th>Review Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!reviews.length > 0 ? (
                        <Loading />
                      ) : (
                        reviews.map((review, index) => (
                          <>
                            <tr key={review._id}>
                              <td>{review.username}</td>
                              <td>{review.email}</td>
                              <td>
                                <img
                                  src={review.photo_url}
                                  className="img-fluid w-100"
                                  alt="photo"
                                />
                              </td>
                              <td>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={parseInt(review.rating)}
                                  precision={0.5}
                                  readOnly
                                />
                              </td>
                              <td>{review.review_text}</td>
                              <td>{review.review_date}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    handleDelete(review._id);
                                  }}
                                  className="delete btn btn-danger"
                                  title="Delete"
                                  data-toggle="tooltip"
                                >
                                  <DeleteIcon />
                                </button>
                              </td>
                            </tr>
                          </>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyReviews;
