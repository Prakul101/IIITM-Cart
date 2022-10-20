import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import {
  PrivateRoute,
  NonLoginRoute,
  NonAdminRoute,
  AdminRoute,
} from "./auth/AuthRoute";
import Home from "./core/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import Profile from "./user/Profile";
import UserOrders from "./user/UserOrders";
import SingleOrder from "./core/SingleOrder";
import Orders from "./admin/Orders";
import UpdateOrder from "./admin/UpdateOrder";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <NonAdminRoute path="/" component={Home} exact />
        <NonLoginRoute path="/register" component={Register} exact />
        <NonLoginRoute path="/login" component={Login} exact />
        <NonAdminRoute path="/cart" component={Cart} exact />
        <PrivateRoute path="/user/dashboard" component={UserDashboard} exact />
        <PrivateRoute path="/user/profile" component={Profile} exact />
        <PrivateRoute path="/user/orders" component={UserOrders} exact />
        <PrivateRoute path="/order/:orderID" component={SingleOrder} exact />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
        <AdminRoute
          path="/admin/create/category"
          component={AddCategory}
          exact
        />
        <AdminRoute
          path="/admin/category/update/:catID"
          component={UpdateCategory}
          exact
        />
        <AdminRoute
          path="/admin/categories"
          component={ManageCategories}
          exact
        />
        <AdminRoute path="/admin/create/product" component={AddProduct} exact />
        <AdminRoute
          path="/admin/product/update/:prodID"
          component={UpdateProduct}
          exact
        />
        <AdminRoute path="/admin/products" component={ManageProducts} exact />
        <AdminRoute path="/admin/orders" component={Orders} exact />
        <AdminRoute path="/admin/order/:orderID" component={UpdateOrder} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
