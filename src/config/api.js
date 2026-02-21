// =====================================================
// 🔧 API CONFIGURATION
// This is the ONLY file you need to change when
// switching from local/fake API to your real backend.
// =====================================================

const BASE_URL = import.meta.env.VITE_API_URL || "";
const PLATZI_API = "https://api.escuelajs.co/api/v1";

export const API_ENDPOINTS = {
  // ── Reviews (local JSON → swap to backend later) ──
  reviews: `${BASE_URL}/sharedData/reviewData.json`,
  // reviews: `${BASE_URL}/api/reviews`,  ← uncomment when backend ready

  // ── Products (Platzi Fake API → swap to backend later) ──
  products:   `${PLATZI_API}/products/?categoryId=4&limit=10&offset=0`,
  categories: `${PLATZI_API}/categories`,
  productById: (id) => `${PLATZI_API}/products/${id}`,
  newDrops: `${PLATZI_API}/products/?offset=34&limit=4`, // IDs 35-38
  // products:    `${BASE_URL}/api/products`,   ← uncomment when backend ready
  // categories:  `${BASE_URL}/api/categories`, ← uncomment when backend ready
  // productById: (id) => `${BASE_URL}/api/products/${id}`,
  // newDrops:    `${BASE_URL}/api/products/new-drops`, ← uncomment when backend ready
};