import { useState, useEffect } from "react";
import { Link } from "react-router";

/* ── Inline responsive styles injected once ── */
const GRID_STYLE_ID = "kicks-reviews-grid-style";

function injectGridStyles() {
  if (document.getElementById(GRID_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = GRID_STYLE_ID;
  style.textContent = `
    .kicks-reviews-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    @media (max-width: 1024px) {
      .kicks-reviews-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 768px) {
      .kicks-reviews-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 480px) {
      .kicks-reviews-grid {
        grid-template-columns: 1fr;
      }
    }
    .kicks-review-card {
      border-radius: 16px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 1px 6px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .kicks-review-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
  `;
  document.head.appendChild(style);
}

/* ── Star Rating ── */
function StarRating({ rating, max = 5 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < rating ? "#f59e0b" : "#e5e7eb"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ fontSize: "12px", fontWeight: "700", color: "#374151", marginLeft: "3px" }}>
        {rating}.0
      </span>
    </div>
  );
}

/* ── Single Review Card ── */
function ReviewCard({ review }) {
  return (
    <div className="kicks-review-card">
      {/* Top: reviewer info */}
      <div style={{ padding: "14px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 3px", fontSize: "14px", fontWeight: "700", color: "#111827", fontFamily: "'Segoe UI', sans-serif" }}>
            Good Quality
          </h4>
          <p style={{ margin: "0 0 7px", fontSize: "12px", color: "#6b7280", lineHeight: "1.4", fontFamily: "'Segoe UI', sans-serif" }}>
            I highly recommend shopping from kicks
          </p>
          <StarRating rating={review.rating} />
        </div>
        <img
          src={review.image}
          alt={review.name}
          style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", marginLeft: "10px", flexShrink: 0 }}
        />
      </div>

      {/* Product image */}
      <div style={{ height: "160px", overflow: "hidden" }}>
        <img
          src={review.productImage}
          alt={review.productName}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Bottom: reviewer name + date */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: "600", color: "#374151", fontFamily: "'Segoe UI', sans-serif" }}>
          {review.name}
        </span>
        <span style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "'Segoe UI', sans-serif" }}>
          {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>
    </div>
  );
}

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div className="kicks-review-card" style={{ minHeight: "280px" }}>
      <div style={{ padding: "14px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: "14px", background: "#f3f4f6", borderRadius: "6px", marginBottom: "8px", width: "60%" }} />
          <div style={{ height: "12px", background: "#f3f4f6", borderRadius: "6px", marginBottom: "8px", width: "80%" }} />
          <div style={{ height: "12px", background: "#f3f4f6", borderRadius: "6px", width: "40%" }} />
        </div>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f3f4f6", marginLeft: "10px" }} />
      </div>
      <div style={{ height: "160px", background: "#f3f4f6" }} />
      <div style={{ padding: "10px 14px" }}>
        <div style={{ height: "12px", background: "#f3f4f6", borderRadius: "6px", width: "50%" }} />
      </div>
    </div>
  );
}

/* ── AllReviews Page ── */
export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    injectGridStyles();

    // Fetch from local JSON — swap for your backend API when ready:
    // fetch("http://localhost:5000/api/reviews")
    fetch("/data/reviewsData.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load reviews. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Page header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "24px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <Link
                to="/"
                style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}
              >
                Home
              </Link>
              <span style={{ color: "#d1d5db" }}>›</span>
              <span style={{ fontSize: "13px", color: "#111827", fontWeight: "600" }}>Reviews</span>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "800",
                color: "#111827",
                textTransform: "uppercase",
                letterSpacing: "-0.5px",
              }}
            >
              Customer Reviews
            </h1>
          </div>
          {!loading && (
            <span
              style={{
                background: "#eff6ff",
                color: "#3b5bdb",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {reviews.length} Reviews
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Error state */}
        {error && (
          <div style={{ textAlign: "center", color: "#ef4444", padding: "60px 0", fontSize: "15px" }}>
            {error}
          </div>
        )}

        {/* Skeleton loading */}
        {loading && (
          <div className="kicks-reviews-grid">
            {Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Reviews grid */}
        {!loading && !error && reviews.length > 0 && (
          <div className="kicks-reviews-grid">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reviews.length === 0 && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "80px 0" }}>
            <p style={{ fontSize: "16px", marginBottom: "8px" }}>No reviews yet.</p>
            <p style={{ fontSize: "13px" }}>Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}