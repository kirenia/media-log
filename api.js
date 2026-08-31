// must be a static process.env.X reference for expo to inline it
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://cyberpunk-library-981d8d401a96.herokuapp.com";

async function request(path, { token, ...options } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.message || "Something went wrong");
    error.status = res.status;
    throw error;
  }
  return body;
}

// auth
export const signup = (email, password) =>
  request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getMe = (token) => request("/auth/me", { token });

// books -- all of these need a token now
export const getBooks = (token) => request("/books", { token });

export const createBook = (data, token) =>
  request("/books", { method: "POST", token, body: JSON.stringify(data) });

export const updateBook = (id, data, token) =>
  request(`/books/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });

export const deleteBook = (id, token) =>
  request(`/books/${id}`, { method: "DELETE", token });
