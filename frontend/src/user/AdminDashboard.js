import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";

const AdminDashboard = () => {
  const {
    user: { firstName, lastName, email, role },
  } = isAuthenticated();

  const adminNav = () => (
    <div className="card">
      <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link text-success" to="/admin/create/category">
            Create Collection
          </Link>
          <Link className="nav-link text-success" to="/admin/categories">
            Manage Collections
          </Link>
          <Link className="nav-link text-success" to="/admin/create/product">
            Create Product
          </Link>
          <Link className="nav-link text-success" to="/admin/products">
            Manage Products
          </Link>
          <Link className="nav-link text-success" to="/admin/orders">
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminSection = () => (
    <div className="card mb-3">
      <h4 className="card-header">Admin Info</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Name: </span>{" "}
          {firstName + " " + lastName}
        </li>
        <li className="list-group-item">
          <span className="badge bg-success mr-2">Email: </span> {email}
        </li>
      </ul>
    </div>
  );

  return (
    <Base className="container p-4">
      <div className="row">
        <div className="col-3">{adminNav()}</div>
        <div className="col-9">{adminSection()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
