import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";
import { getOrders } from "./helper/AdminAPI";
import { Error } from "../Commons";
import moment from "moment";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [view, setView] = useState(true);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getOrders(user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error.trim());
        setView(data.error !== "No orders found");
      } else {setOrders(data);}
    });
  }, []);

  return (
    <Base>
      {view && <h2 className="mb-4 text-center">Orders</h2>}
      <div className="container">
        {!error && (
          <table className="table table-responsive text-white text-center mx-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Placed</th>
                <th>Status</th>
                <th>View Order</th>
              </tr>
            </thead>
            {orders.length && orders.map((order, id) => (
              <tr key={id}>
                <td className="py-1">{id + 1}</td>
                <td className="py-1">
                  {order.user.firstName} {order.user.lastName}
                </td>
                <td className="py-1">{order.user.email}</td>
                <td className="py-1">{order.address}</td>
                <td className="py-1">₹ {order.amount}</td>
                <td className="py-1">
                  {moment(order.createdAt).format("D MMM, hh:MM A")}
                </td>
                <td className="py-1">{order.status}</td>
                <td className="py-1">
                  <Link
                    className="btn btn-success"
                    to={`/admin/order/${order._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        )}
        <div className={view ? "mt-5 mx-2" : "center-error"}>
          <Error error={error} />
        </div>
      </div>
    </Base>
  );
};

export default Orders;
