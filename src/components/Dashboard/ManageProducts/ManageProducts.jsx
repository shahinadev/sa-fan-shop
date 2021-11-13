import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import "../MyOrders/MyOrders.css";
import Loading from "./../../shared/Loading/Loading";
import { Link } from "react-router-dom";
const ManageProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
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
            "Your file has been deleted.",
            "success"
          );
          deleteProduct(id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  //delete booking
  const deleteProduct = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://blooming-escarpment-34729.herokuapp.com/products/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          //filter orders after delete successfully..
          const newOrders = products.filter((order) => order._id != id);
          setProducts(newOrders);
        } else {
          alert("something is wrong...");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    const url = `https://blooming-escarpment-34729.herokuapp.com/products`;
    axios
      .get(url)
      .then((result) => setProducts(result.data.products))
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="text-center fw-normal">Manage All products</h1>

        {isLoading ? (
          <Loading />
        ) : products.length === 0 ? (
          <>
            <p className="display-6 text-center">No Order found!</p>
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
                        <th>Product image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Added by</th>
                        <th>Added date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!products.length > 0 ? (
                        <Loading />
                      ) : (
                        products.map((product, index) => (
                          <>
                            <tr key={index}>
                              <td>
                                <Link to={`/purchase/${product._id}`}>
                                  <img
                                    src={product.product_image}
                                    alt=" "
                                    className="img-thumbnail w-100"
                                  />
                                </Link>
                              </td>
                              <td>
                                <Link to={`/purchase/${product._id}`}>
                                  {product.product_name}
                                </Link>
                              </td>
                              <td>{product.price}</td>
                              <td>{product.product_quantity}</td>
                              <td>{product.product_desc.slice(0, 50)}...</td>
                              <td>{product.added_by}</td>
                              <td>{product.added_date}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    handleDelete(product._id);
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

export default ManageProducts;
