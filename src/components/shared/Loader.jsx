import React from "react";

const Loader = ({ message = "Loading sneakers..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      
      {/* Animated Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
        {message}
      </p>

    </div>
  );
};

export default Loader;