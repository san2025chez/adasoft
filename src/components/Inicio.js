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
      <Grid item xs={12} md={6} className='centrado' style={{fontWeight: 500,color: '#fff' }}>
        <div>
      <Fade direction='down' triggerOnce='true'>
   
              <h1> ¡Potencia el crecimiento de tu negocio!</h1>
              </Fade>
              <Fade direction='up' triggerOnce='true'>
              <h3>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito! </h3>
              </Fade>
              </div>
      </Grid>
      
      {/* Segunda división con grid */}
      <Grid
    item
    xs={12}
    md={6}
    sx={(theme) => ({
      paddingLeft: '15px',
      paddingRight: '15px',
      position: 'relative',
      width: '100%',
      paddingTop: theme.breakpoints.up('md') ? '100px' : '50px',
    })}
  >
    <img src={`${process.env.PUBLIC_URL}/images/imageSOFT.png`} alt="Imagen" style={{ maxWidth: '70%', height: 'auto', paddingTop:'150px'}} />
  </Grid>

    </Grid>
    </div>);
};

export default Inicio;
