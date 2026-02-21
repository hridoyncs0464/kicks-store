import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/pages/Home.jsx";
import ProductDetails from "./components/pages/ProductDetails.jsx";
import Cart from "./components/pages/Cart.jsx";
import AllReviews from "./components/pages/AllReviews.jsx";
import AllProducts from "./components/pages/AllProducts.jsx";
import { ProductsProvider } from "./components/context/ProductsContext.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout wrapper
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "reviews",
        element: <AllReviews />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </CartProvider>
  </StrictMode>,
);
