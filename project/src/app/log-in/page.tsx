import logo from '../../../public/Screenshot 2025-06-27 194546.png';
function Navbar() {
  return (
    <nav className="bg-[#4d7cfe] py-4 shadow-md">
      <div className="container mx-auto flex justify-end items-center">
        <img src={logo.src} alt="Logo" className="h-10 mr-auto" />
         {/* Logo on the left side */}
        <ul className="flex gap-12">
          {['Home', 'Features', 'About Us', 'Contact Us', 'Sign Up'].map((item, idx) => (
            <li key={idx}>
              <a
                href={
                  item === 'Home' ? '/' : item === 'Features' ? '/features' : item === 'About Us' ? '/about' : item === 'Contact Us' ? '/contact' : '/sign-up'
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


export default function LoginPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center">
          <img
            src="data:image/jpeg;base64,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"
            alt="Login Illustration"
            className="w-80 md:w-96"
          />
        </div>

        {/* Right Form */}
        <div className="text-black">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-2">
            Welcome Back to <span className="block font-bold">Sandpiper Crossing</span>
          </h2>
          <p className="mb-6 font-medium">Log In to Your Account</p>

          <form className="space-y-4">
            {/* Email */}
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-2">
              <span className="mr-2 text-blue-600 text-xl">📧</span>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-2">
              <span className="mr-2 text-blue-600 text-xl">🔒</span>
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-1">
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              LOGIN
            </button>

            {/* Sign up */}
            <p className="text-center text-sm mt-4">
              Don’t have an account?
            </p>
            <a
              href="/sign-up"
              className="bg-blue-600 text-white w-full block text-center py-2 rounded hover:bg-blue-700"
            >
              SIGN UP
            </a>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
