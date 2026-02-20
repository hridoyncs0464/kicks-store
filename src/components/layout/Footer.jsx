import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Newsletter Section */}
      <div className="bg-blue-600 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left Side - Newsletter */}
            <div className="flex-1 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-heading">
                JOIN OUR KICKSPLUS
                <br />
                CLUB & GET 15% OFF
              </h2>
              <p className="text-blue-100 mb-6 font-body">
                Sign up for free! Join the community.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-blue-500 border border-blue-400 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  SUBMIT
                </button>
              </form>
            </div>

            {/* Right Side - Logo */}
            <div className="relative">
              <h3 className="text-6xl md:text-7xl font-black tracking-wider font-heading">
                KICKS
              </h3>
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* About Us */}
            <div>
              <h3 className="text-orange-500 text-xl font-bold mb-4 font-heading">About us</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-body">
                We are the biggest hyperstore in the universe.
                We got you all cover with our exclusive
                collections and latest drops.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-orange-500 text-xl font-bold mb-4 font-heading">Categories</h3>
              <ul className="space-y-2 font-body">
                <li>
                  <NavLink to="/category/runners" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Runners
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/sneakers" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Sneakers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/basketball" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Basketball
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/outdoor" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Outdoor
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/golf" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Golf
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category/hiking" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Hiking
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-orange-500 text-xl font-bold mb-4 font-heading">Company</h3>
              <ul className="space-y-2 font-body">
                <li>
                  <NavLink to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blogs" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Blogs
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-orange-500 text-xl font-bold mb-4 font-heading">Follow us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Large KICKS Text */}
          <div className="relative overflow-hidden mb-8">
            <h2 className="text-[120px] md:text-[200px] font-black text-white opacity-10 leading-none font-heading">
              KICKS
            </h2>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-6 font-body">
            © All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
