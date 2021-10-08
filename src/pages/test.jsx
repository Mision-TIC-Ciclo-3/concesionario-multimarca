import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { obtenerUsuarios } from 'utils/api';
import { obtenerVehiculos } from 'utils/api';

const Test = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const form = useRef(null);

  useEffect(() => {
    obtenerVehiculos(setVehiculos);
    obtenerUsuarios(setUsuarios);
  }, []);

  useEffect(() => {
    console.log(vehiculos);
  }, [vehiculos]);

  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    const informacionConsolidada = {
      valor: nuevaVenta.cantidadVenta,
      vehiculo: vehiculos.filter((el) => el._id === nuevaVenta.vehiculo)[0],
      vendedor: usuarios.filter((el) => el._id === nuevaVenta.vendedor)[0],
    };
    console.log(informacionConsolidada);

    const options = {
      method: 'POST',
      url: 'http://localhost:5000/ventas/',
      headers: { 'Content-Type': 'application/json' },
      data: informacionConsolidada,
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        // toast.success('Vehículo agregado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        // toast.error('Error creando un vehículo');
      });
  };

  return (
    <div>
      Crear nueva venta
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label>
          Seleccionar Vehiculo
          <select name='vendedor'>
            {usuarios.map((u) => {
              return (
                <option key={nanoid()} value={u._id}>
                  {u.email}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Seleccionar Vehiculo
          <select name='vehiculo'>
            {vehiculos.map((v) => {
              return (
                <option value={v._id} key={nanoid()}>
                  {v.name}
                </option>
              );
            })}
          </select>
        </label>
        <input type='number' name='cantidadVenta' />
        <button type='submit'>Enviar venta</button>
      </form>
    </div>
  );
};

export default Test;
