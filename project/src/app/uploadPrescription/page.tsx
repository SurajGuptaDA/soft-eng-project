"use client";
import axios from "axios";
import prescriptionImage from "../../../public/prescription_image.jpg"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
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
        router.push('/dashboard'); // Redirect to dashboard if token is valid
      })
      .catch(error => {
        console.error('Token verification failed:', error);
      });
    }
  }, [router]);

  async function handleSubmit() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // send the actual file

    try {
      const response = await axios.post("http://localhost:5000/upload_prescription_senior", formData, {
        withCredentials: true,
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload prescription");
      }

      console.log("File uploaded successfully!");
      router.push('/dashboard'); // redirect to dashboard after successful upload
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/log-in');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-sm font-semibold">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/help">Help</a></li>
            <li><button className="bg-green-500 px-4 py-1 text-white text-sm rounded-full" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-10 py-10 gap-12">
        {/* Left Illustration */}
        <div>
          <Image
            src={prescriptionImage}
            alt="Upload RX"
            className="w-full"
            width={500}
            height={500}
            priority
          />
          {/* <img src={prescriptionImage.src} alt="Upload RX" className="w-full" /> */}
        </div>

        {/* Right Form */}
        <div className="max-w-xl w-full">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">UPLOAD YOUR PRESCRIPTION</h2>
          <p className="text-sm mb-6 font-medium">Drag & Drop your prescription here or click to browse files</p>

          {/* Upload Area */}
          <label className="block w-full border-2 border-dashed border-blue-400 py-10 px-6 rounded-lg text-center cursor-pointer text-blue-500 font-medium mb-4">
            {file ? file.name : "Click to select file"}
            <input
              type="file"
              accept=".jpg,.png,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>


          {/* Info */}
          <div className="text-sm space-y-2 mb-6">
            <p className="flex items-center gap-2"><span>📄</span> Accepted formats: PDF, JPG, PNG</p>
            <p className="flex items-center gap-2"><span>📍</span> Share location with pharmacies</p>
            <p className="ml-6 text-gray-700">Forward to: ✅ Nearby Pharmacies</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={handleSubmit}>
              SUBMIT PRESCRIPTION
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={() => setFile(null)}>
              CANCEL
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">ⓘ Tip: Make sure the prescription is clearly readable</p>
        </div>
      </div>
    </div>
  );
}
