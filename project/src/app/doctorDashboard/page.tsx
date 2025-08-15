"use client";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
    const router = useRouter();

    function handleLogout() {
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
            <a href="/deliveryDashboard" className="hover:underline">Dashboard</a>
            <a href="#" className="hover:underline">Help</a>
            </div>
            <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded-full text-white text-sm font-semibold" onClick={handleLogout}>
            Logout
            </button>
        </nav>

        {/* Content */}
        <div className="p-8 max-w-5xl mx-auto">

        </div>
        </div>
    )
}