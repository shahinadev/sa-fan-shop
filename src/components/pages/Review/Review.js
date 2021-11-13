import React, { useState } from "react";
import { Container, Grid, Box, Typography, Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import Footer from "./../../shared/Footer/Footer";
import Header from "./../../shared/Header/Header";
import ReviewBanner from "../../../images/reviewBanner.jpg";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import useAuth from "./../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
const Review = () => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const { register, reset, handleSubmit } = useForm();
  //show message
  const success = () => {
    Swal.fire({
      icon: "success",
      title: "Thanks for your valuable review",
      showConfirmButton: true,
      timer: 2000,
    });
  };
  //handle review
  const onSubmit = (data) => {
    const newReview = { ...data };
    newReview.rating = rating;
    newReview.username = user.displayName;
    newReview.email = user.email;
    newReview.review_date = new Date().toLocaleDateString();
    newReview.photo_url =
      user.photoURL ||
      "https://firebasestorage.googleapis.com/v0/b/sa-fan-shop.appspot.com/o/default-avatar.png?alt=media&token=60726325-67d4-449b-9e89-f2ac82ccdf24";
    axios
      .post(
        "https://blooming-escarpment-34729.herokuapp.com/reviews",
        newReview
      )
      .then((res) => {
        if (res.data._id) {
          success();
          reset();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <Container className="my-5">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }}
        >
          <Grid item xs={6}>
            <Typography paragraph>Give your feedback / review us</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
              <Box sx={{ my: 3 }}>
                <TextField
                  sx={{ width: "50%" }}
                  id="standard-basic"
                  label="Name"
                  value={user.displayName}
                  variant="standard"
                />
              </Box>
              <Box>
                <TextField
                  sx={{ width: "50%" }}
                  id="standard-basic"
                  label="Email"
                  value={user.email}
                  variant="standard"
                />
              </Box>
              <Box sx={{ my: 3 }}>
                <TextField
                  sx={{ width: "50%" }}
                  id="filled-textarea"
                  label="Feedback / review"
                  placeholder="your feedback"
                  multiline
                  variant="standard"
                  {...register("review_text", {
                    required: true,
                  })}
                />
              </Box>
              <Box sx={{ my: 3 }}>
                <Typography component="legend">Start Review</Typography>
                <Rating
                  precision={0.5}
                  name="half-rating"
                  value={rating}
                  size="large"
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Grid>
          <Grid item xs={6}>
            <img src={ReviewBanner} className="w-100 rounded-3" alt="" />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Review;
