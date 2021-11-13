import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview/SingleReview";
import "./SingleReview/ReviewCard.css";
import axios from "axios";
import Loading from "./../../../shared/Loading/Loading";
import { Pagination } from "@mui/material";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const size = 3;
    axios
      .get(
        `https://blooming-escarpment-34729.herokuapp.com/reviews?page=${page}&&size=${size}`
      )
      .then((res) => {
        setReviews(res.data.reviews);
        const count = res.data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  return (
    <div>
      <div className="testimonial1 py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h4 className="my-3">Check what our Customers are Saying</h4>
              <h6 className="subtitle font-weight-normal">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt
              </h6>
            </div>
          </div>
          <div className="owl-carousel owl-theme testi1 mt-4">
            {!reviews.length > 0 ? (
              <Loading />
            ) : (
              reviews.map((review) => (
                <SingleReview key={review._id} review={review} />
              ))
            )}
            <Pagination
              count={pageCount}
              onChange={(event, value) => {
                setPage(value);
              }}
              color="secondary"
            />

            {/* {[...Array(pageCount).keys()].map((index) => (
              <button
                key={index}
                className={`btn btn-primary mx-2 ${
                  page === index && "selected"
                }`}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
