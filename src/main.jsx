import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './components/pages/Home.jsx';
import ProductDetails from './components/pages/ProductDetails.jsx';
import Cart from './components/pages/Cart.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout wrapper
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
