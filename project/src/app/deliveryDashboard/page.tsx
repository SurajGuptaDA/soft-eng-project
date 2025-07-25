'use client';

import Image from 'next/image';

export default function DeliveriesPage() {
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
      <div className="p-8 max-w-5xl mx-auto">
        {/* Deliveries Table */}
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
          📦 My Deliveries
        </h2>

        <div className="overflow-x-auto border rounded-md text-sm">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Order ID</th>
                <th className="border px-4 py-2 text-left">Customer Name</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">#054321</td>
                <td className="border px-4 py-2">Mr. Sharma</td>
                <td className="border px-4 py-2">Saket, Delhi</td>
                <td className="border px-4 py-2">Assigned</td>
                <td className="border px-4 py-2 space-x-2">
                  📍 <button className="text-blue-700 underline">View Map</button>
                  ✅ <button className="text-green-700 underline">Mark Delivered</button>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#054322</td>
                <td className="border px-4 py-2">Ms. Rani</td>
                <td className="border px-4 py-2">Connaught Place</td>
                <td className="border px-4 py-2">Out for Delivery</td>
                <td className="border px-4 py-2 space-x-2">
                  📍 <button className="text-blue-700 underline">View Map</button>
                  ✅ <button className="text-green-700 underline">Mark Delivered</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Route Map Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
            🌍 Route Map (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            [ Embedded Google Map or placeholder route layout ]
          </p>
          <Image
            src="/a11f6c09-522a-4be2-9cfd-a6c504e60f50.png"
            alt="Map Placeholder"
            width={400}
            height={200}
            className="rounded shadow"
          />
        </div>

        {/* Delivery Confirmation */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            ✅ Delivery Confirmation
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              ✅ <span>Take photo or signature</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Submit proof</button>
              <button className="text-gray-600 underline">Cancel</button>
            </div>
          </div>
        </div>

        <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded">
          BACK
        </button>
      </div>
    </div>
  );
}
