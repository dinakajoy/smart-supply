import React from "react";
import { useNavigate } from "react-router-dom";

const FatalErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        We encountered an unexpected error. Please try again later.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer py-2 px-4 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Reload Page
        </button>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer py-2 px-4 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default FatalErrorPage;
