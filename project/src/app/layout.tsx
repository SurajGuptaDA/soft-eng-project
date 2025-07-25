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
        {/* <Navbar /> */}
        <main className="flex-1 p-6">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

