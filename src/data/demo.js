// Demo data for Concept Store
// Used when DEMO_MODE=true

import headphonesImage from "./headphones.png";
import watchImage from "./watch.png";
import powerBankImage from "./powerBank.png";
import keyboardImage from "./keyboard.png";
import adapterImage from "./adapter.png";
import phoneImage from "./phone.png";

export const demoFallbackImage = headphonesImage.src;

const seedProducts = [
  {
    id_product: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    image: headphonesImage.src
  },
  {
    id_product: 2,
    name: "Minimalist Watch",
    price: 89.99,
    description: "Elegant and simple analog watch with leather strap. Perfect for any occasion.",
    image: watchImage.src
  },
  {
    id_product: 3,
    name: "Portable Power Bank",
    price: 49.99,
    description: "20000mAh capacity with fast charging. Charges up to 3 devices simultaneously.",
    image: powerBankImage.src
  },
  {
    id_product: 4,
    name: "Mechanical Keyboard RGB",
    price: 159.99,
    description: "Professional gaming keyboard with RGB lighting and mechanical switches.",
    image: keyboardImage.src
  },
  {
    id_product: 5,
    name: "USB-C Hub Adapter",
    price: 39.99,
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
    image: adapterImage.src
  },
  {
    id_product: 6,
    name: "Phone Stand Premium",
    price: 24.99,
    description: "Adjustable aluminum phone stand with non-slip base. Compatible with all phones.",
    image: phoneImage.src
  }
];

export let demoProducts = [...seedProducts];

/**
 * Get all demo products
 */
export function getAllProducts() {
  return demoProducts;
}

/**
 * Get product by ID
 */
export function getProductById(id) {
  return demoProducts.find(p => p.id_product === parseInt(id));
}

/**
 * Search products by name (case-insensitive)
 */
export function searchProducts(query) {
  if (!query) return demoProducts;
  return demoProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Create product (simulated - doesn't actually save)
 * Returns the created product as if it were saved
 */
export function createProduct(data) {
  const lastId = demoProducts.length > 0
    ? Math.max(...demoProducts.map(p => p.id_product))
    : 0;
  const newId = lastId + 1;
  const newProduct = {
    id_product: newId,
    ...data,
    image: data.image || demoFallbackImage
  };

  demoProducts = [newProduct, ...demoProducts];
  return newProduct;
}

/**
 * Update product (simulated - doesn't actually save)
 * Returns updated product
 */
export function updateProduct(id, data) {
  const productIndex = demoProducts.findIndex(p => p.id_product === parseInt(id));
  if (productIndex === -1) return null;

  const updatedProduct = {
    ...demoProducts[productIndex],
    ...data,
    id_product: demoProducts[productIndex].id_product
  };

  demoProducts = demoProducts.map((product, index) =>
    index === productIndex ? updatedProduct : product
  );

  return updatedProduct;
}

/**
 * Delete product (simulated - doesn't actually delete)
 * Returns true if product exists
 */
export function deleteProduct(id) {
  const productIndex = demoProducts.findIndex(p => p.id_product === parseInt(id));
  if (productIndex === -1) return false;

  demoProducts = demoProducts.filter(p => p.id_product !== parseInt(id));
  return true;
}
