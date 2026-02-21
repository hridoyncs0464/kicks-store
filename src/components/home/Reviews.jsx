import { Link } from "react-router";
import { useReviews } from "../../hooks/useReviews";

const loaderStyle = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .review-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }
`;

function StarRating({ rating, max = 5 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24"
          fill={i < rating ? "#f59e0b" : "#e5e7eb"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ fontSize: "13px", fontWeight: "700", color: "#374151", marginLeft: "4px" }}>
        {rating}.0
      </span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ borderRadius: "16px", overflow: "hidden", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div className="review-skeleton" style={{ height: "14px", borderRadius: "6px", marginBottom: "8px", width: "55%" }} />
          <div className="review-skeleton" style={{ height: "12px", borderRadius: "6px", marginBottom: "10px", width: "80%" }} />
          <div className="review-skeleton" style={{ height: "12px", borderRadius: "6px", width: "40%" }} />
        </div>
        <div className="review-skeleton" style={{ width: "44px", height: "44px", borderRadius: "50%", marginLeft: "12px", flexShrink: 0 }} />
      </div>
      <div className="review-skeleton" style={{ height: "180px" }} />
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div style={{ borderRadius: "16px", overflow: "hidden", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "700", color: "#111827", fontFamily: "'Segoe UI', sans-serif" }}>
            Good Quality
          </h4>
          <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#6b7280", lineHeight: "1.4", fontFamily: "'Segoe UI', sans-serif" }}>
            I highly recommend shopping from kicks
          </p>
          <StarRating rating={review.rating} />
        </div>
        <img src={review.image} alt={review.name}
          style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", marginLeft: "12px", flexShrink: 0 }}
        />
      </div>
      <div style={{ height: "180px", overflow: "hidden" }}>
        <img src={review.productImage} alt={review.productName}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}

export default function Reviews() {
  const { reviews, loading, error } = useReviews({ limit: 3 });

  return (
    <>
      <style>{loaderStyle}</style>
      <section style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#111827", letterSpacing: "-0.5px", textTransform: "uppercase" }}>
            Reviews
          </h2>
          <Link to="/reviews" style={{ background: "#3b5bdb", color: "#fff", borderRadius: "8px", padding: "8px 18px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
            See All
          </Link>
        </div>

        {/* Skeleton */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{ textAlign: "center", color: "#ef4444", padding: "40px 0", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}

      </section>
    </>
  );
}

// import { useEffectEvent, useState } from "react";
// import { Link } from "react-router";

// function StarRating({ rating, max = 5 }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
//       {Array.from({ length: max }, (_, i) => (
//         <svg
//           key={i}
//           width="15"
//           height="15"
//           viewBox="0 0 24 24"
//           fill={i < rating ? "#f59e0b" : "#e5e7eb"}
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//         </svg>
//       ))}
//       <span style={{ fontSize: "13px", fontWeight: "700", color: "#374151", marginLeft: "4px" }}>
//         {rating}.0
//       </span>
//     </div>
//   );
// }

// function ReviewCard({ review }) {
//   return (
//     <div
//       style={{
//         borderRadius: "16px",
//         overflow: "hidden",
//         background: "#fff",
//         boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//         <div style={{ flex: 1 }}>
//           <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "700", color: "#111827" }}>
//             Good Quality
//           </h4>
//           <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#6b7280", lineHeight: "1.4" }}>
//             I highly recommend shopping from kicks
//           </p>
//           <StarRating rating={review.rating} />
//         </div>
//         <img
//           src={review.image}
//           alt={review.name}
//           style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", marginLeft: "12px", flexShrink: 0 }}
//         />
//       </div>
//       <div style={{ height: "180px", overflow: "hidden" }}>
//         <img
//           src={review.productImage}
//           alt={review.productName}
//           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffectEvent(() => {
//     // Fetch from local JSON — swap this URL for your backend API endpoint when ready
//     // e.g. fetch("http://localhost:5000/api/reviews")
//     fetch("/data/reviewsData.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setReviews(data.slice(0, 3)); // Show only first 3 on homepage
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load reviews:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <section style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Segoe UI', sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
//         <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#111827", letterSpacing: "-0.5px", textTransform: "uppercase" }}>
//           Reviews
//         </h2>
//         <Link
//           to="/reviews"
//           style={{
//             background: "#3b5bdb",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             padding: "8px 18px",
//             fontSize: "12px",
//             fontWeight: "700",
//             letterSpacing: "0.5px",
//             textTransform: "uppercase",
//             textDecoration: "none",
//             display: "inline-block",
//           }}
//         >
//           See All
//         </Link>
//       </div>

//       {/* Loading state */}
//       {loading && (
//         <div style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Loading reviews...</div>
//       )}

//       {/* Cards grid */}
//       {!loading && (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
//           {reviews.map((review) => (
//             <ReviewCard key={review._id} review={review} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }