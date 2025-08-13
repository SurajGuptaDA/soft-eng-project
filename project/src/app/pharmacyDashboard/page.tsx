'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PrescriptionsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{userId: string, username: string, email: string, phone: string} | null>(null);
  const [prescriptions, setPrescriptions] = useState<{
    id: string, 
    customerName: string,
    uploadedFile: string,
    date: string
  }[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<{
    id: string,
    customerName: string,
    uploadedFile: string,
    date: string
  } | null>(null);
  const [medicines, setMedicines] = useState<{
    name: string,
    available: boolean, 
    price: number
  }[]>([]);
  const [medicineName, setMedicineName] = useState<string>("");
  const [medicineAvailable, setMedicineAvailable] = useState<boolean>(false);
  const [medicinePrice, setMedicinePrice] = useState<number>(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");
  useEffect(() => {
    const fetchId = async () => {
      const res = await axios.get('http://localhost:5000/current-pharmacist-details', {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      if (res.status === 200) {
        setUserData(res.data.userData);
        console.log("User Data:", res.data.userData);
      }
    };
    fetchId();
  }, []);
  useEffect(() => {
    if (!userData) return;

    const fetchPrescriptions = async () => {
      const res = await axios.get(`http://localhost:5000/get-all-prescriptions`, {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      if (res.status === 200) {
        setPrescriptions(res.data);
      }
    };

    fetchPrescriptions();
  }, [userData]);

  function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/log-in');
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-bold">Sandpiper Crossing</div>
        <div className="flex space-x-6">
          <a href="/pharmacyDashboard" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Orders</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm font-semibold" onClick={Logout}>
          Logout
        </button>
      </nav>

      <div className="p-8 max-w-5xl mx-auto">
        {/* Incoming Prescriptions */}
        {prescriptions.length === 0 ? (
          <div className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">No incoming prescriptions</div>
        ) : (
          <>
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
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.id}>
                      <td className="border px-4 py-2">{`#${prescription.id}`}</td>
                      <td className="border px-4 py-2">{prescription.customerName}</td>
                      <td className="border px-4 py-2 text-blue-600 underline">View PDF</td>
                      <td className="border px-4 py-2">{new Date(prescription.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 space-x-2">
                      ✅ <button className="text-green-700 underline" onClick={() => setSelectedPrescription(prescription)}>Respond</button>
                      ❌ <button className="text-red-600 underline">Skip</button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Respond Section */}
        {selectedPrescription ? (
          <>
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
              📦 Respond to Prescription
            </h3>
            <div className="text-sm text-gray-700 mb-4">
              <div>[Prescription Details Panel]</div>
              <input type="text" value={medicineName} className="border rounded-md p-2 my-2" placeholder="Medicine Name" onChange={(e) => setMedicineName(e.target.value)} />
              <label className="ml-2 px-3">
                <input type="checkbox" className="mr-1" checked={medicineAvailable} onChange={(e) => setMedicineAvailable(e.target.checked)} />
                Available
              </label>
              {medicineAvailable && (
                <input type="number" value={medicinePrice} className="border rounded-md p-2 my-2" placeholder="Medicine Price" onChange={(e) => setMedicinePrice(Number(e.target.value))} />
              )}
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1" onClick={() => {
                const newMedicine = { name: medicineName, available: medicineAvailable, price: medicinePrice };
                setMedicines([...medicines, newMedicine]);
                setMedicineName("");
                setMedicineAvailable(false);
                setMedicinePrice(0);
              }}>Add</button>
              <ul className="list-disc list-inside py-2">
                {medicines.map((med, index) => (
                  <li key={index}>
                    {med.name} – {med.available ? "Available" : "Out of Stock"} {med.available ? ` – ₹${med.price}` : null}
                  </li>
                ))}
              </ul>
              <input type="text" value={estimatedDelivery} className="border rounded-md p-2 my-2" placeholder="Estimated Delivery" onChange={(e) => setEstimatedDelivery(e.target.value)} />
              <div className="mt-2">💰 <strong>Total Price:</strong> ₹{medicines.reduce((acc, med) => acc + (med.available ? med.price : 0), 0)}</div>
              <div className="mt-2 text-green-700">✅ Confirm and Send to Customer</div>
            </div>
          </>
        ): null}
      </div>
    </div>
  );
}
