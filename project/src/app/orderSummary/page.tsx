'use client';

import Image from 'next/image';

export default function OrderSummary() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-bold">Sandpiper Crossing</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Orders</a>
          <a href="#" className="hover:underline">Upload Rx</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm font-semibold">
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center p-8 gap-10">
        {/* Illustration */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/98871096-5eab-49c5-b1f7-dc8f1d610731.png"
            alt="Order illustration"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            <span>🧾</span> Order Summary
          </h2>
          <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
            <li>• Pharmacy: 🏬 NetMeds</li>
            <li>• Prescription: Paracetamol, Metformin</li>
            <li>• Total Cost: ₹115</li>
            <li>• Delivery ETA: 1 Day</li>
            <li>• Delivery Address: [Edit] 📍 221B Saket, Delhi</li>
            <li>• Contact: +91-XXXXXX1234</li>
          </ul>

          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              ✅ Confirm Order
            </div>
            <div className="flex items-center gap-2 text-red-600 font-medium">
              ❌ Cancel / Go Back
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-4">ⓘ You will be notified once the pharmacy confirms your order.</p>

          <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded">
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
