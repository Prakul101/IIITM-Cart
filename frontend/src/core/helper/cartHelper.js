export const updateCart = (prod, op, next, count = 0) => {
  // op --> new, del, set (set count)
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart"));

    if (op === "del") cart = cart.filter((product) => prod !== product._id);
    else {
      let id = cart.findIndex((item) => item._id === prod._id);
      if (id === -1) cart.push({ ...prod, count: 1 });
      else cart[id].count = count;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const getCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart"))
      return JSON.parse(localStorage.getItem("cart"));
  }
};

export const getCartIDCount = () => {
  let cart,
    ar = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart"));

    if (cart)
      cart.forEach((item) => ar.push({ id: item._id, count: item.count }));
    return ar;
  }
};

export const emptyCart = (next) => {
  if (typeof window !== undefined)
    localStorage.setItem("cart", JSON.stringify([]));
  next();
};
