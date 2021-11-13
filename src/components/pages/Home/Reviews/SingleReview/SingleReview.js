import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
const SingleReview = (props) => {
  //props
  const { username, photo_url, review_text, rating } = props?.review;
  return (
    <div className="item">
      <div className="card card-shadow border-0 mb-4">
        <div className="card-body">
          <div className="position-relative thumb bg-success-gradiant d-inline-block text-white mb-4">
            <img
              src={photo_url}
              alt="wrapkit"
              className="thumb-img position-absolute rounded-circle"
            />
            {username}
          </div>
          <h5 className="font-weight-light">{review_text}</h5>
          <Rating
            name="half-rating-read"
            defaultValue={parseInt(rating)}
            precision={0.5}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
