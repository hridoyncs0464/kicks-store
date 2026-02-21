import React from "react";

const ErrorState = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      
      {/* Animated Warning Icon */}
      <div className="text-6xl mb-6 animate-pulse">⚠️</div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
        Oops! An Error Occurred
      </h2>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;