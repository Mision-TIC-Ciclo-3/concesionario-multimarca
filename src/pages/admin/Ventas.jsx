import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearVenta } from 'utils/api';
import { obtenerVehiculos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [filasTabla, setFilasTabla] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);

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

  const agregarNuevoVehiculo = () => {
    setFilasTabla([...filasTabla, vehiculoSeleccionado]);
    setVehiculos(vehiculos.filter((el) => el !== vehiculoSeleccionado));
    setVehiculoSeleccionado('');
  };

  const deleteFila = (v) => {
    setFilasTabla(filasTabla.filter((el) => el !== v));
    setVehiculos([...vehiculos, v]);
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
          <select
            name='vendedor'
            className='mx-2 p-2 border border-gray-400 rounded-lg focus:outline-none'
            defaultValue=''
            required
          >
            <option disabled value=''>
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return <option key={nanoid()} value={el._id}>{`${el.name} ${el.lastname}`}</option>;
            })}
          </select>
        </label>

        <div className='my-4'>
          <span className='text-2xl font-gray-900'>Vehículos</span>
          <div className='flex'>
            <label className='flex flex-col m-2' htmlFor='vehiculo'>
              <select
                className='p-2 border border-gray-400 rounded-lg focus:outline-none'
                value={vehiculoSeleccionado._id ?? ''}
                onChange={(e) =>
                  setVehiculoSeleccionado(vehiculos.filter((v) => v._id === e.target.value)[0])
                }
                required
              >
                <option disabled value=''>
                  Seleccione un Vehiculo
                </option>
                {vehiculos
                  .filter((el) => !filasTabla.includes(el._id))
                  .map((el) => {
                    return (
                      <option
                        key={nanoid()}
                        value={el._id}
                      >{`${el.brand} ${el.name} ${el.model}`}</option>
                    );
                  })}
              </select>
            </label>
            <button
              type='button'
              onClick={() => {
                agregarNuevoVehiculo(vehiculoSeleccionado);
              }}
              className='m-2  bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
            >
              Agregar Vehículo
            </button>
          </div>
          <table className='tabla'>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filasTabla.map((vehiculo, index) => {
                return (
                  <FilaVehiculo
                    key={nanoid()}
                    nombre={`vehiculo_${index}`}
                    vehiculoSeleccionado={vehiculo}
                    deleteFila={deleteFila}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

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

const FilaVehiculo = ({ nombre, vehiculoSeleccionado, deleteFila }) => {
  return (
    <tr>
      <input hidden value={vehiculoSeleccionado._id} name={nombre} />
      <td>{vehiculoSeleccionado._id ?? ''}</td>
      <td>{vehiculoSeleccionado.name ?? ''}</td>
      <td>{vehiculoSeleccionado.brand ?? ''}</td>
      <td>{vehiculoSeleccionado.model ?? ''}</td>
      <td>
        <i
          onClick={() => deleteFila(vehiculoSeleccionado)}
          className='fas fa-minus cursor-pointer hover:text-red-500'
        />
      </td>
    </tr>
  );
};

export default Ventas;
