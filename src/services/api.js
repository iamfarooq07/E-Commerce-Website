const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('ecommerce_token') || ''}`,
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// Admin stats
export const fetchAdminStats = () =>
  fetch(`${API_URL}/admin/stats`, { headers: getHeaders() }).then(handleResponse);

// Admin orders
export const fetchAdminOrders = () =>
  fetch(`${API_URL}/admin/orders`, { headers: getHeaders() }).then(handleResponse);

export const updateOrderStatus = (id, status) =>
  fetch(`${API_URL}/admin/orders/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  }).then(handleResponse);

// Admin users
export const fetchAdminUsers = () =>
  fetch(`${API_URL}/admin/users`, { headers: getHeaders() }).then(handleResponse);

// Public products (customer-facing)
export const fetchPublicProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetch(`${API_URL}/food${query ? `?${query}` : ''}`).then(handleResponse);
};

// Products CRUD (admin)
export const fetchProducts = () =>
  fetch(`${API_URL}/admin/products`, { headers: getHeaders() }).then(handleResponse);

export const createProduct = (data) =>
  fetch(`${API_URL}/admin/products`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateProduct = (id, data) =>
  fetch(`${API_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteProduct = (id) =>
  fetch(`${API_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(handleResponse);
