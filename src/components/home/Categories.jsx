import { useState } from "react";
import { useNavigate } from "react-router";
import { useCategories, useProducts } from "../context/ProductsContext";

const styles = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .cat-skeleton {
    background: linear-gradient(90deg, #ddd 25%, #ccc 50%, #ddd 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
`;

function SkeletonCard() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="cat-skeleton" style={{ height: "320px", borderRadius: "24px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="cat-skeleton" style={{ height: "13px", width: "80px", marginBottom: "6px" }} />
          <div className="cat-skeleton" style={{ height: "20px", width: "130px" }} />
        </div>
        <div className="cat-skeleton" style={{ width: "36px", height: "36px", borderRadius: "8px" }} />
      </div>
    </div>
  );
}

// Cleans Platzi API image URLs (some are JSON strings)
function cleanImage(raw) {
  try {
    if (typeof raw === "string" && raw.startsWith("[")) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed[0] : raw;
    }
  } catch (_) {}
  return raw;
}

export default function Categories() {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const { products, loading: prodLoading } = useProducts();
  const [pageIndex, setPageIndex] = useState(0);
  const navigate = useNavigate();

  const loading = catLoading || prodLoading;
  const totalPages = Math.ceil(categories.length / 2);
  const visibleCats = categories.slice(pageIndex * 2, pageIndex * 2 + 2);

  const goPrev = () => setPageIndex((i) => (i - 1 + totalPages) % totalPages);
  const goNext = () => setPageIndex((i) => (i + 1) % totalPages);

  const getProductImage = (categoryId) => {
    const match = products.find((p) => p.category?.id === categoryId);
    const raw = match?.images?.[0] || match?.category?.image || null;
    return raw ? cleanImage(raw) : null;
  };

  return (
    <>
      <style>{styles}</style>

      <section className="bg-[#2a2a2a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header bar */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[74px] font-semibold text-white uppercase tracking-tight">
              CATEGORIES
            </h2>
            <div className="flex gap-2 sm:gap-3">
              {/* Prev — dark grey */}
              <button
                onClick={goPrev}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {/* Next — lighter grey */}
              <button
                onClick={goNext}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-500 hover:bg-gray-400 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Error */}
          {catError && !loading && (
            <div className="text-red-500 text-center py-10 font-body text-sm">{catError}</div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : visibleCats.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10 font-body">
                No categories found.
              </div>
            ) : (
              visibleCats.map((cat) => {
                const imgSrc = getProductImage(cat.id) || cleanImage(cat.image);
                return (
                  <div
                    key={cat.id}
                    className="relative group cursor-pointer"
                    onClick={() => navigate(`/?category=${cat.id}`)}
                  >
                    {/* Card Container with rounded corners */}
                    <div className="bg-[#e8e8e8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] relative transition-transform duration-300 hover:scale-[1.02]">
                      {/* Image area */}
                      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                        <img
                          src={imgSrc}
                          alt={cat.name}
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 rounded-2xl sm:rounded-3xl"
                          onError={e => { 
                            e.target.src = cleanImage(cat.image) || "https://placehold.co/400x280?text=Shoes"; 
                          }}
                        />
                      </div>

                      {/* Bottom row: name + arrow */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 lg:p-8 flex justify-between items-end">
                        <h3 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 uppercase leading-tight max-w-[65%]">
                          {cat.name}
                        </h3>
                        {/* Black arrow button */}
                        <button
                          onClick={e => { 
                            e.stopPropagation(); 
                            navigate(`/?category=${cat.id}`); 
                          }}
                          className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-900 hover:bg-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                          aria-label={`View ${cat.name}`}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </section>
    </>
  );
}
