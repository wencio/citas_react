import React from 'react'
import {useState,useEffect} from 'react'
import Error from './Error'
import Paciente from './Paciente'

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
// Utilizo los hooks para tener el estado y el set* para cambiar el valor, uso destructuracion
// para tener los valores al principio el estado esta en string vacio
const [nombre,setNombre] = useState('');
const [propietario,setPropietario] = useState('');
const [email,setEmail] = useState('');
const [fecha,setFecha] = useState('');
const [sintomas,setSintomas] = useState('');

const [error,setError] = useState(false);

useEffect(()=>{
  if(Object.keys(paciente).length > 0){
    setNombre(paciente.nombre)
    setPropietario(paciente.propietario)
    setEmail(paciente.email)
    setFecha(paciente.fecha) 
    setSintomas (paciente.sintomas)
  }
 
},[paciente])

// utilizo esta funcion para generar un ID unico
const generarId = () =>{
  const random = Math.random().toString(36).substr(2);
  const fecha = Date.now().toString(36);
  return random + fecha ;
}

// voy a utiizar esta funcion para hacer las validaciones / e 
/**
 * 
 * @param {e} e es el valor que tiene el evento que estamos manejando/ en este caso onChain
 */
const handleSubmit = (e) => {
  e.preventDefault();

  // Validando el formulario 

  if([nombre,propietario,email,fecha,sintomas].includes('')){
    console.log ('Hay al menos un campo vacio');
    setError(true);
    return;
    // este setError luego lo utilizamos dentro del tag forma 
  }
  setError(false);
  // Objeto de Paciente
  const objetoPaciente ={
    nombre,
    propietario,
    email,
    fecha,
    sintomas,
    

  };
  
  if(paciente.id){
    //console.log('Editando')editamos un registro ya existente
    objetoPaciente.id = paciente.id
    const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id===
      paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})

  } else {
    //console.log('Nuevo Registro') generamos un nuevo registro y generamos un nuevo ID.
    objetoPaciente.id = generarId();
    setPacientes([...pacientes,objetoPaciente]);
  }
// ojo aka estoy creando pacientes nuevos sin modificar el arreglo original 
// no puedo utilizar push porque este modifica el arreglo original
  //setPacientes([...pacientes,objetoPaciente]);
      
  console.log(pacientes);
  // Reiniciar el Form 
  setNombre('');
  setPropietario('');
  setEmail('');
  setFecha('');
  setSintomas ('');

}


  return (
    <div className = "className = md:w-1/2 lg:w-2/5" >
        <h2 className="font-black text-2xl text-center">Seguimiento Paciente</h2>
        <p className="text-lg mt-5 text-center mb-10 ">
          Anade Pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form  onSubmit = {handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 
        px-5 border-4 mb-10" >
          {error && <Error><p>Todos los campos son obligatorios</p> </Error> }
          <div className ="mb-5">
            <label htmlFor="mascota"className="block text-gray-700 uppercase font-bold">Nombre Mascota
            </label>
            <input id="mascota" type="text" placeholder="Nombre de la Mascota" className ="border-4 w-full
            p-2 mt-2 placeholder-gray-400 rounded-md"
            value ={nombre}
            onChange ={ (e) => setNombre(e.target.value)}
            />
          </div>
          <div className ="mb-5">
            <label htmlFor="propietario"className="block text-gray-700 uppercase font-bold">Propietario
            </label>
            <input id="propietario" type="text" placeholder="Nombre del propietario" className ="border-4 w-full
            p-2 mt-2 placeholder-gray-400 rounded-md"
            value ={propietario}
            onChange ={ (e) => setPropietario(e.target.value)}/>
          </div>
          <div className ="mb-5">
            <label htmlFor="email"className="block text-gray-700 uppercase font-bold">email 
            </label>
            <input id="email" type="email" placeholder="Email Contacto Propietario" className ="border-4 w-full
            p-2 mt-2 placeholder-gray-400 rounded-md"
            value ={email}
            onChange ={ (e) => setEmail(e.target.value)}/>
          </div>
          <div className ="mb-5">
            <label htmlFor="alta"className="block text-gray-700 uppercase font-bold">Alta
            </label>
            <input id="alta" type="date" 
            className ="border-4 w-full
            p-2 mt-2 placeholder-gray-400 rounded-md"
            value ={fecha}
            onChange ={ (e) => setFecha(e.target.value)}/>
          </div>
          <div className ="mb-5">
            <label htmlFor="sintomas"className="block text-gray-700 uppercase font-bold">Sintomas 
            </label>
            <input id="sintomas" 
            type="texto" 
            className ="border-4 w-full
            p-2 mt-2 placeholder-gray-400 rounded-md"
            value ={sintomas}
            onChange ={ (e) => setSintomas(e.target.value)}/>
          </div>
          <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase 
          font-bold hover:bg-indigo-800 cursor-pointer transition-all" 
          value={ paciente.id ? 'Editar Paciente': 'Agregar Paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario


