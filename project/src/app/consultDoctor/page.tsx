export default function DoctorConsultPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#4d7cfe] text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sandpiper Crossing</div>
        <ul className="flex gap-6 text-sm font-semibold">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/trackOrder">Orders</a></li>
          <li><a href="/uploadPrescription">Upload Rx</a></li>
          <li><a href="#">Help</a></li>
        </ul>
        <button className="bg-green-500 px-4 py-1 text-white text-sm rounded-full">Logout</button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-8 py-10">
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold text-blue-900 text-center mb-4">
          Online doctor consultation with <br /> qualified doctors <br /> Starting at ₹XXX
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
        <button className="bg-[#f54254] text-white px-8 py-3 rounded-lg text-lg font-semibold mb-10 hover:bg-red-600">
          Consult Now
        </button>

        {/* Illustration */}
        <div className="w-full flex justify-center mb-12">
          <img
            src="/doctor-consult.png"
            alt="Doctor Consulting"
            className="max-w-sm md:max-w-md lg:max-w-lg"
          />
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
