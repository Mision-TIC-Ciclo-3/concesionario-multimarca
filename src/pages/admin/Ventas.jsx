import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearVenta } from 'utils/api';
import { obtenerVehiculos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuarios(
        (response) => {
          console.log('respuesta de usuarios', response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchVehiculos = async () => {
      await obtenerVehiculos(
        (response) => {
          setVehiculos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchVehiculos();
  }, []);

  useEffect(() => {
    console.log('vehiculos seleccionados', vehiculosSeleccionados);
  }, [vehiculosSeleccionados]);

  const agregarNuevoVehiculo = () => {
    setVehiculosSeleccionados([...vehiculosSeleccionados, DropDownVehiculos]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log('form data', formData);

    // const infoConsolidada = {
    //   valor: formData.valor,
    //   vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
    //   vehiculo: vehiculos.filter((v) => v._id === formData.vehiculo)[0],
    // };

    // console.log(infoConsolidada);

    // await crearVenta(
    //   infoConsolidada,
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <form ref={form} onSubmit={submitForm} className='flex flex-col h-full'>
        <h1 className='text-3xl font-extrabold text-gray-900 my-3'>Crear una nueva venta</h1>
        <label className='flex flex-col' htmlFor='vendedor'>
          <span className='text-2xl font-gray-900'>Vendedor</span>
          <select name='vendedor' className='p-2' defaultValue='' required>
            <option disabled value=''>
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return <option key={nanoid()} value={el._id}>{`${el.name} ${el.lastname}`}</option>;
            })}
          </select>
        </label>
        <div className='flex flex-col'>
          <span>Seleccion de Vehiculos</span>
          <button
            type='button'
            onClick={() => agregarNuevoVehiculo()}
            className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
          >
            agregar nuevo vehiculo
          </button>
        </div>

        {vehiculosSeleccionados.map((DropDownVehiculo, index) => {
          return (
            <div className='flex'>
              <DropDownVehiculo key={nanoid()} vehiculos={vehiculos} nombre={`vehiculo_${index}`} />
            </div>
          );
        })}

        <label className='flex flex-col'>
          <span className='text-2xl font-gray-900'>Valor Total Venta</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            name='valor'
            required
          />
        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Crear Venta
        </button>
      </form>
    </div>
  );
};

const DropDownVehiculos = ({ vehiculos, nombre }) => {
  return (
    <label className='flex flex-col' htmlFor='vehiculo'>
      <span className='text-2xl font-gray-900'>Vehiculo</span>
      <select name={nombre} className='p-2' defaultValue={-1}>
        <option disabled value={-1}>
          Seleccione un Vehiculo
        </option>
        {vehiculos.map((el) => {
          return (
            <option key={nanoid()} value={el._id}>{`${el.name} ${el.brand} ${el.model}`}</option>
          );
        })}
      </select>
    </label>
  );
};

export default Ventas;
