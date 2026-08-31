const BASE_URL = "https://cyberpunk-library-981d8d401a96.herokuapp.com/books";

export async function getBooks() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createBook(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBook(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
