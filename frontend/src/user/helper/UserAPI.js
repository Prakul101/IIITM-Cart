import { API } from "../../Commons";

export const updateUser = (userID, token, user) =>
  fetch(`${API}/user/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getUserOrders = (userID, token) =>
  fetch(`${API}/user/orders/${userID}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

export const getSingleOrder = (userID, token, orderID) =>
  fetch(`${API}/order/${orderID}/${userID}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
