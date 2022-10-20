import moment from "moment";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { API, Error, Success } from "../Commons";
import Base from "../core/Base";
import { getAdminOrder, updateOrder } from "./helper/AdminAPI";

const UpdateOrder = ({ match }) => {
  const [order, setOrder] = useState({
    address: "",
    amt: -1,
    placed: "",
    updated: "",
    products: [],
    transactionID: "",
    user: { firstName: "", lastName: "", email: "" },
  });
  const {
    address,
    amt,
    placed,
    updated,
    products,
    transactionID,
    user: { firstName, lastName, email },
  } = order;

  const [status, setStatus] = useState("");
  const [update, setUpdate] = useState({ error: false, success: false });
  const { error, success } = update;

  const { user: admin, token } = isAuthenticated();
  const orderID = match.params.orderID;

  const reloadOrder = () =>
    getAdminOrder(admin._id, token, orderID).then((data) => {
      if (data.error) setUpdate({ error: data.error.trim, success: false });
      else if (data) {
        setOrder({
          address: data.address,
          amt: data.amount,
          placed: moment(data.createdAt).format("DD MMM, YYYY"),
          updated: moment(data.updatedAt).format("DD MMM, YYYY"),
          products: data.products,
          transactionID: data.transactionID,
          user: {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
          },
        });
        setStatus(data.status);
      }
    });

  useEffect(() => reloadOrder(), []);

  const onSubmit = (event) => {
    event.preventDefault();
    setUpdate({ error: false, success: false });
    updateOrder(admin._id, token, orderID, status).then((data) => {
      if (data.error) setStatus({ error: data.error.trim(), success: false });
      else {
        setStatus({ error: false, success: true });
        reloadOrder();
      }
    });
  };

  return (
    <Base className="py-4 container">
      {!error || error === "Failed to update the order" ? (
        <>
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5">Order Details</span>
                <small className="font-monospace">Order ID: {orderID}</small>
              </div>
              <p className="font-monospace float-end m-0">
                <small>Transaction ID: {transactionID}</small>
              </p>
            </div>
            <div className="card-body">
              {products.map((prod, id) => {
                const { product, count } = prod;
                return (
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
                  <td>Last Update</td>
                  <td>{updated}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    {firstName} {lastName}
                  </td>
                </tr>
                <tr>
                  <td>E-Mail ID</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Shipping Address</td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td>
                    <select
                      id="status"
                      className="form-select form-select-sm w-50 mt-2 p-1 border border-1 border-info rounded"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                      required>
                      <option value="Placed">Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>

                <button
                  type="submit"
                  onClick={onSubmit}
                  className="btn btn-outline-info">
                  Update Order Status
                </button>
              </table>
            </div>
          </div>
          <div className="mx-2">
            <Success success={success} text="Order updated" />
            <Error error={error} />
          </div>
        </>
      ) : (
        <div className="center-error">
          <Error error={error} />
        </div>
      )}
    </Base>
  );
};

export default UpdateOrder;
