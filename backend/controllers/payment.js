const stripe = require("stripe")(process.env.stripeSecret);
const { v4: uuid } = require("uuid");
const { Order } = require("../models");

exports.processPayment = (req, res, next) => {
  const { token, amt, products } = req.body;
  const idempotencyKey = uuid();

  return stripe.customers
    .create({ email: token.email, source: token.id })
    .then((customer) =>
      stripe.charges
        .create(
          {
            amount: amt * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
          },
          { idempotencyKey }
        )
        .then((result) => {
          const {
            id,
            billing_details: {
              address: { line1, city, postal_code },
            },
          } = result;
          
          Order.create(
            {
              products,
              transactionID: id,
              amount: amt,
              address: `${line1}, ${city}-${postal_code}`,
              user: req.profile._id,
            },
            (e, order) => {
              if (e) {
                console.log(e);
                return res
                  .status(500)
                  .json({ error: "Error occurred in Order creation" });
              } else next();
            }
          );
        })
        .catch((e) => console.log(e))
    );
};
