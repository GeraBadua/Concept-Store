// Demo data for Concept Store
// Used when DEMO_MODE=true

export const demoProducts = [
  {
    id_product: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
  },
  {
    id_product: 2,
    name: "Minimalist Watch",
    price: 89.99,
    description: "Elegant and simple analog watch with leather strap. Perfect for any occasion.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
  },
  {
    id_product: 3,
    name: "Portable Power Bank",
    price: 49.99,
    description: "20000mAh capacity with fast charging. Charges up to 3 devices simultaneously.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
  },
  {
    id_product: 4,
    name: "Mechanical Keyboard RGB",
    price: 159.99,
    description: "Professional gaming keyboard with RGB lighting and mechanical switches.",
    image: "https://images.unsplash.com/photo-1587829191301-9651642fac16?w=500&h=500&fit=crop"
  },
  {
    id_product: 5,
    name: "USB-C Hub Adapter",
    price: 39.99,
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop"
  },
  {
    id_product: 6,
    name: "Phone Stand Premium",
    price: 24.99,
    description: "Adjustable aluminum phone stand with non-slip base. Compatible with all phones.",
    image: "https://images.unsplash.com/photo-1586253408467-8f0ae5b5b113?w=500&h=500&fit=crop"
  }
];

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
  const newId = Math.max(...demoProducts.map(p => p.id_product), 0) + 1;
  return {
    id_product: newId,
    ...data,
    image: data.image || "https://images.unsplash.com/photo-1627979435509-be10e53dce6c?w=500&h=500&fit=crop"
  };
}

/**
 * Update product (simulated - doesn't actually save)
 * Returns updated product
 */
export function updateProduct(id, data) {
  const product = getProductById(id);
  if (!product) return null;
  
  return {
    id_product: product.id_product,
    ...data
  };
}

/**
 * Delete product (simulated - doesn't actually delete)
 * Returns true if product exists
 */
export function deleteProduct(id) {
  return getProductById(id) !== undefined;
}
