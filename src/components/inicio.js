import React, { useState } from 'react';
import './inicio.css'; // Asegúrate de importar tus estilos CSS
import CustomSpinner from './CustomSpinner';
import { NavBar } from './NavBar';

const Inicio = () => {
  const [imagenCargada, setImagenCargada] = useState(false);
  const esMobile = window.innerWidth <= 600; // Define tu propia lógica para determinar si es mobile

  const handleImagenCargada = () => {
    // Se llama cuando la imagen se ha cargado completamente
    setImagenCargada(true);
  };

  return (
    <div className="contenedor-imagen" >
      {/* Spinner mientras se carga la imagen */}
      {!imagenCargada && <div className="spinner"><CustomSpinner/></div>}

      {/* Imagen de fondo */}
      <img
        className={`imagen-fondo ${imagenCargada ? 'visible' : 'oculto'}`}
        src={`${process.env.PUBLIC_URL}/images/portadaoriginal.webp`}
        alt="Descripción de la imagen"
      
        onLoad={handleImagenCargada} // Manejar el evento de carga de la imagen
      />
 
      {/* Capa oscura transparente */}
    <div className="capa-oscura"></div>

   
      <div className={`texto-superpuesto ${imagenCargada ? 'visible' : 'oculto'}`}>
        <h1> ¡Potencia el crecimiento de tu negocio!</h1>
        <h4>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito! </h4>
      </div>  
    </div>
  );
};

export default Inicio;
