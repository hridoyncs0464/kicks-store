import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import { useCart } from '../context/CartContext';
import ShoeCard from '../products/ShoeCard';
import RecommendedProducts from '../shared/RecommendedProducts';
import Toast from '../shared/Toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('38');
  const [selectedColor, setSelectedColor] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Mock data for missing fields
  const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47'];
  const colors = [
    { name: 'Shadow Navy', color: '#2c3e50' },
    { name: 'Army Green', color: '#7d8471' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(API_ENDPOINTS.productById(id));
      if (!response.ok) throw new Error('Product not found');
      const data = await response.json();
      setProduct(data);

      const recPromises = [];
      for (let recId = 35; recId <= 38; recId++) {
        if (recId !== parseInt(id)) {
          recPromises.push(
            fetch(API_ENDPOINTS.productById(recId))
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
          );
        }
      }
      const recResults = await Promise.all(recPromises);
      setRecommendations(recResults.filter(r => r !== null).slice(0, 4));
      
      setError(null);
    } catch (err) {
      setError('Failed to load product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cleanImage = (raw) => {
    try {
      if (typeof raw === 'string' && raw.startsWith('[')) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed[0] : raw;
      }
    } catch (_) {}
    return raw;
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        selectedSize,
        selectedColor: colors[selectedColor].name
      });
      setShowToast(true);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-[280px] rounded-3xl"></div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-body px-6 py-3 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images?.map(img => cleanImage(img)) || [];
  
  // Ensure we always have 4 images for the grid
  const displayImages = [...images];
  while (displayImages.length < 4) {
    displayImages.push(images[0] || cleanImage(product.category?.image) || 'https://placehold.co/600x600?text=Product');
  }
  const gridImages = displayImages.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Product added to cart successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Product Details Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Left: Images - Mobile: Main + Thumbnails, Desktop: 2x2 Grid */}
            <div>
              {/* Mobile Layout: Main Image + Dots + Thumbnails */}
              <div className="lg:hidden space-y-4">
                {/* Main Image */}
                <div className="bg-white rounded-3xl overflow-hidden p-6">
                  <img
                    src={gridImages[selectedImage]}
                    alt={product.title}
                    className="w-full h-[280px] object-contain"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x600?text=Product';
                    }}
                  />
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2">
                  {gridImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`transition-all rounded-full ${
                        selectedImage === index
                          ? 'w-8 h-2 bg-blue-600'
                          : 'w-2 h-2 bg-gray-300'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {gridImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-white rounded-2xl overflow-hidden p-3 transition-all ${
                        selectedImage === index
                          ? 'ring-2 ring-blue-600'
                          : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-16 object-contain"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x600?text=Product';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Layout: 2x2 Grid */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {gridImages.map((img, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl overflow-hidden p-4 sm:p-6 hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] object-contain"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x600?text=Product';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-4">
              {/* New Release Badge */}
              <div>
                <span className="inline-block bg-blue-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full uppercase">
                  New Release
                </span>
              </div>

              {/* Title - 32px */}
              <h1 className="font-heading text-[28px] sm:text-[32px] font-bold text-[#232321] uppercase leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                ${product.price}.00
              </div>

              {/* Color Selection */}
              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-gray-900 uppercase">Color</h3>
                </div>
                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${
                        selectedColor === index
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-gray-900 uppercase">Size</h3>
                  <button className="font-body text-xs text-gray-600 hover:text-gray-900 uppercase font-semibold">
                    Size Chart
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 sm:py-3 rounded-lg font-body font-semibold text-xs sm:text-sm transition-all ${
                        selectedSize === size
                          ? 'bg-[#232321] text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#232321] hover:bg-gray-900 text-white font-body font-semibold py-3.5 sm:py-4 rounded-xl transition-colors uppercase text-xs sm:text-sm"
                >
                  Add to Cart
                </button>
                <button className="w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors border border-gray-200">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-body font-semibold py-3.5 sm:py-4 rounded-xl transition-colors uppercase text-xs sm:text-sm"
              >
                Buy It Now
              </button>

              {/* About the Product - Minimal */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-heading text-sm font-bold text-[#232321] uppercase mb-2">
                  About the Product
                </h3>
                <p className="font-body text-xs text-gray-600 mb-3">
                  {colors[selectedColor].name}
                </p>
                <p className="font-body text-xs text-gray-600 leading-relaxed mb-3">
                  This product is excluded from all promotional discounts and offers.
                </p>
                <ul className="space-y-1.5 font-body text-xs text-gray-600">
                  <li>• Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
                  <li>• Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <RecommendedProducts products={recommendations} />
    </div>
  );
};

export default ProductDetails;
