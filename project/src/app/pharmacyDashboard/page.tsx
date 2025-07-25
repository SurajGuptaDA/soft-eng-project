'use client';

export default function PrescriptionsPage() {
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

      <div className="p-8 max-w-5xl mx-auto">
        {/* Incoming Prescriptions */}
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          🗎 Incoming Prescriptions
        </h2>

        <div className="overflow-x-auto border rounded-md text-sm mb-10">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Prescription ID</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Uploaded File</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">#P12345</td>
                <td className="border px-4 py-2">Mr. Sharma</td>
                <td className="border px-4 py-2 text-blue-600 underline">View PDF</td>
                <td className="border px-4 py-2">27 May</td>
                <td className="border px-4 py-2 space-x-2">
                  ✅ <button className="text-green-700 underline">Respond</button>
                  ❌ <button className="text-red-600 underline">Skip</button>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#P12346</td>
                <td className="border px-4 py-2">Ms. Rani</td>
                <td className="border px-4 py-2 text-blue-600 underline">View PDF</td>
                <td className="border px-4 py-2">27 May</td>
                <td className="border px-4 py-2 space-x-2">
                  ✅ <button className="text-green-700 underline">Respond</button>
                  ❌ <button className="text-red-600 underline">Skip</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Respond Section */}
        <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
          📦 Respond to Prescription
        </h3>
        <div className="text-sm text-gray-700 mb-4">
          <div>[Prescription Details Panel]</div>
          <ul className="list-disc list-inside">
            <li>Paracetamol 500mg – Available</li>
            <li>Metformin – Out of Stock</li>
          </ul>
          <div className="mt-2">💰 <strong>Total Price:</strong> ₹115</div>
          <div>🚚 <strong>Estimated Delivery:</strong> 1 Day</div>
          <div className="mt-2 text-green-700">✅ Confirm and Send to Customer</div>
        </div>

        {/* Inventory Section */}
        <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
          📓 Inventory Section
        </h3>

        <div className="overflow-x-auto border rounded-md text-sm">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Medicine Name</th>
                <th className="border px-4 py-2">In Stock</th>
                <th className="border px-4 py-2">Price/Unit</th>
                <th className="border px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Paracetamol</td>
                <td className="border px-4 py-2">120</td>
                <td className="border px-4 py-2">₹5</td>
                <td className="border px-4 py-2 text-yellow-600 text-lg">✏️</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Metformin</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">₹7</td>
                <td className="border px-4 py-2 text-yellow-600 text-lg">✏️</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded">
          BACK
        </button>
      </div>
    </div>
  );
}
