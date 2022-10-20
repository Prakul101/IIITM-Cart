require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth");
const catRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const prodRouter = require("./routes/product");
const userRouter = require("./routes/user");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("Database error"));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", catRouter);
app.use("/api", orderRouter);
app.use("/api", paymentRouter);
app.use("/api", prodRouter);
app.use("/api", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
