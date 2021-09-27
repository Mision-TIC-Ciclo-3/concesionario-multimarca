import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='h-full overflow-y-scroll bg-blue-400'>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
