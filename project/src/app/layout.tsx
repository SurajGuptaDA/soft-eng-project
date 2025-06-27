// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import logo from '../../public/Screenshot 2025-06-27 194546.png';


export const metadata = {
  title: 'My App',
  description: 'A clean layout with Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="bg-[#4d7cfe] py-4 shadow-md">
      <div className="container mx-auto flex justify-end items-center">
        <img src={logo.src} alt="Logo" className="h-10 mr-auto" />
         {/* Logo on the left side */}
        <ul className="flex gap-12">
          {['Home', 'Features', 'About Us', 'Contact Us', 'Login/Sign Up'].map((item, idx) => (
            <li key={idx}>
              <a
                href="/"
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
