"use client";
import doctorImage from "../../../public/doctor_image.jpg"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from "axios";

export default function DoctorConsultPage() {
  const [showDoctorsModal, setShowDoctorsModal] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<{id: string, name: string, specialization: string}[]>([]);
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/log-in');
  }

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

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-doctors", {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
      const data = await response.data;
      console.log('Fetched doctors:', data);
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleConsultationRequest = async (doctorId: string) => {
    console.log(`Requesting consultation for doctor ID: ${doctorId}`);
    // Implement the consultation request logic here
    const res = await axios.get(`http://localhost:5000/request_consultation_senior/${doctorId}`, {
      withCredentials: true,
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    if (res.status === 200) {
      console.log("Consultation request successful");
      setShowDoctorsModal(false);
      router.push('/dashboard'); // Redirect to dashboard after request
      // Optionally, redirect or show a success message
    } else {
      console.error("Failed to request consultation");
    }
    
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <ul className="flex gap-6 text-sm font-semibold">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/help">Help</a></li>
        </ul>
        <button className="bg-green-500 px-4 py-1 text-white text-sm rounded-full" onClick={handleLogout}>Logout</button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-8 py-10">
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold text-blue-900 text-center mb-4">
          Online doctor consultation with <br /> qualified doctors
        </h2>

        {/* Benefits Row */}
        <div className="flex flex-wrap justify-center gap-10 mt-6 mb-8 text-center text-blue-800 text-md font-semibold">
          <div className="flex flex-col items-center gap-2">
            <span>🕒</span>
            <span>Talk within<br />30min</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span>📩</span>
            <span>Free follow up for<br />3 days</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span>📝</span>
            <span>Get a valid<br />prescription</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-[#f54254] text-white px-8 py-3 rounded-lg text-lg font-semibold mb-10 hover:bg-red-600" onClick={() => {
          setShowDoctorsModal(true);
          fetchDoctors();
          }}>
          Consult Now
        </button>
        {showDoctorsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-200">
              <table className="table-auto border border-blue-500 w-full text-sm text-center">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border px-4 py-2">SN. NO.</th>
                    <th className="border px-4 py-2">DOCTOR NAME</th>
                    <th className="border px-4 py-2">SPECIALIZATION</th>
                    <th className="border px-4 py-2">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor, index) => (
                    <tr key={doctor.id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{doctor.name}</td>
                      <td className="border px-4 py-2">{doctor.specialization}</td>
                      <td className="border px-4 py-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleConsultationRequest(doctor.id)}>Request Consultation</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setShowDoctorsModal(false)}>Close</button>
            </div>
          </div>

        )}
        {/* Illustration */}
        <div className="w-full flex justify-center mb-12">
          <Image src={doctorImage} alt="Doctor Consulting" className="max-w-sm md:max-w-md lg:max-w-lg" />
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <div>
            <div className="text-4xl mb-2">🔒</div>
            <h4 className="font-bold">100% Confidential</h4>
            <p className="text-sm text-gray-700">All advice & consultations are completely confidential. You can also delete chats whenever you want.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🎖️</div>
            <h4 className="font-bold">Certified Doctors</h4>
            <p className="text-sm text-gray-700">We offer quality healthcare through our network of certified and experienced doctors.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">💊</div>
            <h4 className="font-bold">Convenience</h4>
            <p className="text-sm text-gray-700">Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">💸</div>
            <h4 className="font-bold">Cost Effective</h4>
            <p className="text-sm text-gray-700">We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
