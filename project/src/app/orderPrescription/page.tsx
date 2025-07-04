export default function ComparePharmaciesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <ul className="flex gap-6 text-sm font-semibold">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Upload Rx</a></li>
          <li><a href="#">Help</a></li>
        </ul>
        <button className="bg-green-500 px-4 py-1 text-white text-sm rounded-full">Logout</button>
      </nav>

      {/* Page Content */}
      <div className="px-6 py-10 space-y-10">
        {/* Prescription Summary */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            📄 Prescription Summary
          </h2>
          <p className="text-sm text-gray-800">
            🧾 <strong>Prescription ID: #12345</strong><br />
            • Paracetamol 500mg – 10 tablets<br />
            • Metformin – 20 tablets<br />
            <span className="text-blue-600 cursor-pointer underline">[ View Full Prescription PDF ]</span>
          </p>
        </div>

        {/* Compare Pharmacies */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🏥 Compare Pharmacies</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Pharmacy Name</th>
                  <th className="p-2 border">Availability</th>
                  <th className="p-2 border">Total Price</th>
                  <th className="p-2 border">Delivery ETA</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">MedPlus</td>
                  <td className="p-2 border">✅ In Stock</td>
                  <td className="p-2 border">₹120</td>
                  <td className="p-2 border">2–3 Days</td>
                  <td className="p-2 border">
                    🛒 <button className="underline text-blue-600">Select</button>{" "}
                    📞 <button className="underline text-blue-600">Call</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">Apollo</td>
                  <td className="p-2 border">❌ Not Avail</td>
                  <td className="p-2 border">–</td>
                  <td className="p-2 border">–</td>
                  <td className="p-2 border">
                    🔔 <button className="underline text-blue-600">Notify Me</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">NetMeds</td>
                  <td className="p-2 border">✅ In Stock</td>
                  <td className="p-2 border">₹115</td>
                  <td className="p-2 border">1 Day</td>
                  <td className="p-2 border">
                    🛒 <button className="underline text-blue-600">Select</button>{" "}
                    📞 <button className="underline text-blue-600">Call</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border">City Pharmacy</td>
                  <td className="p-2 border">✅ In Stock</td>
                  <td className="p-2 border">₹140</td>
                  <td className="p-2 border">2 Days</td>
                  <td className="p-2 border">
                    🛒 <button className="underline text-blue-600">Select</button>{" "}
                    📞 <button className="underline text-blue-600">Call</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Filters */}
          <div className="mt-6 text-sm text-blue-700 font-semibold">
            🧳 Filters / Sort Options<br />
            <span className="underline cursor-pointer">[Sort by: ⬇ Price / ETA / Availability]</span>
          </div>

          {/* Unresponsive */}
          <div className="mt-4 text-sm text-red-600">
            🧯 <strong>Unresponsive Pharmacies</strong><br />
            <span className="text-blue-700">[MedStore, FastMeds] – Awaiting Response...</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap justify-between items-center mt-8 gap-4 text-sm font-medium">
          <button className="flex items-center gap-1 text-black">
            🔙 <span>Back</span>
          </button>

          <button className="flex items-center gap-1 text-green-700">
            ✅ <span>Confirm & Order from Selected Pharmacy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
