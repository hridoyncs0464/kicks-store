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
  .reviews-home-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) {
    .reviews-home-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .reviews-home-grid {
      grid-template-columns: 1fr;
    }
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
      <div className="review-skeleton" style={{ height: "220px" }} />
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
      <div style={{ flex: 1, minHeight: "220px", overflow: "hidden" }}>
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
      <section style={{ width: "100%", background: "#f3f3f3", padding: "40px 0", fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(24px, 6vw, 74px)", fontWeight: "600", color: "#111827", letterSpacing: "-1px", textTransform: "uppercase", lineHeight: 1 }}>
              Reviews
            </h2>
            <Link
              to="/reviews"
              style={{ background: "#3b5bdb", color: "#fff", borderRadius: "8px", padding: "8px 18px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}
            >
              See All
            </Link>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="reviews-home-grid">
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
            <div className="reviews-home-grid">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}