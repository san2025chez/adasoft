import React, { useEffect, useState } from 'react';
import './inicio.css'; // Asegúrate de importar tus estilos CSS
import CustomSpinner from './CustomSpinner';
import { NavBar } from './NavBar';

const Inicio = () => {
  const [imagenCargada, setImagenCargada] = useState(false);
  const [cargandoImagen, setCargandoImagen] = useState(true);
  const [imagen, setImagen] = useState('');

  const esMobile = window.innerWidth <= 600; // Define tu propia lógica para determinar si es mobile

  useEffect(() => {
    setImagen(`${process.env.PUBLIC_URL}/images/portadaoriginal.webp`);
  }, []); // Dependencias vacías, ejecutar solo una vez al montar el componente

  return (
    <div className="contenedor-imagen">
      {!imagenCargada && <div className="spinner"><CustomSpinner /></div>}

      {imagen && (
        <>
          {/* Imagen de fondo */}
          <img
            className={`imagen-fondo ${imagenCargada ? 'visible' : 'oculto'}`}
            src={imagen}
            alt="imagen"
            onLoad={() => setImagenCargada(true)} // Manejar el evento de carga de la imagen
          />

          {/* Capa oscura transparente */}
          {imagenCargada && <div className="capa-oscura"></div>}

          <div className={`texto-superpuesto ${imagenCargada ? 'visible' : 'oculto'}`}>
            <h1> ¡Potencia el crecimiento de tu negocio!</h1>
            <h4>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito! </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Inicio;
