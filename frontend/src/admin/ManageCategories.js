import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";
import { getAllCategories, removeCategory } from "./helper/AdminAPI";
import { Error, Success } from "../Commons";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({
    error: "",
    loading: false,
    success: false,
    catID: "",
  });
  const { error, loading, success, catID } = status;
  const { user, token } = isAuthenticated();

  const reloadCategories = () =>
    getAllCategories().then((data) => {
      if (data.error) {
        setStatus({ ...status, error: data.error.trim() });
        if (data.error.trim() === "No collections found") setCategories([]);
      } else setCategories(data);
    });

  useEffect(() => reloadCategories(), []);
  useEffect(() => {
    if (loading)
      removeCategory(user._id, catID, token).then((data) => {
        if (data.error)
          setStatus({ ...status, error: data.error.trim(), loading: false });
        else {
          setStatus({ ...status, success: true, loading: false, catID: "" });
          reloadCategories();
        }
      });
  }, [loading]);

  return (
    <Base>
      <h2 className="mb-4 text-center">Collections</h2>
      <div className="container">
        <table className="table table-responsive text-white text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Collection Name</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          {categories.map((cat, id) => (
            <tr key={id}>
              <td className="py-1">{id + 1}</td>
              <td className="py-1">{cat.name}</td>
              <td className="py-1">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${cat._id}`}>
                  Update
                </Link>
              </td>
              <td className="py-1">
                <button
                  onClick={() =>
                    setStatus({
                      error: false,
                      loading: true,
                      success: false,
                      catID: cat._id,
                    })
                  }
                  className="btn btn-danger">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="mt-5 mx-2">
          <Success success={success} text={"Collection removed"} />
          <Error error={error} />
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
