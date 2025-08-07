"use client";
import { useState } from 'react';
import { useRouter} from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import logo from '../../../public/Screenshot 2025-06-27 194546.png';
function Navbar() {
  return (
    <nav className="bg-[#4d7cfe] py-4 shadow-md">
      <div className="container mx-auto flex justify-end items-center">
        <img src={logo.src} alt="Logo" className="h-10 mr-auto" />
         {/* Logo on the left side */}
        <ul className="flex gap-12">
          {['Home', 'Features', 'About Us', 'Contact Us', 'Login'].map((item, idx) => (
            <li key={idx}>
              <a
                href={
                  item === 'Home' ? '/' : item === 'Features' ? '/features' : item === 'About Us' ? '/about' : item === 'Contact Us' ? '/contact' : '/log-in'
                }
                className="text-white font-bold uppercase underline underline-offset-4 decoration-2 hover:opacity-90 transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-4">
      <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '', 
    address: '', 
    dob: '', 
    specialization: '', 
    licenceNo: '', 
    pincode: '', 
    pharmacyName: '', 
    region: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isAgree) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    const res = await axios.post('http://localhost:5000/register', formData);
    console.log(res)
    if (res.status === 201) {
      alert('Signup successful!');
      // Redirect to login page or home page
      router.push('/log-in');
    }
  }
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center">
          <img src="data:image/jpeg;base64,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" alt="Sign Up" className="w-80 md:w-96" />
        </div>

        {/* Right Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-2">
            Welcome to <span className="block font-bold">Sandpiper Crossing</span>
          </h2>
          <p className="mb-6 font-medium text-black">Create your account</p>

          <form className="space-y-4 text-black" onSubmit={handleSubmit}>

            {/* Role Selection */}
            <div>
              <p className="mb-1 font-semibold">Select Role :</p>
              <div className="flex gap-4 text-sm">

                <label><input type="radio" name='role' className="mr-1" value={'senior'} onChange={(e) => setFormData({ ...formData, role: e.target.value })}/>Senior Citizen</label>
                <label><input type="radio" name='role' className="mr-1" value={'doctor'} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />Doctor</label>
                <label><input type="radio" name='role' className="mr-1" value={'pharmacist'} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />Pharmacist</label>
                <label><input type="radio" name='role' className="mr-1" value={'delivery'} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />Delivery</label>
              </div>
            </div>

            <input
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
            />
            { formData.role === 'senior' && (<input
                                      type="text"
                                      placeholder="DOB (YYYY-MM-DD)"
                                      required
                                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
                                    />)}
            { (formData.role === 'senior' || formData.role === 'pharmacist') && (<input
                                      type="text"
                                      placeholder="Address"
                                      required
                                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
                                    />)}
            { formData.role === 'pharmacist' && (<input
                                      type="text"
                                      placeholder="Pincode"
                                      required
                                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
                                    />)}
            { formData.role === 'pharmacist' && (<input
                                      type="text"
                                      placeholder="Pharmacy Name"
                                      required
                                      onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
                                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
                                    />)}
            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
            />
            { formData.role === 'doctor' && (
              <input
              type="text"
              placeholder="Specialization"
              required
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
            />)}
            { formData.role === 'doctor' && (
              <input
              type="text"
              placeholder="Licence No."
              required
              onChange={(e) => setFormData({ ...formData, licenceNo: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
            />)}
            { formData.role === 'delivery' && (
              <input
              type="text"
              placeholder="Region"
              required
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
            />)}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
                />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <input
              type="password"
              required
              placeholder="Confirm Password"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            
            {formData.password !== formData.confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}


            {/* T&C */}
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 accent-green-600"
                onChange={(e) => setIsAgree(e.target.checked)}
                checked={isAgree}
                title="Agree to the Terms & Conditions"
              />
              <label htmlFor="terms">I Agree To The Terms & Conditions</label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                SIGN UP
              </button>
              <p className="text-center text-sm">
                Already have an account?{' '}
                <a
                  href="/log-in"
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                >
                  LOGIN
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
