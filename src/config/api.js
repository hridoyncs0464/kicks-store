// =====================================================
// 🔧 API CONFIGURATION
// Change BASE_URL here when your backend is ready.
// That's the ONLY change needed across the whole app.
// =====================================================

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const API_ENDPOINTS = {
  reviews: `${BASE_URL}/sharedData/reviewData.json`, 
  // When backend is ready, this becomes:
  // reviews: `${BASE_URL}/api/reviews`,
};


