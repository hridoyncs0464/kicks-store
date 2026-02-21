// Place this file at: src/components/context/ProductsContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { API_ENDPOINTS } from "../../config/api";

// ── REDUCER ────────────────────────────────────────────────
const initialState = {
  products:          [],
  categories:        [],
  productsLoading:   true,
  categoriesLoading: true,
  productsError:     null,
  categoriesError:   null,
};

function reducer(state, action) {
  switch (action.type) {
    case "PRODUCTS_SUCCESS":
      return { ...state, products: action.payload, productsLoading: false, productsError: null };
    case "PRODUCTS_ERROR":
      return { ...state, productsLoading: false, productsError: action.payload };
    case "CATEGORIES_SUCCESS":
      return { ...state, categories: action.payload, categoriesLoading: false, categoriesError: null };
    case "CATEGORIES_ERROR":
      return { ...state, categoriesLoading: false, categoriesError: action.payload };
    default:
      return state;
  }
}

// ── CONTEXT ────────────────────────────────────────────────
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch products
  useEffect(() => {
    let cancelled = false;
    fetch(API_ENDPOINTS.products)
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data) => { if (!cancelled) dispatch({ type: "PRODUCTS_SUCCESS", payload: data }); })
      .catch(() => { if (!cancelled) dispatch({ type: "PRODUCTS_ERROR", payload: "Failed to load products." }); });
    return () => { cancelled = true; };
  }, []);

  // Fetch categories
  useEffect(() => {
    let cancelled = false;
    fetch(API_ENDPOINTS.categories)
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data) => { if (!cancelled) dispatch({ type: "CATEGORIES_SUCCESS", payload: data }); })
      .catch(() => { if (!cancelled) dispatch({ type: "CATEGORIES_ERROR", payload: "Failed to load categories." }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
}

// ── HOOKS ──────────────────────────────────────────────────
export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return { products: ctx.products, loading: ctx.productsLoading, error: ctx.productsError };
}

export function useCategories() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useCategories must be used inside ProductsProvider");
  return { categories: ctx.categories, loading: ctx.categoriesLoading, error: ctx.categoriesError };
}