import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div>
      <div className='text-9xl text-red-500 '>No estas autorizado para ver este sitio.</div>
      <Link to='/'>
        <span className='text-blue-500 font-bold'>Llévame al home</span>
      </Link>
    </div>
  );
};

export default PrivateRoute;
