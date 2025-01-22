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
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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

const StyledDescription = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  text-align: left;
  color: #777;
  font-size: 15px;
  letter-spacing: .03em;
  line-height: 1.8em;
  text-transform: capitalize;
`;

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Typography variant="h2" style={{
          color: '#444',
          fontSize: isMobile ? '23px' : '30px',
          letterSpacing: '4px',
          marginBottom: '32px',
          fontWeight: 300,
          lineHeight: isMobile ? '23px' : '28px',
          textTransform: 'uppercase',
          padding: '15px'
        }}>
          Servicios
        </Typography>

        <Grid container spacing={4} justifyContent="center" >
          <Grid item xs={12} md={3} >
            <Fade direction='left' triggerOnce='true'>
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}> Landing Page</Typography>
                  <StyledDescription style={{ textAlign: 'center'}}>
                    Desarrollamos Landing Pages personalizadas que se ajustan perfectamente a las necesidades de tu negocio.
                    Creamos un diseño cautivador que no solo transmite tu mensaje de manera impactante,
                    sino que también convierte visitas en valiosos clientes potenciales.
                  </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Desarrollo de Aplicaciones Web</Typography>
                  <StyledDescription style={{ textAlign: 'center' }}>
                    Desarrollamos aplicaciones web a medida,
                    ayudándote a construir la web que realmente deseas y que mejor se adapte a tus necesidades.
                    Juntos, convertiremos tus ideas en una realidad digital que te beneficie al máximo.
                  </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='left' triggerOnce='true'>
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Tiendas Online</Typography>
                  <StyledDescription style={{ textAlign: 'center'}}>
                    Creamos tiendas online personalizadas, con un diseño atractivo y funcionalidades
                    que te ayudarán a vender tus productos de forma efectiva.
                  </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Mantenimiento</Typography>
                  <StyledDescription style={{ textAlign: 'center' }}>
                    Ofrecemos un servicio completo de mantenimiento para asegurarnos de que tu presencia en línea esté siempre actualizada, segura y en su mejor forma.
                  </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Desarrollo de Software a Medida</Typography>
                  <StyledDescription style={{ textAlign: 'center' }}>
                  Realizamos software a medida que se adapta perfectamente a tus requerimientos específicos, ofreciendo soluciones personalizadas que optimizan tus procesos y mejoran la eficiencia de tu negocio.
                  </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Clases de Informatica y Programacion </Typography>
                  <StyledDescription style={{ textAlign: 'center' }}>
                 Aprende Informatica de forma sencilla y divertida con nuestros cursos
                  de Informatica y programacion. 
                 Adaptamos nuestro plan personalizado para tu aprendizaje           </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Consultoría en Arquitectura de Software</Typography>
                  <StyledDescription style={{ textAlign: 'center' }}>
                  Ofrecemos asesoramiento experto para diseñar arquitecturas de software robustas y escalables que satisfagan tus necesidades actuales y futuras.
                  </StyledDescription>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <Fade direction='right' triggerOnce='true' >
              <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                <CardContent>
                  <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>Clases de Informatica y Programación</Typography>
                  <StyledDescription style={{ textAlign: 'center' }}>
                  Aprende a tu propio ritmo y con un enfoque adaptado a tus necesidades. Dominarás los conceptos clave y desarrollarás proyectos práctico</StyledDescription>
                </CardContent>
              </Card>
            </Fade> */}
          </Grid>
        </Grid>

      </Container>
    </Paper>
  );
};
export default Servicios;
