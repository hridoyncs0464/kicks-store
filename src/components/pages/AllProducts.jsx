import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../config/api';
import ShoeCard from '../products/ShoeCard';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products from ID 35 to 44 (10 products)
        const promises = [];
        for (let id = 35; id <= 44; id++) {
          promises.push(
            fetch(API_ENDPOINTS.productById(id))
              .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
                return res.json();
              })
              .catch(err => {
                console.warn(`Product ${id} not found:`, err);
                return null; // Return null for failed requests
              })
          );
        }
        
        const results = await Promise.all(promises);
        
        // Filter out null values (failed requests)
        const validProducts = results.filter(product => product !== null);
        
        if (!cancelled) {
          setProducts(validProducts);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load products');
          console.error('Error fetching products:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAllProducts();
    
    return () => {
      cancelled = true;
    };
  }, []);

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
    <section className="bg-[#f5f5f5] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase leading-tight mb-2">
            ALL SHOES
          </h1>
          <p className="font-body text-gray-600 text-sm sm:text-base">
            Browse our complete collection of premium footwear
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 font-body">
            {error}
          </div>
        )}

        {/* Products Count */}
        {!loading && products.length > 0 && (
          <div className="mb-6">
            <p className="font-body text-gray-600 text-sm">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {loading ? (
            <>
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-8 bg-white rounded-2xl shadow-sm">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="font-body text-gray-600">Check back later for new arrivals</p>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <ShoeCard 
                key={product.id} 
                product={product} 
                showNewBadge={false}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
