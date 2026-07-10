"use client";
import Navbar from '../../src/components/layout/Navbar';
import Footer from '../../src/components/layout/Footer';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', paddingTop: '80px', overflow: 'hidden', width: '100%', position: 'relative' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
