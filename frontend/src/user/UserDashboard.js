import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";

const UserDashboard = () => {
  const { user } = isAuthenticated();

  const userNav = () => (
    <div className="card">
      <h4 className="card-header bg-dark text-white">User Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link text-success" to="/user/profile">
            Update Profile
          </Link>
          <Link className="nav-link text-success" to={`/user/orders`}>
            View Orders
          </Link>
        </li>
      </ul>
    </div>
  );

  const userSection = () => (
    <div className="card mb-3">
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Name:</span>
          {` ${user.firstName} ${user.lastName}`}
        </li>
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Email:</span>
          {" " + user.email}
        </li>
      </ul>
    </div>
  );

  return (
    <Base className="container p-4">
      <div className="row">
        <div className="col-3">{userNav()}</div>
        <div className="col-9">{userSection()}</div>
      </div>
    </Base>
  );
};

export default UserDashboard;
