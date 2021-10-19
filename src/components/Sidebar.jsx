import React, { useEffect } from 'react';
import ImagenLogo from './ImagenLogo';
import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';
import { useAuth0 } from '@auth0/auth0-react';
import PrivateComponent from './PrivateComponent';

const Sidebar = () => {
  const { user, logout } = useAuth0();

  const cerrarSesion = () => {
    logout({ returnTo: 'https://enigmatic-shelf-42481.herokuapp.com/admin' });
    localStorage.setItem('token', null);
  };

  return (
    <nav className='hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar'>
      <Link to='/admin'>
        <ImagenLogo />
      </Link>

      <div className='my-4'>
        <Ruta icono='fas fa-user' ruta='/admin/perfil' nombre='Perfil' usuario={user} />
        <PrivateComponent roleList={['admin']}>
          <Ruta icono='fas fa-car' ruta='/admin/vehiculos' nombre='Vehículos' />
        </PrivateComponent>
        <PrivateComponent roleList={['admin', 'vendedor']}>
          <Ruta icono='fas fa-cash-register' ruta='/admin/ventas' nombre='Ventas' />
        </PrivateComponent>
        <PrivateComponent roleList={['admin']}>
          <Ruta icono='fas fa-users' ruta='/admin/usuarios' nombre='Usuarios' />
        </PrivateComponent>
      </div>
      <button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre, usuario }) => {
  console.log('usuario', usuario);
  const isActive = useActiveRoute(ruta);
  return (
    <Link to={ruta}>
      <button
        className={`p-1 my-2  bg-${
          isActive ? 'indigo' : 'gray'
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        {usuario ? (
          <>
            <img src={usuario.picture} className='h-5 w-5 rounded-full' />
            {usuario.name}
          </>
        ) : (
          <>
            <i className={`${icono} w-10`} />
            {nombre}
          </>
        )}
      </button>
    </Link>
  );
};

export default Sidebar;
