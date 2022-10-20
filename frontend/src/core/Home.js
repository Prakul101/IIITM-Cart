import React, { useState, useEffect } from "react";
import { getBestSellers } from "../admin/helper/AdminAPI";
import { Error, API } from "../Commons";
import Base from "./Base";
import Modal from "react-bootstrap/Modal";
import { getCartIDCount, updateCart } from "./helper/cartHelper";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({ open: false, name: "", desc: "" });
  const { open, name, desc } = modal;

  useEffect(() => {
    getBestSellers().then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error.trim());
          if (data.error.trim() === "No products found") setProducts([]);
        } else setProducts(data);
      } else setError("Unable to fetch products from the Database");
    });

    setCart(getCartIDCount());
  }, [reload]);

  const CartFunctions = ({ product }) => {
    let cartProd = cart.find((prod) => prod.id === product._id);
    return cartProd ? (
      <div className="row">
        <div className="col-auto">
          <label
            htmlFor="quantity"
            className="col-form-label col-form-label-sm">
            Quantity:
          </label>
        </div>
        <div className="col">
          <select
            className="form-select form-select-sm"
            id="quantity"
            onChange={(event) =>
              event.target.value === "0"
                ? updateCart(product._id, "del", () => setReload(!reload))
                : updateCart(
                    product,
                    "set",
                    () => setReload(!reload),
                    event.target.value
                  )
            }
            value={parseInt(cartProd.count) > 10 ? "10" : cartProd.count}>
            <option value="0">0 (delete)</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    ) : (
      <div className="row">
        <button
          onClick={() => updateCart(product, "new", () => setReload(!reload))}
          className="btn btn-sm btn-success card-btn"
          type="button">
          Add to Cart
        </button>
        <button
          className="btn btn-sm btn-light card-btn"
          onClick={() =>
            setModal({
              open: true,
              name: product.name,
              desc: product.description.replace(/\\n/g, "\n"),
            })
          }>
          Details
        </button>
      </div>
    );
  };

  return (
    <Base title="Home">
      <div className="row text-center m-1">
        {products.map((prod, id) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={id}>
            <div className="card bg-dark">
              <img
                src={`${API}/product/image/${prod._id}`}
                alt={prod.name}
                className="img-fluid w-100 home-img"
              />
              <div className="card-body">
                <h4 className="card-title">{prod.name}</h4>
                <p className="small text-muted text-uppercase mb-2">
                  {prod.category.name} Collection
                </p>
                <span>₹ {prod.price}</span>
                <hr className="mt-2 mb-4" />
                <CartFunctions product={prod} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={open}
        onHide={() => setModal({ ...modal, open: false })}
        centered>
        <Modal.Header className="fw-bold">Description for {name}</Modal.Header>
        <Modal.Body className="mb-3">
          {desc.split("\n").map((line, id) => (
            <span key={id}>
              {line.startsWith("http") ? (
                <a href={line} className="text-decoration-none">
                  Original Product Link
                </a>
              ) : (
                line
              )}
              <br />
            </span>
          ))}
        </Modal.Body>
      </Modal>
      <div className="center-error">
        {error === "Unable to fetch products from the Database" && (
          <Error error={error} />
        )}
      </div>
    </Base>
  );
};

export default Home;
