import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import "../MyOrders/MyOrders.css";
import Loading from "./../../shared/Loading/Loading";
const ManageOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState("");
  //handle delete
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
            "Order has been successfully deleted.",
            "success"
          );
          deleteOrder(id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "order is safe :)",
            "error"
          );
        }
      });
  };
  //show modal when status need to change
  const handleOption = (id) => {
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
        confirmButtonText: "save change!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Changed!",
            "Order status successfully changed!.",
            "success"
          );
          updateOrderStatus(id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "order is safe :)",
            "error"
          );
        }
      });
  };

  //delete order
  const deleteOrder = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://blooming-escarpment-34729.herokuapp.com/orders/${id}`)
      .then((res) => {
        //filter orders after delete successfully..
        const newOrders = orders.filter((order) => order._id != id);
        setOrders(newOrders);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  //update order status
  const updateOrderStatus = (id) => {
    setIsLoading(true);
    axios
      .put(`https://blooming-escarpment-34729.herokuapp.com/orders/`, {
        id,
        newStatus: status,
      })
      .then((res) => {
        setUpdate(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://blooming-escarpment-34729.herokuapp.com/orders/")
      .then((result) => setOrders(result.data))
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [update]);
  return (
    <>
      <div className="container">
        <h1 className="text-center fw-normal">Manage All Orders</h1>
        {isLoading ? (
          <Loading />
        ) : orders.length === 0 ? (
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
                        <th>Product Name</th>
                        <th>Total ordered</th>
                        <th>Total price</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>District</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!orders.length > 0 ? (
                        <Loading />
                      ) : (
                        orders.map((order, index) => (
                          <>
                            <tr key={order._id}>
                              <td>{order.product_name}</td>
                              <td>{order.product_quantity}</td>
                              <td>${order.product_price}</td>
                              <td>{order.phone}</td>
                              <td>{order.country}</td>
                              <td>{order.city}</td>
                              <td>{order.district}</td>
                              <td>{order.delivery_address}</td>
                              <td>{order.order_date}</td>
                              <td>{order.order_status}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    handleDelete(order._id);
                                  }}
                                  className="delete btn btn-danger"
                                  title="Delete"
                                  data-toggle="tooltip"
                                >
                                  <DeleteIcon />
                                </button>
                                <select
                                  onChange={(e) => {
                                    setStatus(e.target.value, order._id);
                                  }}
                                  className="form-control my-4 h-100"
                                >
                                  <option selected value="none" disabled>
                                    status update
                                  </option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                                <button
                                  className="update btn btn-success"
                                  onClick={() => handleOption(order._id)}
                                >
                                  <UpdateIcon />
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

export default ManageOrders;
