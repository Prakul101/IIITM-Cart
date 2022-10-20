import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import StripeCheckout from "react-stripe-checkout";
import { API, Success } from "../Commons";
import { emptyCart } from "./helper/cartHelper";
import { useHistory } from "react-router";

const Payment = ({ products, setReload = (x) => x, reload = undefined }) => {
  const history = useHistory();
  const { user, token: authToken } = isAuthenticated();
  const [success, setSuccess] = useState(false);

  const totalAmt = () => {
    let amt = 0;
    products.map((prod) => (amt += prod.price * prod.count));
    return amt;
  };

  const getProductIDCount = () => {
    let ar = [];
    products.forEach((prod) =>
      ar.push({ product: prod._id, count: parseInt(prod.count) })
    );
    return ar;
  };

  const purchase = (token) =>
    fetch(`${API}/payment/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        token,
        amt: totalAmt(),
        products: getProductIDCount(),
      }),
    })
      .then(() => {
        emptyCart(() => {
          setSuccess(true);
          setReload(!reload);
        });
        setTimeout(() => history.push("/user/orders"), 1200);
      })
      .catch((e) => console.log(e));

  const setStatus = (token) => {
    setSuccess(false);
    purchase(token);
  };

  const paymentUI = () => {
    if (products.length === 0)
      return (
        <div>
          <h3>Cart is currently Empty</h3>
        </div>
      );
    else
      return (
        <div>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_KEY}
            token={setStatus}
            amount={totalAmt() * 100}
            currency="INR"
            email={user.email}
            shippingAddress
            zipCode
            allowRememberMe>
            <button className="btn btn-large btn-success">Buy</button>
          </StripeCheckout>
        </div>
      );
  };

  return (
    <div>
      <h3>Total Amount = ₹{totalAmt()}</h3>
      {paymentUI()}
      <div className="w-50">
        <Success
          success={success}
          text="Order Placed"
          extraText="Redirecting to orders page..."
        />
      </div>
    </div>
  );
};

export default Payment;
