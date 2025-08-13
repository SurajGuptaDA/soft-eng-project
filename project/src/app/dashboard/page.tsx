"use client";
import {useState, useEffect} from 'react';
import axios from 'axios';
export default function DashboardPage() {
  const [medicines, setMedicines] = useState<{medicineName: string, todayDoses: {timeSlot: string}}[]>([]);
  const [userData, setUserData] = useState<{userId: string, username: string, email: string, phone: string} | null>(null);
  const [prescriptions, setPrescriptions] = useState<{prescriptionId: string, patientName: string, dateUploaded: string, doctorName: string}[]>([]);
  const [currentDate] = useState<string>(new Date().toDateString());
  const [currentTime] = useState<string>(new Date().toLocaleTimeString());

  // Runs only once to get user data
useEffect(() => {
  const fetchId = async () => {
    const res = await axios.get('http://localhost:5000/current-senior-details', {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    if (res.status === 200) {
      setUserData(res.data.userData);
    }
  };
  fetchId();
}, []);

// Runs when userData is available
useEffect(() => {
  if (!userData) return;

  const fetchMedicines = async () => {
    const res = await axios.get(`http://localhost:5000/medicines/today/${userData.userId}`);
    if (res.status === 200) {
      setMedicines(res.data);
    }
  };

  const fetchPrescriptions = async () => {
    const res = await axios.get(`http://localhost:5000/prescriptions/${userData.userId}`);
    if (res.status === 200) {
      setPrescriptions(res.data);
    }
  };

  fetchMedicines();
  fetchPrescriptions();
}, [userData]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <ul className="flex gap-6 text-sm font-semibold uppercase">
          <li><a href="#">Home</a></li>
          <li><a href="/uploadPrescription">Upload Prescription</a></li>
          <li><a href="/consultDoctor">Call Doctor</a></li>
          <li><a href="/trackOrder">My Orders</a></li>
          <li><a href="#">Health Overview</a></li>
        </ul>
        <button className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">Edit Details</button>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1">
        {/* LEFT SIDEBAR */}
        <aside className="bg-[#e6f0ff] w-40 p-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full border border-gray-400 mb-2 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div className="text-center bg-white text-sm font-medium px-2 py-1 rounded">{userData?.username ?? "Guest"}</div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 p-6">
          {/* REMINDER */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">TODAY&apos;S REMAINDER</h2>
            <div className="flex justify-center gap-4 mb-4">
              <div className="bg-gray-100 px-4 py-1 rounded">{currentDate}</div>
              <div className="bg-gray-100 px-4 py-1 rounded">{currentTime}</div>
            </div>
            {medicines.length > 0 && (
              medicines.map((med, i) => (
                <div key={i} className="border-2 rounded-full flex justify-between items-center px-6 py-3 mb-3 max-w-3xl mx-auto">
                  <div className="flex items-center gap-4">
                    <span className="text-green-500 text-xl">✔️</span>
                    <span className="text-red-500 text-xl">❌</span>
                    <span>{med.medicineName} , {med.todayDoses.timeSlot}</span>
                  </div>
                  <span className="bg-gray-200 px-4 py-1 rounded">PILL IMAGE</span>
                </div>
              ))
            )}
          </section>

          {/* PRESCRIPTION STATUS */}
          {prescriptions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">PRESCRIPTION STATUS</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border border-blue-500 w-full text-sm text-center">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border px-4 py-2">PRESCRIPTION ID</th>
                    <th className="border px-4 py-2">PATIENT NAME</th>
                    <th className="border px-4 py-2">DATE UPLOADED</th>
                    <th className="border px-4 py-2">VIEW/DOWNLOAD</th>
                    <th className="border px-4 py-2">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.length > 0 && prescriptions.map((prescription, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{prescription.prescriptionId}</td>
                      <td className="border px-4 py-2">{prescription.patientName}</td>
                      <td className="border px-4 py-2">{new Date(prescription.dateUploaded).toLocaleDateString()}</td>
                      <td className="border px-4 py-2 text-blue-600 underline cursor-pointer">Click to view/download</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          )}

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
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="font-bold">{d}</div>
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
