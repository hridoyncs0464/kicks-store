import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({
  title = "Nothing Here Yet 👟",
  description = "Looks like you haven’t added anything to your cart.",
  buttonText = "Browse Products",
  buttonLink = "/products",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fade-in">
      
      {/* Icon */}
      <div className="text-6xl mb-6 animate-bounce">🛒</div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-500 max-w-md mb-6">
        {description}
      </p>

      {/* Button */}
      <Link
        to={buttonLink}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;