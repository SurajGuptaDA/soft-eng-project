'use client';

import Image from 'next/image';

export default function TrackOrder() {
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center p-8 gap-10">
        {/* Illustration */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/1a57b97a-acb4-4417-a34f-041e16296d59.png"
            alt="Track order illustration"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Tracking Info */}
        <div className="w-full lg:w-1/2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">
            Track Your Order <span className="text-black">(Order #12345)</span>
          </h2>

          <div className="border border-blue-700 rounded-lg p-4 text-sm sm:text-base">
            <div className="grid grid-cols-3 font-semibold border-b border-dashed pb-2 mb-2">
              <span>Status Step</span>
              <span>Status</span>
              <span>Time</span>
            </div>

            <div className="grid grid-cols-3 py-1">
              <span>Order Confirmed</span>
              <span className="text-green-600">✅ Completed</span>
              <span>10:45 AM</span>
            </div>
            <div className="grid grid-cols-3 py-1">
              <span>Pharmacy Accepted</span>
              <span className="text-green-600">✅ Completed</span>
              <span>11:00 AM</span>
            </div>
            <div className="grid grid-cols-3 py-1">
              <span>Out for Delivery</span>
              <span className="text-gray-600">🕓 In Progress</span>
              <span>—</span>
            </div>
            <div className="grid grid-cols-3 py-1">
              <span>Delivered</span>
              <span className="text-red-600">❌ Pending</span>
              <span>—</span>
            </div>
          </div>

          {/* Map & Contact Info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              🌐 <span className="font-medium">Delivery Location:</span> [Google Map Widget / Placeholder]
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xl">📞</span>
              <span>Need help? [<a href="#" className="underline">📞 Call Pharmacy</a>] [<a href="#" className="underline">💬 Chat Support</a>]</span>
            </div>
          </div>

          <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded">
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
