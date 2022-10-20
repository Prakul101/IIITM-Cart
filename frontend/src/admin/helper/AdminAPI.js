import { API } from "../../Commons";

export const getCategory = (catID) =>
  fetch(`${API}/category/${catID}`, { method: "GET" })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getAllCategories = () =>
  fetch(`${API}/categories`, { method: "GET" })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const createCategory = (userID, token, category) =>
  fetch(`${API}/category/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const updateCategory = (userID, catID, token, category) =>
  fetch(`${API}/category/${catID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const removeCategory = (userID, catID, token) =>
  fetch(`${API}/category/${catID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getProduct = (prodID) =>
  fetch(`${API}/product/${prodID}`, { method: "GET" })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getProducts = () =>
  fetch(`${API}/products?limit=25&sortBy=name&order=asc`, { method: "GET" })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getBestSellers = () =>
  fetch(`${API}/products`, { method: "GET" })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const createProduct = (userID, token, product) =>
  fetch(`${API}/product/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const updateProduct = (userID, prodID, token, product) =>
  fetch(`${API}/product/${prodID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const removeProduct = (userID, prodID, token) =>
  fetch(`${API}/product/${prodID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getOrders = (userID, token) =>
  fetch(`${API}/orders/${userID}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getAdminOrder = (userID, token, orderID) =>
  fetch(`${API}/admin/order/${orderID}/${userID}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const updateOrder = (userID, token, orderID, status) =>
  fetch(`${API}/order/${orderID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: status }),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
