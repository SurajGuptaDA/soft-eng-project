export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <ul className="flex gap-6 text-sm font-semibold uppercase">
          <li><a href="#">Home</a></li>
          <li><a href="#">Upload Prescription</a></li>
          <li><a href="#">Compare Medicine</a></li>
          <li><a href="#">Call Doctor</a></li>
          <li><a href="#">My Orders</a></li>
          <li><a href="#">Health Overview</a></li>
        </ul>
        <button className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">Login/Signup</button>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1">
        {/* LEFT SIDEBAR */}
        <aside className="bg-[#e6f0ff] w-40 p-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full border border-gray-400 mb-2 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div className="text-center bg-white text-sm font-medium px-2 py-1 rounded">USERNAME</div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 p-6">
          {/* REMINDER */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">TODAY'S REMAINDER</h2>
            <div className="flex justify-center gap-4 mb-4">
              <div className="bg-gray-100 px-4 py-1 rounded">Jun 10, 2024</div>
              <div className="bg-gray-100 px-4 py-1 rounded">9:41 AM</div>
            </div>
            {[1, 2].map((_, i) => (
              <div key={i} className="border-2 rounded-full flex justify-between items-center px-6 py-3 mb-3 max-w-3xl mx-auto">
                <div className="flex items-center gap-4">
                  <span className="text-green-500 text-xl">✔️</span>
                  <span className="text-red-500 text-xl">❌</span>
                  <span>PILL NAME , TIME</span>
                </div>
                <span className="bg-gray-200 px-4 py-1 rounded">PILL IMAGE</span>
              </div>
            ))}
          </section>

          {/* PRESCRIPTION STATUS */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">PRESCRIPTION STATUS</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border border-blue-500 w-full text-sm text-center">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border px-4 py-2">PRESCRIPTION ID</th>
                    <th className="border px-4 py-2">PATIENT NAME</th>
                    <th className="border px-4 py-2">DATE UPLOADED</th>
                    <th className="border px-4 py-2">DOCTOR'S NAME</th>
                    <th className="border px-4 py-2">VIEW/DOWNLOAD</th>
                    <th className="border px-4 py-2">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2">Name</td>
                    <td className="border px-4 py-2">Date</td>
                    <td className="border px-4 py-2">Prescribed by</td>
                    <td className="border px-4 py-2 text-blue-600 underline">Click to view/download</td>
                    <td className="border px-4 py-2">
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        aria-label="Prescription status"
                      >
                        <option>Processing</option>
                        <option>Dispatched</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* HEALTH OVERVIEW */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">HEALTH OVERVIEW</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>Meds Taken This Week: 6/7</li>
              <li>Last Consultation: 3 days ago with Dr. Sharma</li>
            </ul>
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-60 bg-gray-100 p-4 flex flex-col justify-between">
          {/* Calendar */}
          <div>
            <h3 className="font-bold text-xl mb-2">CALENDER</h3>
            <div className="bg-white border rounded p-4">
              <p className="text-sm font-semibold mb-2">June 2024</p>
              <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-700">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                  <div key={d} className="font-bold">{d}</div>
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`p-1 rounded ${i === 25 ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div className="mt-6 text-center">
            <p className="text-red-600 font-bold uppercase">Emergency Button</p>
            <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded mt-2">
              PRESS ME <br /> FOR 3 SEC
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
