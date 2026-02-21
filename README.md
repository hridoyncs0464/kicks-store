# KICKS Store - Modern E-Commerce Platform

A fully responsive, modern e-commerce web application for sneakers and footwear, built with React, Tailwind CSS, and React Router. Features a sleek design, smooth animations, and complete shopping cart functionality with localStorage persistence.

**Live Demo**:[kicks-start](https://kicks-store-nine.vercel.app)

![KICKS Store](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-38bdf8) ![React Router](https://img.shields.io/badge/React_Router-7.13.0-red)

## 🌟 Features

### Core Functionality

- **Product Browsing**: Browse through a curated collection of premium sneakers
- **Product Details**: Detailed product pages with image galleries, size selection, and color options
- **Shopping Cart**: Full cart functionality with add/remove items, quantity management, and localStorage persistence
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Meaningful animations and transitions throughout the app
- **Toast Notifications**: Visual feedback when adding items to cart
- **Category Filtering**: Browse products by categories
  -- Fetch product categories dynamically from Platzi Fake Store API

### Pages & Sections

1. **Home Page**
   - Auto-playing hero slider with product showcase
   - "Don't Miss Out New Drops" section
   - Categories section with navigation
   - Customer reviews section

2. **Product Details Page**
   - Image gallery with thumbnails (2x2 grid on desktop, carousel on mobile)
   - Size and color selection
   - Add to cart functionality
   - Product recommendations

3. **All Products Page**
   - Grid view of all available products
   - Responsive layout (4 columns on desktop, 1 on mobile)

4. **Shopping Cart Page**
   - View all cart items
   - Update quantities
   - Remove items
   - Order summary with pricing breakdown
   - Promo code input
   - Product recommendations

### UI/UX Highlights

- **Typography**: Rubik font for headings, Open Sans for body text
- **Color Scheme**: Professional color palette with blue accents
- **Animations**: Fade-in, slide-in, and pulse animations
- **Cart Badge**: Animated badge showing cart item count
- **Toast Notifications**: Success messages for cart actions
- **Sticky Navigation**: Fixed navbar with cart indicator
- **Smooth Transitions**: All interactive elements have smooth hover effects

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - UI library
- **React Router 7.13.0** - Client-side routing
- **Tailwind CSS 4.2.0** - Utility-first CSS framework
- **Vite 7.3.1** - Build tool and dev server

### State Management

- **React Context API** - Global state management for cart and products
- **localStorage** - Cart persistence across sessions

### API Integration

- **Axios 1.13.5** - HTTP client
- **Platzi Fake Store API** - Product data (temporary, ready for backend swap)
- Products fetched dynamically from Platzi Fake Store API
- Product details fetched using dynamic routing
- Product categories fetched dynamically for category filtering
- Implemented loading, error, and empty states for all API calls

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Project Structure

```
kicks-store/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── context/
│   │   │   ├── CartContext.jsx          # Cart state management
│   │   │   └── ProductsContext.jsx      # Products state management
│   │   ├── home/
│   │   │   ├── Categories.jsx           # Categories section
│   │   │   ├── HeroSlidder.jsx          # Hero slider component
│   │   │   ├── NewDrops.jsx             # New products section
│   │   │   └── Reviews.jsx              # Customer reviews
│   │   ├── layout/
│   │   │   ├── Footer.jsx               # Footer with newsletter
│   │   │   └── Navbar.jsx               # Navigation bar
│   │   ├── pages/
│   │   │   ├── AllProducts.jsx          # All products page
│   │   │   ├── Cart.jsx                 # Shopping cart page
│   │   │   ├── Home.jsx                 # Home page
│   │   │   └── ProductDetails.jsx       # Product details page
│   │   ├── products/
│   │   │   ├── ProductCard.jsx          # Product card component
│   │   │   ├── ProductGrid.jsx          # Product grid layout
│   │   │   └── ShoeCard.jsx             # Reusable shoe card
│   │   └── shared/
│   │       ├── EmptyState.jsx           # Empty state component
│   │       ├── ErrorState.jsx           # Error state component
│   │       ├── Loader.jsx               # Loading spinner
│   │       ├── RecommendedProducts.jsx  # Product recommendations
│   │       └── Toast.jsx                # Toast notification
│   ├── config/
│   │   └── api.js                       # API configuration
│   ├── data/
│   │   └── sliderData.json              # Hero slider data
│   ├── App.css
│   ├── App.jsx                          # Main app component
│   ├── index.css                        # Global styles
│   └── main.jsx                         # App entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hridoyncs0464/kicks-store
   cd kicks-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to https://kicks-store-nine.vercel.app/
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🔧 Configuration

### API Configuration

The API endpoints are centralized in `src/config/api.js`. To switch from the fake API to your backend:

```javascript
// src/config/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "https://your-backend-api.com";

export const API_ENDPOINTS = {
  products: `${BASE_URL}/api/products`,
  categories: `${BASE_URL}/api/categories`,
  productById: (id) => `${BASE_URL}/api/products/${id}`,
  newDrops: `${BASE_URL}/api/products/new-drops`,
};
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-backend-api.com
```

## Design System

### Colors

- **Primary**: Blue (#3B82F6)
- **Secondary**: Orange (#F97316)
- **Dark**: #232321
- **Background**: #F5F5F5

### Typography

- **Headings**: Rubik (Google Fonts)
- **Body**: Open Sans (Google Fonts)

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Responsive Design

The application is fully responsive with optimized layouts for:

- **Mobile**: Single column layouts, hamburger menu, touch-friendly buttons
- **Tablet**: 2-column grids, adapted spacing
- **Desktop**: Multi-column layouts, hover effects, sticky elements

## 🔄 State Management

### Cart Context

- Add items to cart
- Remove items from cart
- Update quantities
- Calculate totals
- Persist to localStorage

### Products Context

- Fetch products from API
- Fetch categories
- Loading and error states

## 🎯 Key Features Implementation

### Shopping Cart with localStorage

```javascript
// Cart persists across browser sessions
// Automatically saves on every change
// Loads on app startup
```

### Toast Notifications

```javascript
// Success messages when adding to cart
// Auto-dismiss after 3 seconds
// Smooth slide-in animation
```

### Animated Cart Badge

```javascript
// Pulses when items are added
// Shows total quantity
// Visible on all pages
```

## 🚧 Future Enhancements

- [ ] User authentication and profiles
- [ ] Wishlist functionality
- [ ] Product search and filters
- [ ] Order history
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Real-time inventory updates
- [ ] Email notifications
- [ ] Admin dashboard

## 📝 Notes

### Current API

The project currently uses the Platzi Fake Store API for demonstration purposes. Product IDs 35-44 are used for shoe products.

### Backend Integration

The codebase is structured to easily integrate with a real backend:

1. Update `src/config/api.js` with your API endpoints
2. Adjust data models if needed
3. Add authentication tokens to API calls
4. No other changes required!

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance

- Lazy loading for images
- Code splitting with React Router
- Optimized bundle size
- Fast page transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

MD.RASHEDUL ISLAM HRIDOY

- GitHub: [@hridoyncs0464](https://github.com/hridoyncs0464)
- LinkedIn: [MD.RASHEDUL ISLAM HRIDOY](https://www.linkedin.com/in/rashedul-islam-hridoy/)

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from Heroicons
- Fonts from Google Fonts
- Product images from Unsplash and Platzi API

---

**Made with ❤️ using React and Tailwind CSS**
