import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerVehiculos, crearVehiculo, editarVehiculo, eliminarVehiculo } from 'utils/api';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from 'components/PrivateComponent';

const Vehiculos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Vehículo');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehiculos = async () => {
      setLoading(true);
      await obtenerVehiculos(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setVehiculos(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error('Salio un error:', error);
          setLoading(false);
        }
      );
    };
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchVehiculos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Vehículo');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los vehículos');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de vehículos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>

      {mostrarTabla ? (
        <TablaVehiculos
          loading={loading}
          listaVehiculos={vehiculos}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <FormularioCreacionVehiculos
          setMostrarTabla={setMostrarTabla}
          listaVehiculos={vehiculos}
          setVehiculos={setVehiculos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaVehiculos = ({ loading, listaVehiculos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState(listaVehiculos);

  useEffect(() => {
    setVehiculosFiltrados(
      listaVehiculos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVehiculos]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los vehículos</h2>
      <div className='hidden md:flex w-full'>
        {loading ? (
          <ReactLoading type='cylon' color='#abc123' height={667} width={375} />
        ) : (
          <table className='tabla'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre del vehículo</th>
                <th>Marca del vehículo</th>
                <th>Modelo del vehículo</th>
                <PrivateComponent roleList={['admin']}>
                  <th>Acciones</th>
                </PrivateComponent>
              </tr>
            </thead>
            <tbody>
              {vehiculosFiltrados.map((vehiculo) => {
                return (
                  <FilaVehiculo
                    key={nanoid()}
                    vehiculo={vehiculo}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {vehiculosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.name}</span>
              <span>{el.brand}</span>
              <span>{el.model}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVehiculo = ({ vehiculo, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState({
    _id: vehiculo._id,
    name: vehiculo.name,
    brand: vehiculo.brand,
    model: vehiculo.model,
  });

  const actualizarVehiculo = async () => {
    //enviar la info al backend

    await editarVehiculo(
      vehiculo._id,
      {
        name: infoNuevoVehiculo.name,
        brand: infoNuevoVehiculo.brand,
        model: infoNuevoVehiculo.model,
      },
      (response) => {
        console.log(response.data);
        toast.success('Vehículo modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el vehículo');
        console.error(error);
      }
    );
  };

  const deleteVehicle = async () => {
    await eliminarVehiculo(
      vehiculo._id,
      (response) => {
        console.log(response.data);
        toast.success('vehículo eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el vehículo');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoVehiculo._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoVehiculo.name}
              onChange={(e) => setInfoNuevoVehiculo({ ...infoNuevoVehiculo, name: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoVehiculo.brand}
              onChange={(e) =>
                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, brand: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoVehiculo.model}
              onChange={(e) =>
                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, model: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{vehiculo._id.slice(20)}</td>
          <td>{vehiculo.name}</td>
          <td>{vehiculo.brand}</td>
          <td>{vehiculo.model}</td>
        </>
      )}

      <PrivateComponent roleList={['admin']}>
        <td>
          <div className='flex w-full justify-around'>
            {edit ? (
              <>
                <Tooltip title='Confirmar Edición' arrow>
                  <i
                    onClick={() => actualizarVehiculo()}
                    className='fas fa-check text-green-700 hover:text-green-500'
                  />
                </Tooltip>
                <Tooltip title='Cancelar edición' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Editar Vehículo' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
                <Tooltip title='Eliminar Vehículo' arrow>
                  <i
                    onClick={() => setOpenDialog(true)}
                    className='fas fa-trash text-red-700 hover:text-red-500'
                  />
                </Tooltip>
              </>
            )}
          </div>

          <Dialog open={openDialog}>
            <div className='p-8 flex flex-col'>
              <h1 className='text-gray-900 text-2xl font-bold'>
                ¿Está seguro de querer eliminar el vehículo?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => deleteVehicle()}
                  className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                >
                  No
                </button>
              </div>
            </div>
          </Dialog>
        </td>
      </PrivateComponent>
    </tr>
  );
};

const FormularioCreacionVehiculos = ({ setMostrarTabla, listaVehiculos, setVehiculos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoVehiculo = {};
    fd.forEach((value, key) => {
      nuevoVehiculo[key] = value;
    });

    await crearVehiculo(
      {
        name: nuevoVehiculo.name,
        brand: nuevoVehiculo.brand,
        model: nuevoVehiculo.model,
      },
      (response) => {
        console.log(response.data);
        toast.success('Vehículo agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un vehículo');
      }
    );

    // const options = {
    //   method: 'POST',
    //   url: 'http://localhost:5000/vehiculos/nuevo/',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: { name: nuevoVehiculo.name, brand: nuevoVehiculo.brand, model: nuevoVehiculo.model },
    // };

    // await axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     toast.success('Vehículo agregado con éxito');
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //     toast.error('Error creando un vehículo');
    //   });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo vehículo</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del vehículo
          <input
            name='name'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Corolla'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Marca del vehículo
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='brand'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Renault</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Mazda</option>
            <option>Chevrolet</option>
          </select>
        </label>
        <label className='flex flex-col' htmlFor='modelo'>
          Modelo del vehículo
          <input
            name='model'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1992}
            max={2022}
            placeholder='2014'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar vehiculo
        </button>
      </form>
    </div>
  );
};

export default Vehiculos;
