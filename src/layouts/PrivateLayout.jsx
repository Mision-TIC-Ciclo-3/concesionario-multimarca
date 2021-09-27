import React from 'react';
import Sidebar from 'components/Sidebar';

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default PrivateLayout;
