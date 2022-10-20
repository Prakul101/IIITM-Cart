import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Error } from "../Commons";
import Base from "../core/Base";
import { getUserOrders } from "./helper/UserAPI";
import moment from "moment";

const UserOrders = () => {
  const { user, token } = isAuthenticated();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [view, setView] = useState(true);

  useEffect(() => {
    getUserOrders(user._id, token).then((data) => {
      data.error ? setError(data.error.trim()) : setOrders(data);
      setView(data.error !== "No orders found for the current user");
    });
  }, []);

  return (
    <Base>
      {view && <h2 className="mb-4 text-center">Orders</h2>}
      <div className="container">
        {!error && (
          <table className="table table-responsive text-white text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Placed</th>
                <th>Last update</th>
                <th>Status</th>
                <th>View Order Details</th>
              </tr>
            </thead>
            {orders.map((order, id) => (
              <tr key={id}>
                <td className="py-1">{id + 1}</td>
                <td className="py-1">₹ {order.amount}</td>
                <td className="py-1">{order.address}</td>
                <td className="py-1">
                  {moment(order.createdAt).format("DD MMM, YYYY")}
                </td>
                <td className="py-1">
                  {moment(order.updatedAt).format("DD MMM, YYYY")}
                </td>
                <td className="py-1">{order.status}</td>
                <td className="py-1">
                  <Link
                    className="btn btn-sm btn-info text-white"
                    to={`/order/${order._id}`}>
                    Order details
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

export default UserOrders;
