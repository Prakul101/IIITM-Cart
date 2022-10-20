import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { API } from "../Commons";
import "../styles.css";
import Base from "./Base";
import { getCart, updateCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const { user } = isAuthenticated();
  useEffect(() => setProducts(getCart()), [reload]);

  return (
    <Base title="Cart">
      <div className="row">
        <div className="col-6 mb-4">
          {products ? (
            products.map((prod, id) => (
              <div className="card bg-dark mb-3" key={id}>
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={`${API}/product/image/${prod._id}`}
                      alt={prod.name}
                      className="w-100 cart-img"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h4 className="card-title">{prod.name}</h4>
                      <p className="small text-muted text-uppercase mb-2">
                        {prod.category.name} Collection
                      </p>
                      <span>₹ {prod.price}</span>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column justify-content-evenly">
                    <select
                      className="form-select form-select-sm w-75"
                      id="quantity"
                      onChange={(event) =>
                        updateCart(
                          prod,
                          "set",
                          () => setReload(!reload),
                          event.target.value
                        )
                      }
                      value={parseInt(prod.count) > 10 ? "10" : prod.count}>
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
                    <button
                      className="btn btn-sm btn-danger w-75"
                      onClick={() =>
                        updateCart(prod._id, "del", () => setReload(!reload))
                      }>
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-center">No Products in Cart</h3>
          )}
        </div>
        <div className="col-6">
          {user ? (
            <Payment
              products={products}
              setReload={setReload}
              reload={reload}
            />
          ) : (
            <h3>Please login for checkout</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
