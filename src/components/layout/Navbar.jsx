import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Trigger pulse animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => {
        setCartPulse(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile - Left: Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop - Left Section: Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* New Drops */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm font-medium transition-colors ${
                  isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              New Drops 🔥
            </NavLink>

            {/* Men Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMenOpen(!isMenOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
              >
                Men
                <svg
                  className={`w-4 h-4 transition-transform ${isMenOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMenOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <NavLink to="/men/shoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Shoes
                  </NavLink>
                  <NavLink to="/men/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Clothing
                  </NavLink>
                  <NavLink to="/men/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Accessories
                  </NavLink>
                </div>
              )}
            </div>

            {/* Women Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsWomenOpen(!isWomenOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
              >
                Women
                <svg
                  className={`w-4 h-4 transition-transform ${isWomenOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isWomenOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <NavLink to="/women/shoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Shoes
                  </NavLink>
                  <NavLink to="/women/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Clothing
                  </NavLink>
                  <NavLink to="/women/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Accessories
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Center - Logo (both mobile and desktop) */}
          <NavLink to="/" className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-black tracking-wider font-heading">
            KICKS
          </NavLink>

          {/* Mobile - Right: User Icon + Cart Badge */}
          <div className="md:hidden flex items-center space-x-2">
            {/* User Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Cart Badge */}
            <NavLink to="/cart" className="relative">
              <div className={`bg-orange-500 text-white text-sm font-bold rounded-full h-10 w-10 flex items-center justify-center ${cartPulse ? 'animate-pulse-once' : ''}`}>
                {cartCount}
              </div>
            </NavLink>
          </div>

          {/* Desktop - Right Section: Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Cart Icon with Badge */}
            <NavLink to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              New Drops 🔥
            </NavLink>
            
            <div>
              <button
                onClick={() => setIsMenOpen(!isMenOpen)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
              >
                Men
                <svg className={`w-4 h-4 transition-transform ${isMenOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMenOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <NavLink 
                    to="/men/shoes" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-gray-600"
                  >
                    Shoes
                  </NavLink>
                  <NavLink 
                    to="/men/clothing" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-gray-600"
                  >
                    Clothing
                  </NavLink>
                  <NavLink 
                    to="/men/accessories" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-gray-600"
                  >
                    Accessories
                  </NavLink>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsWomenOpen(!isWomenOpen)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
              >
                Women
                <svg className={`w-4 h-4 transition-transform ${isWomenOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isWomenOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <NavLink 
                    to="/women/shoes" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-gray-600"
                  >
                    Shoes
                  </NavLink>
                  <NavLink 
                    to="/women/clothing" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-gray-600"
                  >
                    Clothing
                  </NavLink>
                  <NavLink 
                    to="/women/accessories" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-gray-600"
                  >
                    Accessories
                  </NavLink>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
