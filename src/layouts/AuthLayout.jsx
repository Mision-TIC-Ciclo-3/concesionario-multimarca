import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-50 py-2 px-4'>
      Layout autenticacion
      <div className='flex w-full'>{children}</div>
    </div>
  );
};

export default AuthLayout;
