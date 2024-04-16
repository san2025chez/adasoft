import React from 'react';
import { Grid, Paper } from '@mui/material';
import {Fade} from 'react-awesome-reveal'
import './inicio.css'
import { yellow } from '@mui/material/colors';

const Inicio = () => {
  return (
    <div className="contenedor-imagen">
    <Grid container spacing={2}   alignItems="center">
      {/* Primera división con grid */}
      <Grid item xs={12} md={6} className='centrado' style={{}}>
        <div>
      <Fade direction='down'>

              <h1> ¡Potencia el crecimiento de tu negocio!</h1>
              </Fade>
              <Fade direction='up'>
              <h4>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito! </h4>
              </Fade>
              </div>
      </Grid>
      
      {/* Segunda división con grid */}
      <Grid item xs={12} md={6}>
               <img src={`${process.env.PUBLIC_URL}/images/transparent.png`} alt="Imagen" style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
    </Grid>
    </div>);
};

export default Inicio;
