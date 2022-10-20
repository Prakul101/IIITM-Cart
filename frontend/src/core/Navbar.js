import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../auth";

const navItem = (history, goto, name) => (
  <li className="nav-item">
    <Link
      style={{ color: history.location.pathname === goto ? "#2ecc72" : "#fff" }}
      className="nav-link p-3"
      to={goto}
    >
      {name}
    </Link>
  </li>
);

const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      { (
        <Link className="nav-link pt-3" to="/">
          <img
            src="/Logo.png"
            // public/Logo.png
            alt="IIITM Cat"
            height="30"
        
          />
        </Link>
      )}
      {(!isAuthenticated() ||
        (isAuthenticated() && isAuthenticated().user.role === 0)) &&
        navItem(history, "/", "Home")}
      {(!isAuthenticated() ||
        (isAuthenticated() && isAuthenticated().user.role === 0)) &&
        navItem(history, "/cart", "Cart")}
      {!isAuthenticated() && (
        <>
          {navItem(history, "/register", "Register")}
          {navItem(history, "/login", "Login")}
        </>
      )}
      {isAuthenticated() &&
        navItem(
          history,
          isAuthenticated().user.role === 1
            ? "/admin/dashboard"
            : "/user/dashboard",
          "Dashboard"
        )}
      {isAuthenticated() && (
        <li className="nav-item" onClick={logout}>
          <Link className="nav-link text-warning p-3" to="/">
            Logout
          </Link>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
