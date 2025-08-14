"use client";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function DashboardPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [userData, setUserData] = useState<{userId: string, name: string, email: string, phone: string} | null>(null);
  const [prescriptions, setPrescriptions] = useState<{id: string, customerName: string, date: string, uploadedFile: string}[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const router = useRouter();
  interface TodayDose {
              timeSlot: string;
              taken: boolean;
            }

  interface Medicine {
    trackId: string;
    medicineName: string;
    dosage: string;
    frequency: string[];
    todayDoses: TodayDose[];
  }

  // Runs only once to get user data

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);
useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) router.push('/log-in');
  const fetchId = async () => {
    try {const res = await axios.get('http://localhost:5000/current-senior-details', {
      withCredentials: true,
      headers: { 'x-access-token': token }
    });
    if (res.status === 200) {
      setUserData(res.data.userData);
      console.log("User Data:", res.data.userData);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    router.push('/log-in');
  }
  };
  fetchId();
}, []);
  const fetchMedicines = async () => {
    if (!userData) return;
    const res = await axios.get(`http://localhost:5000/medicines/today/${userData.userId}`);
    if (res.status === 200) {
      setMedicines(res.data);
      console.log("Medicines for today:", res.data);
    }
  };

  const fetchPrescriptions = async () => {
    if (!userData) return;
    const res = await axios.get(`http://localhost:5000/get-senior-prescriptions/${userData.userId}`, {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    if (res.status === 200) {
      setPrescriptions(res.data);
    }
  };

// Runs when userData is available
  useEffect(() => {
    if (!userData) return;

    

    fetchMedicines();
    fetchPrescriptions();
  }, [userData]);

  async function handleViewDownload(id: string) {
    const res = await axios.get(`http://localhost:5000/view-prescription/${id}`, {
      responseType: 'blob',
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    const mimeType = res.headers['content-type'] || 'application/octet-stream';
    const url = window.URL.createObjectURL(new Blob([res.data], { type: mimeType }));
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = url;
    // link.setAttribute('download', id);
    document.body.appendChild(link);
    link.click();
  }

  async function handleEmergency(){
    const res = await axios.post(`http://localhost:5000/emergency/trigger`, {location: 'New Delhi'}, {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    if (res.status === 200) {
      console.log("Emergency request sent");
    }
  }
  async function takeMedicine(medicineId: string, timeSlot: string, taken: boolean) {
    if (taken) {
      console.log("Medicine already taken for this slot");
      return;
    } 
    const res = await axios.post(`http://localhost:5000/medicines/log-dose`, {
      trackId: medicineId,
      timeSlot: timeSlot, 
      date: new Date().toISOString().split('T')[0] // Format date as YYYY-MM-DD
    });
    if (res.status === 200) {
      console.log("Medicine taken:", res.data);
    }
    // Refresh medicines after taking one
    fetchMedicines();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <div className="flex-1"></div>
        <ul className="flex gap-6 text-sm font-semibold uppercase">
          <li><a href="#">Home</a></li>
          <li><a href="/uploadPrescription">Upload Prescription</a></li>
          <li>
            <button
              type="button"
              className="bg-transparent text-white"
              onClick={() => setShowAddMedicineModal(true)}
            >
              Add Medicine
            </button>
            {showAddMedicineModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h3 className="text-lg font-bold mb-4 text-black">Add Medicine</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const medicineName = form.medicineName.value;
                      const dosage = form.dosage.value;
                      const frequency = Array.from(form.querySelectorAll('input[name="frequency"]:checked')).map((input) => (input as HTMLInputElement).value);
                      const startDate = form.startDate.value;
                      const endDate = form.endDate.value;
                      console.log("Adding medicine:", { medicineName, dosage, frequency, startDate, endDate });

                      await axios.post(
                        `http://localhost:5000/medicines`,
                        {
                          'userId': userData?.userId,
                          'medicineName': medicineName,
                          'dosage': dosage,
                          'frequency': frequency,
                          'startDate': startDate,
                          'endDate': endDate,
                        },
                      );
                      setShowAddMedicineModal(false);
                      fetchMedicines(); // Refresh medicines after adding
                    }}
                  >
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1 text-black">Medicine Name</label>
                      <input
                        name="medicineName"
                        type="text"
                        required
                        className="w-full border rounded px-2 py-1 text-black"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1 text-black">Dosage</label>
                      <input
                        name="dosage"
                        type="text"
                        required
                        className="w-full border rounded px-2 py-1 text-black"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1 text-black">Frequency</label>
                      <div className="flex gap-3">
                        <label className="flex items-center text-black">
                          <input type="checkbox" name="frequency" value="morning" className="mr-1" />
                          Morning
                        </label>
                        <label className="flex items-center text-black">
                          <input type="checkbox" name="frequency" value="afternoon" className="mr-1" />
                          Afternoon
                        </label>
                        <label className="flex items-center text-black">
                          <input type="checkbox" name="frequency" value="night" className="mr-1" />
                          Night
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1 text-black">Start Date</label>
                      <input
                        name="startDate"
                        type="date"
                        required
                        className="w-full border rounded px-2 py-1 text-black"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1 text-black">End Date</label>
                      <input
                        name="endDate"
                        type="date"
                        required
                        className="w-full border rounded px-2 py-1 text-black"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="px-3 py-1 rounded bg-gray-200"
                        onClick={() => setShowAddMedicineModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </li>
          <li><a href="/consultDoctor">Call Doctor</a></li>
          <li><a href="/trackOrder">My Orders</a></li>
          <li><button className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">Edit Details</button></li>
        </ul>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1">
        {/* LEFT SIDEBAR */}
        <aside className="bg-[#e6f0ff] w-40 p-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full border border-gray-400 mb-2 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div className="text-center bg-white text-sm font-medium px-2 py-1 rounded">{userData?.name ?? "Guest"}</div>
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
              medicines.map((med: Medicine, i: number) => (
                med.todayDoses.map((dose: TodayDose, index: number) => (
                  <>
                    <div key={i} className="border-2 rounded-full flex justify-between items-center px-6 py-3 mb-3 max-w-3xl mx-auto">
                      <div className="flex items-center gap-4">
                        <span className="text-green-500 text-xl" onClick={() => takeMedicine(med.trackId, dose.timeSlot, dose.taken)}>✔️</span>
                        <span key={index} className={`text-sm ${dose.taken ? 'text-green-500' : 'text-red-500'}`}>
                          {med.dosage} - {dose.timeSlot}
                        </span>
                      </div>
                      <span className="bg-gray-200 px-4 py-1 rounded">PILL IMAGE</span>
                    </div>
                  </>
                ))
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
                      <td className="border px-4 py-2">{prescription.id}</td>
                      <td className="border px-4 py-2">{prescription.customerName}</td>
                      <td className="border px-4 py-2">{new Date(prescription.date).toLocaleDateString()}</td>
                      <td className="border px-4 py-2 text-blue-600 underline cursor-pointer" onClick={() => handleViewDownload(prescription.id)}>Click to view/download</td>
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
            <button
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded mt-2"
              onMouseDown={() => {
              // Start timer on mouse down
              setHoldTimeout(setTimeout(() => {
                handleEmergency();
              }, 3000));
              }}
              onMouseUp={() => {
              // Clear timer if mouse released early
              if (holdTimeout) {
                clearTimeout(holdTimeout);
              }
              setHoldTimeout(null);
              }}
              onMouseLeave={() => {
              // Clear timer if mouse leaves button
              if (holdTimeout) {
                clearTimeout(holdTimeout);
              }
              setHoldTimeout(null);
              }}
            >
              PRESS ME <br /> FOR 3 SEC
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
