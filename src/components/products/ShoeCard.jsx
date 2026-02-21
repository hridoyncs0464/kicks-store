import { useNavigate } from 'react-router-dom';

const ShoeCard = ({ product, showNewBadge = false }) => {
  const navigate = useNavigate();

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

  const handleViewProduct = (e) => {
    if (e) e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const imageUrl = cleanImage(product.images?.[0] || product.category?.image);

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={handleViewProduct}
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 h-[250px] sm:h-[280px] md:h-[320px] overflow-hidden">
        {/* New Badge - Only show if showNewBadge is true */}
        {showNewBadge && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-br-2xl uppercase">
              New
            </div>
          </div>
        )}
        
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
          onClick={handleViewProduct}
          className="w-full bg-[#232321] hover:bg-gray-900 text-white font-body font-semibold py-3.5 rounded-xl transition-colors uppercase text-sm"
        >
          VIEW PRODUCT - <span className="text-orange-500">${product.price}</span>
        </button>
      </div>
    </div>
  );
};

export default ShoeCard;
