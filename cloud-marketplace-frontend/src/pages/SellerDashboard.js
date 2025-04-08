// src/pages/SellerDashboard.jsx
import React from "react";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Seller</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-semibold">Add Product</h2>
          <p className="text-gray-500 mt-2">Add new items to your store</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-semibold">My Products</h2>
          <p className="text-gray-500 mt-2">Manage your existing products</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-gray-500 mt-2">Check recent buyer orders</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
