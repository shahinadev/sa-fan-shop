import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const successMessage = (message, status) => {
    Swal.fire({
      icon: status,
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleMakeAdmin = () => {
    const data = {
      email,
    };
    axios
      .put(`https://blooming-escarpment-34729.herokuapp.com//make-admin/`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data?._id) {
          successMessage("User successfully changed to admin!", "success");
        } else {
          successMessage("user not found by the given email", "error");
        }
        setEmail("");
      });
  };
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Make An Admin
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField
          sx={{ width: { lg: "50%", sm: "100%" } }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="demo-helper-text-misaligned"
          label="Email"
        />
        <Button variant="contained" onClick={handleMakeAdmin}>
          Make Admin
        </Button>
      </Box>
    </>
  );
};

export default MakeAdmin;
