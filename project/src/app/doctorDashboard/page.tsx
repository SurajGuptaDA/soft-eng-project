"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DoctorDashboard() {
    const router = useRouter();
    const [pendingConsultations, setPendingConsultations] = useState<{consultationId: string, patientName: string}[]>([]);
    const [acceptedConsultations, setAcceptedConsultations] = useState<{consultationId: string, patientName: string, requestTime: string | null, scheduledTime: string | null}[]>([]);
    const [showTime, setShowTime] = useState(false);
    const [scheduledTime, setScheduledTime] = useState<string>("");

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.push('/log-in');
    }

    async function scheduleConsultation(consultationId: string, scheduledTime: string) {
        console.log("Scheduling consultation with ID:", consultationId, "at time:", scheduledTime);
        const response = await axios.post(`http://localhost:5000/schedule-consultation-doctor`, {
            consultationId: consultationId,
            scheduledTime: scheduledTime
        }, {
            withCredentials: true,
            headers: { 'x-access-token': localStorage.getItem('token') }
        });
        if (response.status === 200) {
            console.log("Consultation scheduled successfully");
        } else {
            console.error("Error scheduling consultation");
            console.error(response.data);
        }
        fetchAcceptedConsultations();
    }
    async function fetchAcceptedConsultations() {
        try {
            const response = await axios.get('http://localhost:5000/all-consultation-accepted-doctor', {
                withCredentials: true,
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            if (response.status === 200) {
                setAcceptedConsultations(response.data);
                console.log("Accepted consultations:", response.data);
            } else {
                console.error("Error fetching accepted consultations");
            }
        } catch (error) {
            console.error("Error fetching accepted consultations", error);
        }
    }

    async function fetchPendingConsultations() {
        try {
            const response = await axios.get('http://localhost:5000/all-consultation-pending-doctor', {
                withCredentials: true,
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            if (response.status === 200) {
                setPendingConsultations(response.data);
                console.log("Pending consultations:", response.data);
            } else {
                console.error("Error fetching pending consultations");
            }
        } catch (error) {
            console.error("Error fetching pending consultations", error);
        }
    }
    useEffect(() => {
        fetchAcceptedConsultations();
        fetchPendingConsultations();
    }, []);

    async function acceptedConsultation(consultationId: string) {
        try {
            const response = await axios.post(`http://localhost:5000/accept-consultation-doctor/${consultationId}`, {}, {
                withCredentials: true,
                headers: { 'x-access-token': localStorage.getItem('token') }
            });
            if (response.status === 200) {
                console.log("Consultation accepted successfully");
                fetchAcceptedConsultations();
                fetchPendingConsultations();
            } else {
                console.error("Error accepting consultation");
                console.error(response.data);
            }
        } catch (error) {
            console.error("Error accepting consultation", error);
        }
    }

    return (
        <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-bold">Sandpiper Crossing</div>
            <div className="flex space-x-6">
            <a href="/doctorDashboard" className="hover:underline">Dashboard</a>
            <a href="#" className="hover:underline">Help</a>
            </div>
            <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm font-semibold" onClick={handleLogout}>
            Logout
            </button>
        </nav>

        {/* Content */}
        <div className="p-8 max-w-5xl mx-auto">
            {acceptedConsultations.length === 0 ? (
                <div className="text-center text-gray-500">No accepted consultations</div>
            ) : (
            <>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              🗎 Accepted Consultations
            </h2>
            <div className="overflow-x-auto border rounded-md text-sm mb-10">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Consultation ID</th>
                    <th className="border px-4 py-2">Patient Name</th>
                    <th className="border px-4 py-2">Requested Time</th>
                    <th className="border px-4 py-2">Scheduled time</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedConsultations.map((consultation) => (
                    <tr key={consultation.consultationId}>
                      <td className="border px-4 py-2">{`#${consultation.consultationId}`}</td>
                      <td className="border px-4 py-2">{consultation.patientName}</td>
                      <td className="border px-4 py-2">{consultation.requestTime}</td>
                      <td className="border px-4 py-2">{consultation.scheduledTime}</td>
                      <td className="border px-4 py-2 space-x-2">
                        {consultation.requestTime && consultation.scheduledTime === null && (<button className="text-blue-600 underline" onClick={() => setShowTime(true)}>Schedule</button>)}
                        {showTime && (
                            <>
                            <input type="date" onChange={(e) => setScheduledTime(e.target.value)} placeholder="Enter scheduled time" />
                            <button className="ml-2 bg-blue-500 text-white px-4 py-1 rounded" onClick={() => scheduleConsultation(consultation.consultationId, scheduledTime)}>Submit</button>
                            </>
                        )}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
            )}
            {pendingConsultations.length === 0 ? (
                <div className="text-center text-gray-500">No pending consultations</div>
            ) : (
                <>
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  ⏳ Pending Consultations
                </h2>
                <div className="overflow-x-auto border rounded-md text-sm mb-10">
                  <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Consultation ID</th>
                        <th className="border px-4 py-2">Patient Name</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingConsultations.map((consultation) => (
                        <tr key={consultation.consultationId}>
                          <td className="border px-4 py-2">{`#${consultation.consultationId}`}</td>
                          <td className="border px-4 py-2">{consultation.patientName}</td>
                          <td className="border px-4 py-2 space-x-2">
                            <button className="text-blue-600 underline" onClick={() => acceptedConsultation(consultation.consultationId)}>Accept</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
            )}
        </div>
        </div>
    )
}