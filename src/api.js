const API_URL = "https://my-store-api-sgnu.onrender.com";

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
}
