import React from 'react';
import './inicio.css'; // Asegúrate de importar tus estilos CSS

const Inicio = () => {
    const esMobile = window.innerWidth <= 600; // Define tu propia lógica para determinar si es mobile

  return (
    <div className="contenedor-imagen" style={{marginTop: esMobile ? '50px' : '0px', height: '100vh', overflow: 'hidden' }}>
      {/* Imagen de fondo */}
      <img
        className="imagen-fondo"
        src={`${process.env.PUBLIC_URL}/images/portadaoriginal.webp`}
        alt="Descripción de la imagen"
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ajustar la imagen para cubrir completamente el contenedor
            position: 'absolute',
            top: 0,
            left: 0,
          }}
   
      />

      {/* Capa oscura transparente */}
      <div className="capa-oscura"></div>

      {/* Texto superpuesto */}
      <div className="texto-superpuesto">
        <h1> ¡Potencia el crecimiento de tu negocio!</h1>
    <h4>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito! </h4>
      </div>
    </div>
  );
};

export default Inicio;