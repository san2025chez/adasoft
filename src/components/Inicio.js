import React from 'react';
import { Grid, Button } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import './inicio.css';

const Inicio = () => {
  return (
    <div className="contenedor-imagen">
      <Grid container spacing={2} alignItems="center">
        {/* Primera división con grid */}
        <Grid item xs={12} md={6} className='centrado' style={{ fontWeight: 500, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
          <div>
            <Fade direction='down' triggerOnce='true' style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase' }}>
              <h2>¡Potencia el crecimiento de tu negocio!</h2>
            </Fade>
            <Fade direction='up' triggerOnce='true'>
              <p>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito!</p>
            </Fade>
            {/* Contenedor adicional para el botón */}
          
          </div>
        </Grid>

        {/* Segunda división con grid para la imagen */}
        <Grid
          item
          xs={12}
          md={6}
          sx={(theme) => ({
            paddingLeft: '15px',
            paddingRight: '15px',
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: {
              xs: '20px',  // Ajuste para pantallas pequeñas (móviles)
              sm: '30px',  // Ajuste para pantallas medianas (tabletas)
              md: '0px'  // Ajuste para pantallas grandes (escritorio)
            },
            marginTop: {
              xs: '85px',  // Ajuste para pantallas pequeñas (móviles)
              sm: '30px',  // Ajuste para pantallas medianas (tabletas)
              md: '170px'  // Ajuste para pantallas grandes (escritorio)
            },
          })}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/imageSOFT.png`}
            alt="Imagen"
            style={{ maxWidth: '70%', height: 'auto', marginBottom: '20px' }} // Espacio entre la imagen y el botón
          />
          {/* Botón visible solo en pantallas móviles */}
        
        </Grid>
      </Grid>
    </div>
  );
};

export default Inicio;
