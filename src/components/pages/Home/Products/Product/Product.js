import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { product_name, price, product_image, product_desc, _id } = product;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product_name}
        sx={{ height: "100%", padding: "0" }}
        image={product_image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product_name} / ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product_desc.slice(0, 140)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/purchase/${_id}`}>
          <Button size="big" variant="contained" color="success">
            Buy Now
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Product;
