"use client";

import { useState } from "react";

export default function UploadPrescriptionPage() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <ul className="flex gap-6 text-sm font-semibold">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Orders</a></li>
          <li><a href="#">Upload Rx</a></li>
          <li><a href="#">Help</a></li>
        </ul>
        <button className="bg-green-500 px-4 py-1 text-white text-sm rounded-full">Logout</button>
      </nav>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-10 py-10 gap-12">
        {/* Left Illustration */}
        <div className="hidden md:block w-96">
          <img src="/prescription-upload.png" alt="Upload RX" className="w-full" />
        </div>

        {/* Right Form */}
        <div className="max-w-xl w-full">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">UPLOAD YOUR PRESCRIPTION</h2>
          <p className="text-sm mb-6 font-medium">Drag & Drop your prescription here or click to browse files</p>

          {/* Upload Area */}
          <label className="block w-full border-2 border-dashed border-blue-400 py-10 px-6 rounded-lg text-center cursor-pointer text-blue-500 font-medium mb-4">
            {fileName || "Click to select file"}
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Info */}
          <div className="text-sm space-y-2 mb-6">
            <p className="flex items-center gap-2"><span>📄</span> Accepted formats: PDF, JPG, PNG</p>
            <p className="flex items-center gap-2"><span>📍</span> Share location with pharmacies</p>
            <p className="ml-6 text-gray-700">Forward to: ✅ Nearby Pharmacies</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              SUBMIT PRESCRIPTION
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              CANCEL
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">ⓘ Tip: Make sure the prescription is clearly readable</p>
        </div>
      </div>
    </div>
  );
}
