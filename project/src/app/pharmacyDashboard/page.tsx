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
    price: number
  }[]>([]);
  const [medicineName, setMedicineName] = useState<string>("");
  const [medicinePrice, setMedicinePrice] = useState<number>(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");
  const [acceptedOrders, setAcceptedOrders] = useState<{
    id: string,
    prescriptionId: string,
    customerName: string,
    totalCost: number,
    deliveredAt: string, 
    status: string
  }[]>([]);
  const [respondedPrescriptions, setRespondedPrescriptions] = useState<{
    id: string,
    customerName: string,
    totalCost: number,
    deliveryETA: string
  }[]>([]);
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
  const fetchPrescriptions = async () => {
      const res = await axios.get(`http://localhost:5000/get-all-prescriptions`, {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      if (res.status === 200) {
        setPrescriptions(res.data);
        console.log("Prescriptions:", res.data);
      }
    };
    const fetchRespondedPrescriptions = async () => {
      const res = await axios.get(`http://localhost:5000/responded-prescription`, {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      if (res.status === 200) {
        setRespondedPrescriptions(res.data);
        console.log("Responded Prescriptions:", res.data);
      }
    };
    const fetchAcceptedOrders = async () => {
      const res = await axios.get(`http://localhost:5000/get-accepted-orders`, {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      if (res.status === 200) {
        setAcceptedOrders(res.data);
        console.log("Accepted Orders:", res.data);
      }
    };
  useEffect(() => {
    if (!userData) return;

    fetchPrescriptions();
    fetchRespondedPrescriptions();
    fetchAcceptedOrders();
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
  function handleRemoveMedicine(index: number) {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }

  function sendPrescriptionResponse() {
    if (!selectedPrescription) return;

    const response = {
      prescriptionId: selectedPrescription.id,
      totalCost: medicines.reduce((acc, med) => acc + med.price, 0),
      deliveryETA: estimatedDelivery, 
      available: true
    };

    axios.post("http://localhost:5000/respond-to-prescription", response, {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    })
    .then(res => {
      console.log("Prescription response sent:", res.data);
      setSelectedPrescription(null);
      setMedicines([]);
    })
    .catch(err => {
      console.error("Error sending prescription response:", err);
    });
  }

  async function handleDispatch(orderId: string) {
    const res = await axios.post(`http://localhost:5000/dispatch-order`, { orderId }, {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    if (res.status === 200) {
      console.log("Order dispatched:", res.data);
    }
    fetchAcceptedOrders(); // Refresh accepted orders after dispatch
    fetchRespondedPrescriptions(); // Refresh responded prescriptions
  }

  function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/log-in');
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center">
        <div className="text-lg font-bold">Sandpiper Crossing</div>

        <div className="flex items-center gap-6 ml-auto">
          <a href="/pharmacyDashboard" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Help</a>
          <button 
            className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm font-semibold" 
            onClick={Logout}
          >
            Logout
          </button>
        </div>
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
                      <td className="border px-4 py-2 text-blue-600 underline" onClick={() => handleViewDownload(prescription.id)}>View PDF</td>
                      <td className="border px-4 py-2">{new Date(prescription.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 space-x-2">
                      ✅ <button className="text-green-700 underline" onClick={() => setSelectedPrescription(prescription)}>Respond</button>
                      ❌ <button className="text-red-600 underline" onClick={() => setSelectedPrescription(null)}>Skip</button>
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
                <input type="number" value={medicinePrice} className="border rounded-md p-2 my-2 mx-2" placeholder="Medicine Price" onChange={(e) => setMedicinePrice(Number(e.target.value))} />
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1" onClick={() => {
                const newMedicine = { name: medicineName, price: medicinePrice };
                setMedicines([...medicines, newMedicine]);
                setMedicineName("");
                setMedicinePrice(0);
              }}>Add</button>
              <ul className="list-disc list-inside py-2">
                {medicines.map((med, index) => (
                  <li key={index}>
                    {med.name} - {` - ₹${med.price}`} <button className="text-red-600" onClick={() => handleRemoveMedicine(index)}>❌</button>
                  </li>
                ))}
              </ul>
              <input type="text" value={estimatedDelivery} className="border rounded-md p-2 my-2" placeholder="Estimated Delivery" onChange={(e) => setEstimatedDelivery(e.target.value)} />
              <div className="mt-2">💰 <strong>Total Price:</strong> ₹{medicines.reduce((acc, med) => acc + med.price, 0)}</div>
              <div className="mt-2 text-green-700" onClick={sendPrescriptionResponse}>✅ Confirm and Send to Customer</div>
            </div>
          </>
        ): null}
        <>
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
              📦 Responded Prescriptions
            </h3>
            <div className="overflow-x-auto border rounded-md text-sm mb-10">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Prescription ID</th>
                    <th className="border px-4 py-2">Customer Name</th>
                    <th className="border px-4 py-2">Uploaded File</th>
                    <th className="border px-4 py-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {respondedPrescriptions.map((prescription) => (
                    <tr key={prescription.id}>
                      <td className="border px-4 py-2">{`#${prescription.id}`}</td>
                      <td className="border px-4 py-2">{prescription.customerName}</td>
                      <td className="border px-4 py-2 text-blue-600 underline" onClick={() => handleViewDownload(prescription.id)}>View PDF</td>
                      <td className="border px-4 py-2">{`₹${prescription.totalCost}`}</td>
                    </tr>
                  ))}
                  {respondedPrescriptions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="border px-4 py-2 text-center">
                        <p>No responded prescriptions yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

        </>
        <>
            <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2 mb-2">
              📦 Accepted Orders
            </h3>
            <div className="overflow-x-auto border rounded-md text-sm mb-10">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Prescription ID</th>
                    <th className="border px-4 py-2">Customer Name</th>
                    <th className="border px-4 py-2">Uploaded File</th>
                    <th className="border px-4 py-2">Total Price</th>
                    <th className="border px-4 py-2">Delivered At</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Dispatch</th>
                  </tr>
                </thead>
                <tbody>
              {acceptedOrders.length > 0 ? (
                acceptedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{`#${order.id}`}</td>
                    <td className="border px-4 py-2">{order.customerName}</td>
                    <td className="border px-4 py-2 text-blue-600 underline" onClick={() => handleViewDownload(order.prescriptionId)}>View PDF</td>
                    <td className="border px-4 py-2">{`₹${order.totalCost}`}</td>
                    <td className="border px-4 py-2">{order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : "Pending"}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">{order.status === "accepted" ? (<button className="text-blue-600 underline" onClick={() => handleDispatch(order.id)}>Dispatch</button>) : null}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border px-4 py-2 text-center">
                    <p>No accepted orders yet.</p>
                  </td>
                </tr>
              )}
                </tbody>
              </table>
            </div>
        </>
      </div>
    </div>
  );
}
