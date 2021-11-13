import React, { useEffect, useState } from "react";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography, Pagination } from "@mui/material";
import axios from "axios";
import Product from "../pages/Home/Products/Product/Product";
import Loading from "./../shared/Loading/Loading";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`https://blooming-escarpment-34729.herokuapp.com/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", my: 2 }}
          component="h4"
        >
          Our All products
        </Typography>
        <Typography
          variant="p"
          sx={{ textAlign: "center", mb: 3, fontWeight: "600" }}
          component="p"
        >
          We have dynamic R&D team that is continuously involved in achieving
          <br />
          innovations for high precision premium class Ceiling Fans.
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 4, md: 3, lg: 2 }}
            columns={{ xs: 1, sm: 1, md: 12 }}
          >
            {!products.length > 0 ? (
              <Loading />
            ) : (
              products.map((product, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Product product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
        <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}></Box>
      </Container>
      <Footer />
    </>
  );
};

export default Shop;
