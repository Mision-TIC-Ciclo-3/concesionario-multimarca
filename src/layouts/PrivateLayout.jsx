import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';
import SidebarResponsive from 'components/SidebarResponsive';
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/user';

const PrivateLayout = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const { setUserData } = useUser();
  useEffect(() => {
    const fetchAuth0Token = async () => {
      setLoading(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-autenticacion-concesionario-mintic`,
      });
      localStorage.setItem('token', accessToken);
      console.log(accessToken);
      await obtenerDatosUsuario(
        (res) => {
          console.log(res);
          setUserData(res.data);
          setLoading(false);
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
      );
    };

    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently, setUserData]);

  if (isLoading || loading)
    return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

  if (!isAuthenticated) {
    return loginWithRedirect();
  }
  return (
    <div className='flex w-screen h-screen'>
      <div className='flex flex-col lg:flex-row flex-nowrap h-full w-full'>
        <Sidebar />
        <SidebarResponsive />
        <main className='flex w-full  overflow-y-scroll items-center justify-center'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
