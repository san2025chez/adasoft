import React, { useEffect, useRef, useState } from 'react';
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
import keyframes from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fade } from 'react-awesome-reveal'

const rollInRight = keyframes`
0% {
  -webkit-transform: translateX(1000px);
          transform: translateX(1000px);
  opacity: 0;
}
100% {
  -webkit-transform: translateX(0);
          transform: translateX(0);
  opacity: 1;
}`


const services = [
  {
    "id": "1",
    "description": ""
  }
]
const Servicios = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-50px 0px',
  });

  const [roll, setRoll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if the component is in view and has not already rolled in
      if (inView && !roll) {
        setRoll(true);
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inView, roll]);


  return (
    <Paper
      id="servicios"
      elevation={3}
      style={{
        padding: '20px 10px', margin: '20px 20px 20px ', textAlign: 'center', boxShadow: 'none',
        animation: roll ? `${rollInRight} 0.6s ease-out both` : 'none'
      }}

    >
      <Container maxWidth="lg" >
        <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', color:'black', padding: '15px' }}>
          Servicios
        </Typography>

        <Grid container spacing={4} justifyContent="center" >
          <Grid item xs={12} md={3} >
            <Fade direction='left' triggerOnce='true'>
              <Card variant="outlined" style={{ borderRadius: "15px" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}> Landing Page</Typography>
                  <Typography style={{ textAlign: 'center'}}>
                    Desarrollamos Landing Pages personalizadas que se ajustan perfectamente a las necesidades de tu negocio.
                    Creamos un diseño cautivador que no solo transmite tu mensaje de manera impactante,
                    sino que también convierte visitas en valiosos clientes potenciales.
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Desarrollo de Aplicaciones Web</Typography>
                  <Typography style={{ textAlign: 'center' }}>
                    Desarrollamos aplicaciones web a medida,
                    ayudándote a construir la web que realmente deseas y que mejor se adapte a tus necesidades.
                    Juntos, convertiremos tus ideas en una realidad digital que te beneficie al máximo.
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='left' triggerOnce='true'>
              <Card variant="outlined" style={{ borderRadius: "15px" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Tiendas Online</Typography>
                  <Typography style={{ textAlign: 'center'}}>
                    Creamos tiendas online personalizadas, con un diseño atractivo y funcionalidades
                    que te ayudarán a vender tus productos de forma efectiva.
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Mantenimiento</Typography>
                  <Typography style={{ textAlign: 'center' }}>
                    Ofrecemos un servicio completo de mantenimiento para asegurarnos de que tu presencia en línea esté siempre actualizada, segura y en su mejor forma.
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

        </Grid>

      </Container>
    </Paper>
  );
};
export default Servicios;
