import React from 'react';
import { Link } from 'react-router-dom';

const Registro = () => {
  return (
    <>
      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Crea tu cuenta</h2>
      <form className='mt-8 space-y-6'>
        <div className='rounded-md shadow-sm grid grid-cols-2 gap-2'>
          <label htmlFor='nombre'>
            Nombre
            <input
              name='nombre'
              type='text'
              autoComplete='email'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Daniel'
            />
          </label>
          <label htmlFor='apellido'>
            Apellido
            <input
              name='apellido'
              type='text'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Saldarriaga'
            />
          </label>
          <label htmlFor='telefono'>
            Teléfono
            <input
              name='telefono'
              type='tel'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='3213213210'
            />
          </label>
          <label htmlFor='nacimiento'>
            Fecha de Nacimiento
            <input
              name='nacimiento'
              type='date'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            />
          </label>
          <label htmlFor='correo'>
            Correo electrónico
            <input
              name='correo'
              type='email'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            />
          </label>
          <label htmlFor='nacimiento'>
            Contraseña
            <input
              name='contraseña'
              type='password'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            />
          </label>
        </div>

        <div>
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
              {/* <LockClosedIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                /> */}
            </span>
            <Link to='/admin'>Regístrate</Link>
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <span>¿Ya tienes cuenta?</span>
          <Link to='/login'>
            <span className='font-medium text-indigo-600 hover:text-indigo-500'>Inicia Sesión</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Registro;
