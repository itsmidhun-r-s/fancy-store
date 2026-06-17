const BASE_URL = "http://localhost/backend";

export const api = {
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getProducts: async (category = "", search = "") => {
    const res = await fetch(
      `${BASE_URL}/products/getproducts.php?category=${category}&search=${search}`
    );
    return res.json();
  },

  addProduct: async (data) => {
    const res = await fetch(`${BASE_URL}/products/addProducts.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProduct: async (data) => {
    const res = await fetch(`${BASE_URL}/products/updateProduct.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/deleteProduct.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.json();
  },

  addToCart: async (user_id, product_id, quantity) => {
    const res = await fetch(`${BASE_URL}/cart/addToCart.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, product_id, quantity }),
    });
    return res.json();
  },

  getCart: async (user_id) => {
    const res = await fetch(
      `${BASE_URL}/cart/getCart.php?user_id=${user_id}`
    );
    return res.json();
  },

  placeOrder: async (data) => {
    const res = await fetch(`${BASE_URL}/orders/placeOrder.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getOrders: async (user_id, role = "user") => {
    const res = await fetch(
      `${BASE_URL}/orders/getOrders.php?user_id=${user_id}&role=${role}`
    );
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/categories/getCategories.php`);
    return res.json();
  },
};