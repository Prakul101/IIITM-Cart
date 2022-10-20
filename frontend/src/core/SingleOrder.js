import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { API, Error } from "../Commons";
import { getSingleOrder } from "../user/helper/UserAPI";
import Base from "./Base";
import moment from "moment";

const SingleOrder = ({ match }) => {
  const [order, setOrder] = useState({
    address: "",
    amt: -1,
    placed: "",
    update: "",
    products: [],
    status: "",
    transactionID: "",
  });
  const {
    address,
    amt,
    placed,
    update,
    products,
    status,
    transactionID,
  } = order;

  const [error, setError] = useState("");
  const orderID = match.params.orderID;
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getSingleOrder(user._id, token, orderID).then((data) => {
      if (data.error) setError(data.error.trim());
      else if (data)
        setOrder({
          address: data.address,
          amt: data.amount,
          placed: moment(data.createdAt).format("DD MMM, YYYY"),
          update: moment(data.updatedAt).format("DD MMM, YYYY"),
          products: data.products,
          status: data.status,
          transactionID: data.transactionID,
        });
    });
  }, []);

  return (
    <Base className="py-5 container">
      {!error ? (
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-5">Receipt</span>
              <small className="font-monospace">Order ID: {orderID}</small>
            </div>
            <p className="font-monospace float-end m-0">
              <small>Transaction ID: {transactionID}</small>
            </p>
          </div>
          <div className="card-body">
            {products.map((prod, id) => {
              const { product, count } = prod;
              return product && (
                <div className="card shadow" key={id}>
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src={`${API}/product/image/${product._id}`}
                        alt={product.name}
                        className="w-100 home-img"
                      />
                    </div>
                    <div className="col-md-2 p-0 d-flex justify-content-center align-items-center">
                      <h4 className="card-title mb-0">{product.name}</h4>
                    </div>
                    <div className="col-md-2 p-0 d-flex justify-content-center align-items-center">
                      <span>Qty: {count}</span>
                    </div>
                    <div className="col-md-2 p-0 d-flex justify-content-center align-items-center">
                      <span className="text-muted">₹ {product.price}</span>
                    </div>
                    <div className="col-md-3 p-0 d-flex flex-column justify-content-center align-items-center">
                      <span>Total</span>
                      <span>₹ {product.price * count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card-footer">
            <p className="mt-2 mb-1 fw-bold">Order Details</p>
            <table className="table text-muted">
              <tr>
                <td>Grand Total</td>
                <td>₹ {amt}</td>
              </tr>
              <tr>
                <td>Invoice Date</td>
                <td>{placed}</td>
              </tr>
              <tr>
                <td>Order Status</td>
                <td>{status}</td>
              </tr>
              <tr>
                <td>Last Update</td>
                <td>{update}</td>
              </tr>
              <tr>
                <td>Shipping Address</td>
                <td>{address}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        <div className="center-error">
          <Error error={error} />
        </div>
      )}
    </Base>
  );
};

export default SingleOrder;
