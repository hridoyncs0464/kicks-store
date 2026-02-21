
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

export function useReviews({ limit } = {}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);  // true by default — no need to set inside effect
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_ENDPOINTS.reviews, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setReviews(limit ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("useReviews fetch error:", err);
        setError("Failed to load reviews. Please try again.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [limit]);

  return { reviews, loading, error };
}


// // import { useState, useEffect } from "react";
// // import { API_ENDPOINTS } from "../config/api";

// import { useEffect, useState } from "react";
// import { API_ENDPOINTS } from "../config/api";


// export function useReviews({ limit } = {}) {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const controller = new AbortController();

//     setLoading(true);
//     setError(null);

//     fetch(API_ENDPOINTS.reviews, { signal: controller.signal })
//       .then((res) => {
//         if (!res.ok) throw new Error(`Server error: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setReviews(limit ? data.slice(0, limit) : data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err.name === "AbortError") return; // component unmounted — ignore
//         console.error("useReviews fetch error:", err);
//         setError("Failed to load reviews. Please try again.");
//         setLoading(false);
//       });

//     return () => controller.abort(); // cleanup on unmount
//   }, [limit]);

//   return { reviews, loading, error };
// }