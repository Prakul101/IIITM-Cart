import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { API, Error, Success } from "../Commons";
import Base from "../core/Base";
import { getProducts, removeProduct } from "./helper/AdminAPI";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({
    error: "",
    loading: false,
    success: false,
    prodID: "",
  });
  const { error, loading, success, prodID } = status;
  const { user, token } = isAuthenticated();

  const reloadProducts = () =>
    getProducts().then((data) => {
      if (data.error) {
        setStatus({ ...status, error: data.error.trim() });
        if (data.error.trim() === "No products found") setProducts([]);
      } else setProducts(data);
    });

  useEffect(() => reloadProducts(), []);
  useEffect(() => {
    if (loading)
      removeProduct(user._id, prodID, token).then((data) => {
        if (data.error)
          setStatus({ ...status, error: data.error.trim(), loading: false });
        else {
          setStatus({ ...status, success: true, loading: false, prodID: "" });
          reloadProducts();
        }
      });
  }, [loading]);

  return (
    <Base>
      <h2 className="mb-4 text-center">Products</h2>
      <div className="container">
        <table className="table table-responsive text-white text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Price</th>
              <th>Collection</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          {products.map((prod, id) => (
            <tr key={id}>
              <td className="py-1">{id + 1}</td>
              <td className="py-1 w-25">
                <img
                  src={`${API}/product/image/${prod._id}`}
                  alt="Image"
                  className="img-fluid"
                />
              </td>
              <td className="py-1">{prod.name}</td>
              <td className="py-1">₹ {prod.price}</td>
              <td className="py-1">{prod.category.name}</td>
              <td className="py-1">{prod.quantity}</td>
              <td className="py-1">{prod.sold}</td>
              <td className="py-1">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${prod._id}`}>
                  Update
                </Link>
              </td>
              <td className="py-1">
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    setStatus({
                      error: false,
                      loading: true,
                      success: false,
                      prodID: prod._id,
                    })
                  }>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="mt-5 mx-2">
          <Success success={success} text={"Product removed"} />
          <Error error={error} />
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
