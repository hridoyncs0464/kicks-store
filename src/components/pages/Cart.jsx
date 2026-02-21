import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_ENDPOINTS } from '../../config/api';
import RecommendedProducts from '../shared/RecommendedProducts';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const promises = [];
      for (let id = 35; id <= 38; id++) {
        promises.push(
          fetch(API_ENDPOINTS.productById(id))
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
        );
      }
      const results = await Promise.all(promises);
      setRecommendations(results.filter(r => r !== null));
    } catch (err) {
      console.error('Error fetching recommendations:', err);
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

  const subtotal = getCartTotal();
  const delivery = 6.99;
  const salesTax = 0;
  const total = subtotal + delivery + salesTax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        {/* Banner */}
        <div className="bg-gray-200 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Your bag is empty
            </h2>
            <p className="font-body text-sm text-gray-600">
              Add some items to get started!
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h3>
            <p className="font-body text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-body font-semibold px-8 py-3 rounded-lg transition-colors uppercase"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <RecommendedProducts products={recommendations} title="You may also like" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Banner */}
      <div className="bg-gray-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Saving to celebrate
          </h2>
          <p className="font-body text-sm text-gray-600">
            Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.
          </p>
          <p className="font-body text-sm text-gray-600 mt-1">
            <button className="underline hover:no-underline">Join us</button> or <button className="underline hover:no-underline">Sign-in</button>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-6">
          
          {/* Cart Items - Full width on mobile, left side on desktop */}
          <div className="w-full">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Bag</h3>
              <p className="font-body text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                Items in your bag not reserved- check out now to make them yours.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item, index) => {
                  const imageUrl = cleanImage(item.images?.[0] || item.category?.image);
                  
                  return (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      className="flex flex-col sm:flex-row gap-4 pb-4 sm:pb-6 border-b border-gray-200 last:border-0 animate-fadeIn"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-full h-full object-contain p-4 sm:p-3"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/200x200?text=Product';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-heading text-sm sm:text-base font-bold text-gray-900 uppercase mb-1">
                                {item.title}
                              </h4>
                              <p className="font-body text-xs sm:text-sm text-gray-600 mb-1">
                                {item.category?.name || 'Shoes'}
                              </p>
                              <p className="font-body text-xs sm:text-sm text-gray-600">
                                {item.selectedColor}
                              </p>
                            </div>
                          </div>

                          {/* Size and Quantity - Mobile Friendly */}
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="font-body text-gray-600">Size {item.selectedSize}</span>
                            <span className="font-body text-gray-600">Quantity {item.quantity}</span>
                          </div>

                          {/* Price */}
                          <p className="font-heading text-lg sm:text-xl font-bold text-blue-600">
                            ${item.price}.00
                          </p>

                          {/* Actions */}
                          <div className="flex items-center gap-4 mt-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                            >
                              <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary - Full width on mobile, sticky on desktop */}
          <div className="w-full">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-600">{cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''}</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-gray-900">${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-gray-600">Sales Tax</span>
                  <span className="font-semibold text-gray-900">-</span>
                </div>
              </div>

              <div className="flex justify-between font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-[#232321] hover:bg-gray-900 text-white font-body font-semibold py-3 sm:py-4 rounded-xl transition-all hover:scale-[1.02] uppercase text-sm mb-3 sm:mb-4">
                Checkout
              </button>

              <button
                onClick={() => setPromoCode(promoCode ? '' : 'show')}
                className="w-full font-body text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Use a promo code
              </button>

              {promoCode && (
                <div className="mt-4 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <RecommendedProducts products={recommendations} title="You may also like" />
    </div>
  );
};

export default Cart;
