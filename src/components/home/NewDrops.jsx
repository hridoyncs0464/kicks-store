import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

const NewDrops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    
    const fetchNewDrops = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.newDrops);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load new drops');
          console.error('Error fetching new drops:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNewDrops();
    
    return () => {
      cancelled = true;
    };
  }, []);

  // Clean image URLs (Platzi API sometimes returns JSON strings)
  const cleanImage = (raw) => {
    try {
      if (typeof raw === 'string' && raw.startsWith('[')) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed[0] : raw;
      }
    } catch (_) {}
    return raw;
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-[250px] sm:h-[280px] md:h-[320px]"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase leading-tight">
              DON'T MISS OUT
              <br />
              NEW DROPS
            </h2>
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors uppercase text-sm"
          >
            SHOP NEW DROPS
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center py-10 font-body">{error}</div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            products.map((product) => {
              const imageUrl = cleanImage(product.images?.[0] || product.category?.image);
              
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  onClick={() => handleViewProduct(product.id)}
                >
                  {/* Image Container */}
                  <div className="relative bg-gray-100 h-[250px] sm:h-[280px] md:h-[320px] overflow-hidden">
                    {/* New Badge - Rounded shape on top left */}
                    <div className="absolute top-0 left-0 z-10">
                      <div className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-br-2xl uppercase">
                        New
                      </div>
                    </div>
                    
                    {/* Product Image */}
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/400x400?text=Product';
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-4">
                    {/* Product Title */}
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#232321] uppercase leading-tight min-h-[3rem]">
                      {product.title}
                    </h3>
                    
                    {/* View Product Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProduct(product.id);
                      }}
                      className="w-full bg-[#232321] hover:bg-gray-900 text-white font-body font-semibold py-3.5 rounded-xl transition-colors uppercase text-sm"
                    >
                      VIEW PRODUCT - <span className="text-orange-500">${product.price}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default NewDrops;
