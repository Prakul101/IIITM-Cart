import { API } from "../Commons";

export const register = (user) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const login = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const auth = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    return fetch(`${API}/logout`, { method: "GET" })
      .then((res) => console.log("Logged out successfully"))
      .catch((e) => console.log(e));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  else if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};
