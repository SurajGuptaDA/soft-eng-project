'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<{ id: number; customerName: string; address: string; pharmacyAddress: string; status: string; deliveredAt: string }[]>([]);
  const router = useRouter();
  // const [file, setFile] = useState<File | null>(null);
  const [amountCollected, setAmountCollected] = useState<boolean>(false);
  const [selectedDelivery, setSelectedDelivery] = useState<{ id: number; customerName: string; address: string; pharmacyAddress: string; status: string; deliveredAt: string } | null>(null);

  const fetchDeliveries = async () => {
      const response = await axios.get(`http://localhost:5000/get-deliveries`, {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    if (response.status === 200) {
      setDeliveries(response.data);
      console.log("Deliveries:", response.data);
    }
    };
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, verify it
      axios.get('http://localhost:5000/verifyToken', {
        headers: {
          'x-access-token': token
        }
      })
      .then(response => {
        console.log('Token is valid:', response.data);
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        router.push('/log-in');  
      });
    } else {
      router.push('/log-in');  
    }
    
  }, [router]);

  useEffect(() => {

    fetchDeliveries();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/log-in');
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("File selected:", e.target.files);
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   }
  //   handleSubmit();
  // };

  async function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    if (!selectedDelivery || !e.target.files?.[0]) return;
    console.log("Submitting delivery...");

    const formData = new FormData();
    formData.append("file", e.target.files?.[0]); // send the actual file
    formData.append("deliveryId", selectedDelivery.id.toString()); // send the delivery ID

    try {
      const response = await axios.post("http://localhost:5000/deliver-order", formData, {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      if (response.status !== 200) {
        throw new Error("Failed to deliver order");
      }

      console.log("Order delivered successfully!");
      alert("Order delivered successfully!");
      setSelectedDelivery(null);
      fetchDeliveries(); // refresh deliveries list
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-bold">Sandpiper Crossing</div>
        <div className="flex space-x-6">
          <a href="/deliveryDashboard" className="hover:underline">Dashboard</a>
          <a href="/help" className="hover:underline">Help</a>
        </div>
        <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm font-semibold" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="p-8 max-w-5xl mx-auto">
        {/* Deliveries Table */}
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
          📦 My Deliveries
        </h2>

        {deliveries.length > 0 ? (<div className="overflow-x-auto border rounded-md text-sm">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Order ID</th>
                <th className="border px-4 py-2 text-left">Customer Name</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Pharmacy Address</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Delivered On</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{delivery.id}</td>
                  <td className="border px-4 py-2">{delivery.customerName}</td>
                  <td className="border px-4 py-2">{delivery.address}</td>
                  <td className="border px-4 py-2">{delivery.pharmacyAddress}</td>
                  <td className={`border px-4 py-2 ${delivery.status === 'delivered' ? 'text-green-600' : 'text-red-600'}`}>
                    {delivery.status}
                  </td>
                  <td className="border px-4 py-2">{delivery.deliveredAt}</td>
                  <td className="border px-4 py-2">
                    {delivery.status === "dispatched" && (<>
                      <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => setAmountCollected(true)}>
                        Collect Amount
                      </button>
                      <button
                        onClick={() => {
                          if (!amountCollected) {
                            alert("Please collect the amount before marking as delivered.");
                            return;
                          }
                          setSelectedDelivery(delivery);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Mark as Delivered
                      </button>
                    </>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : (
          <div className="text-center py-4">
            <p className="text-gray-600">No deliveries found.</p>
          </div>
        )}

        {/* Delivery Confirmation */}
        {selectedDelivery && (<div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            ✅ Delivery Confirmation
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              ✅ <span>Take photo or signature</span>
            </div>
              <div className="flex items-center gap-4">
                <input 
                  type='file' 
                  accept=".jpg,.png" 
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800" 
                  placeholder="Submit proof" 
                  onChange={handleSubmit}
                />
                <button className="text-gray-600 underline" onClick={() => {
                  setAmountCollected(false);
                  setSelectedDelivery(null);
                }}>Cancel</button>
              </div>
            </div>
        </div>)}
      </div>
    </div>
  );
}
