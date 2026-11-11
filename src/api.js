const API_URL = "https://my-store-api-sgnu.onrender.com";

let productsRequest;

export function fetchProducts() {
  if (!productsRequest) {
    productsRequest = fetch(`${API_URL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        return response.json();
      })
      .finally(() => {
        productsRequest = undefined;
      });
  }

  return productsRequest;
}
