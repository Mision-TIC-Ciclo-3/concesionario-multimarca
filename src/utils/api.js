import axios from 'axios';

const executeRequest = async (options, resCallback, errCallback) => {
  await axios.request(options).then(resCallback).catch(errCallback);
};

// CRUD VEHICULOS

export const crearVehiculos = async (data, resCallback, errCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/vehiculos/nuevo/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await executeRequest(options, resCallback, errCallback);
};

export const obtenerVehiculos = async (resCallback, errCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/vehiculos/' };
  await executeRequest(options, resCallback, errCallback);
};

export const actualizarVehiculo = async (id, data, resCallback, errCallback) => {
  const options = {
    method: 'PATCH',
    url: `http://localhost:5000/vehiculos/${id}/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await executeRequest(options, resCallback, errCallback);
};

export const eliminarVehiculo = async (id, resCallback, errCallback) => {
  const options = {
    method: 'DELETE',
    url: `http://localhost:5000/vehiculos/${id}/`,
    headers: { 'Content-Type': 'application/json' },
  };
  await executeRequest(options, resCallback, errCallback);
};

//CRUD USUARIOS

export const obtenerUsuarios = async (resCallback, errCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios/' };
  await executeRequest(options, resCallback, errCallback);
};

// CRUD VENTAS

export const crearVenta = async (data, resCallback, errCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/ventas/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await executeRequest(options, resCallback, errCallback);
};
