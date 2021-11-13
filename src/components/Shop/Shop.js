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
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const size = 10;
    axios
      .get(
        `https://blooming-escarpment-34729.herokuapp.com/products?page=${page}&&size=${size}`
      )
      .then((res) => {
        setProducts(res.data.products);
        const pageNumber = Math.ceil(res.data.count / size);
        setPageCount(pageNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
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
        <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="secondary"
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Shop;
