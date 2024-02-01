import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './Servicios.css';

const Servicios = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-50px 0px', // Ajusta el margen según tus necesidades
  });

  return (
    <Paper
      id="servicios"
      elevation={3}
      style={{ padding: '20px', margin: '20px 20px 20px', textAlign: 'center', boxShadow: 'none' }}
      ref={ref}
    >
      <Container maxWidth="md">
        <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', color: '#1976d2' , padding:'10px'}}>
          Servicios
        </Typography>
        <Grid container spacing={2} justifyContent="center" >
          <Grid item xs={12} md={3} >
            <Paper className={`transicion-texto ${inView ? 'aparecer' : ''}`} style={{ boxShadow: 'none' }}>
              <Typography variant="h5" style={{paddingBottom:'10px', textAlign: 'center'}}> Landing Page</Typography>
              <Typography style={{ textAlign: 'center',fontSize: '15px'  }}>
              Desarrollamos Landing Pages personalizadas que se ajustan perfectamente a las necesidades de tu negocio.
            Creamos un diseño cautivador que no solo transmite tu mensaje de manera impactante,
               sino que también convierte visitas en valiosos clientes potenciales.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={`transicion-texto ${inView ? 'aparecer' : ''}` } style={{ boxShadow: 'none' }}>
              <Typography variant="h5" style={{paddingBottom:'10px', textAlign: 'center'}}>Desarrolo de Apliaciones Web</Typography>
              <Typography  style={{ textAlign: 'center'  ,fontSize: '15px' }}>
              Desarrollamos aplicaciones web a medida,
                ayudándote a construir la web que realmente deseas y que mejor se adapte a tus necesidades.
                Juntos, convertiremos tus ideas en una realidad digital que te beneficie al máximo.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={`transicion-texto ${inView ? 'aparecer' : ''}`} style={{ boxShadow: 'none' }}>
              <Typography variant="h5" style={{paddingBottom:'10px', textAlign: 'center'}}>Tiendas Online</Typography>
              <Typography style={{ textAlign: 'center',fontSize: '15px'  }}>
                Creamos tiendas online personalizadas, con un diseño atractivo y funcionalidades
                que te ayudarán a vender tus productos de forma efectiva.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={`transicion-texto ${inView ? 'aparecer' : ''}` }  style={{ boxShadow: 'none' }}>
              <Typography variant="h5" style={{paddingBottom:'10px', textAlign: 'center'}}>Mantenimiento</Typography>
              <Typography  style={{ textAlign: 'center' ,fontSize: '15px' }}>
                Ofrecemos un servicio completo de mantenimiento para asegurarnos de que tu presencia en línea esté siempre actualizada, segura y en su mejor forma.
              </Typography>
            </Paper>
          </Grid>
         
        </Grid>
      </Container>
    </Paper>
  );
};
export default Servicios;
