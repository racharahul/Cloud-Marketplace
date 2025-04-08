import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Cloud Marketplace</h1>
      <p className="text-lg text-gray-600 mb-6">
        Choose your role to get started
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <span className="px-3 py-1 bg-black text-white text-xs rounded-full">
            SELLER
          </span>
          <h2 className="text-2xl font-semibold mt-4">For Sellers</h2>
          <p className="text-gray-600 mt-2">
            List your products and reach buyers globally.
          </p>
          <Link
            to="/signup?role=seller"
            className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-lg"
          >
            Sign Up
          </Link>
          <Link to="/login?role=seller" className="mt-2 block text-blue-500">
            Already have an account? Login
          </Link>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <span className="px-3 py-1 bg-gray-200 text-black text-xs rounded-full">
            BUYER
          </span>
          <h2 className="text-2xl font-semibold mt-4">For Buyers</h2>
          <p className="text-gray-600 mt-2">
            Find and purchase products from trusted sellers.
          </p>
          <Link
            to="/signup?role=buyer"
            className="mt-4 inline-block px-6 py-2 bg-gray-800 text-white rounded-lg"
          >
            Sign Up
          </Link>
          <Link to="/login?role=buyer" className="mt-2 block text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
