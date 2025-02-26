import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formulario } from './components/Formulario'
import { NavBar } from "./components/NavBar";
import './App.css';
import styled from '@emotion/styled';
import { HelmetProvider } from 'react-helmet-async';
import Inicio from './components/Inicio';
import Servicios from './components/Servicios';
import Footer from './components/Footer/Footer';
import {Fade} from 'react-awesome-reveal'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Metodologias from "./components/metodologias";

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(42, 27, 161, 0.1)', // Azul claro
    },
    secondary: {
      main: '#1976d2', // Azul más oscuro para acentos
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeight: 100,
    fontStyle: 'normal',
    fontSize: '15px',
    h6: {
      fontSize: '1.2rem', // Tamaño base aumentado en 2 puntos
      '@media (max-width:600px)': {
        fontSize: '1.1rem', // Tamaño móvil aumentado en 2 puntos
      },
      lineHeight: 1.6,
      marginTop: '1rem',
      marginBottom: '0.5rem'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontSize: '1.2rem',
          '@media (max-width:600px)': {
            fontSize: '1.1rem',
          },
          lineHeight: 1.6
        }
      }
    }
  }
});

const App = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const GridItem = styled.div`
    background-image: url("${process.env.PUBLIC_URL}/images/metodologia-transformed.jpeg");
    background-size: cover;
    background-position: center;
    height: 95%;
    box-shadow: none;
    margin-top: 20px;
    width: 100%;
    @media (max-width: 600px) {
      background-size: contain;
      background-repeat: no-repeat;
      height: 230px;
      width: 100%;
      marginTop: 50px
      box-shadow: none;
    }
    @media (min-width: 601px) and (max-width: 960px) and (orientation: landscape) {
      /* Estilos para tabletas en orientación horizontal */
      height: 400px;
    }
  
    @media (min-width: 961px) and (max-width: 1280px) and (orientation: landscape) {
      /* Estilos para tabletas en orientación horizontal */
      height: 500px;
    }
  
    @media (min-width: 1281px) and (orientation: landscape) {
      /* Estilos para pantallas más grandes en orientación horizontal */
      height: 420px;
    }
  `;

  const GridItemNosotros = styled.div`
    background-image: url('${process.env.PUBLIC_URL}/images/nosotros2.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    box-shadow: none;
    
    @media (max-width: 600px) {
      display: none;
    }
    
    @media (min-width: 601px) {
      height: 250px;
      width: 250px;
      margin-left: auto;
    }
    
    @media (min-width: 961px) {
      height: 300px;
      width: 300px;
      margin-left: auto;
    }
    
    @media (min-width: 1281px) {
      height: 350px;
      width: 350px;
      margin-left: auto;
    }
  `;

  const TextComponent = styled.div`
    fontSize: 20px,
    marginTop: 40px,
    paddingTop: 40px
  `;

  const GridPaper = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    box-shadow: none;
    height: 410px;
    width: 100%;
    position: relative;

    @media (max-width: 600px) {
      height: 150px;
      background-color: #2196F3;
      margin-top: 55px;

      img {
        width: 90%;
        height: 100%;
        object-fit: cover;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  const StyledPaper = styled(Paper)`
    margin-top: 30px;
    padding-top: 20px;
    box-shadow: none;
    @media (max-width: 767px) {
      margin-top: 5px;
      padding: 5px;
      box-shadow: none;
    }
  `;
  const StyledPaper2 = styled(Paper)`
    padding: 0px;
    margin-top: 30px;
    margin-left: 103px;
    margin-right: 0px;
    text-align: center;
    box-shadow: none;
    background-image: url(${process.env.PUBLIC_URL}/images/about-nosotros.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
    position: relative;
    width: 100%;

    @media (max-width: 600px) {
      padding: 10px;
      margin-top: 10px;
      margin-left: 0;
      margin-right: 0;
      box-shadow: none;
      background-image: 
        url(${process.env.PUBLIC_URL}/images/about-nosotros.png),
       
      background-size: cover, contain;
      background-position: center, bottom;
      background-repeat: no-repeat, no-repeat;
    }

    @media (min-width: 601px) and (max-width: 960px) {
      margin-left: 50px;
      margin-right: 50px;
    }

    @media (min-width: 961px) {
      margin-left: 103px;
      margin-right: 10px;
    }

    @media (max-width: 1024px) {
      background-size: contain;
    }

    @media (max-width: 1366px) {
      background-position: 100%;
    }

  `;

  const containerStyles = {
    marginTop: '10px',
    padding: '10px',
  };

  const mobileStyles = {
    marginTop: '5px',
    padding: '3px'
  };

  const GreenIconButton = styled(IconButton)`
    background-color: #4caf50;
    color: #fff !important;
    border-radius: 50%;
    position: fixed;
    bottom: 10px;
    right: 20px;
    z-index: 1000;
  `;

  const handleWhatsAppClick = () => {
    // Aquí puedes agregar la lógica para abrir la ventana de chat de WhatsApp
    // Puedes usar el API de WhatsApp o simplemente redireccionar a la URL de WhatsApp
  };

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <CssBaseline />
            <GreenIconButton
              component="a"
              href="https://wa.link/3311zp"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                position: 'fixed',
                bottom: 10,
                right: 20,
                zIndex: 1000,
                '&:hover': {
                  backgroundColor: '#64dd17',
                }
              }}
            >
              <WhatsAppIcon />
            </GreenIconButton>
            <Container maxWidth="xl" style={{ padding: 0, margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <NavBar />
              <Routes>
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/" element={
                  <>
                    <Paper id="inicio" elevation={3} style={{ textAlign: 'center', boxShadow: 'none' }}>
                      <Inicio id="inicio" />
                    </Paper>
                    <Fade triggerOnce='true'>
                      <Servicios/>
                    </Fade>
                    <Metodologias></Metodologias>
                    <Paper id="nosotros" elevation={3} component="div" style={{ 
                      margin: '20px 0px', 
                      boxShadow: 'none',
                      padding: isMobile ? '1px 15px 15px' : '25px 25px 25px',
                      minHeight: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <Typography variant="h2" style={{ 
                        color: '#444',
                        fontSize: isMobile ? '23px' : '30px',
                        letterSpacing: '4px',
                        marginBottom: '20px',
                        paddingBottom:'15px',
                        fontWeight: 300,
                        lineHeight: isMobile ? '23px' : '28px',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                      }}>
                        Nosotros
                      </Typography>
                      <Container maxWidth="md" style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start' }}>
                        <Fade direction='left' triggerOnce='true' delay={200}>
                          <Grid container spacing={isMobile ? 2 : 6} justifyContent="center" alignItems="flex-start">
                            <Grid item xs={12} md={6}>
                              <Paper style={{ 
                                padding: '10px', 
                                boxShadow: 'none', 
                                textAlign: 'justify',
                                backgroundColor: 'transparent',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                              }}>
                                <Typography style={{
                                  fontFamily: 'Poppins, sans-serif',
                                  fontWeight: 400,
                                  textAlign: 'left',
                                  color: '#777',
                                  fontSize: isMobile ? '14px' : '15px',
                                  letterSpacing: '.03em',
                                  lineHeight: '1.8em',
                                  textTransform: 'capitalize'
                                }}>
                                  En ADA SOFTWARE no trabajamos de manera estandarizada, sino que adaptamos las mejoras a cada organización, según sus necesidades y sus proyecciones. Nuestras soluciones son a medida de cada cliente.

                                  Contamos con años de trayectoria en el mercado que nos permiten analizar, proponer mejoras, resolver problemas y generar cambios superadores desde una mirada experimentada y profesional.

                                  Trabajamos codo a codo con cada cliente para resolver, optimizar y generar nuevos proyectos.

                                  Somos el aliado que tu equipo de trabajo necesita.
                                  Somos ADA SOFTWARE – Fabricamos soluciones.
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                              <GridItemNosotros />
                            </Grid>
                          </Grid>
                        </Fade>
                      </Container>
                    </Paper>
                    <Paper id="contacto" elevation={3} style={{
                      boxShadow: 'none',
                      backgroundImage: `url(${process.env.PUBLIC_URL}/images/Contact.png)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      overflow: 'hidden',
                      position: 'relative',
                      padding: '100px 20px',
                      '@media (max-width: 991px)': {
                        backgroundPosition: '50%',
                      },
                      '@media (max-width: 1024px)': {
                        backgroundSize: 'cover',
                      },
                      '@media (max-width: 576px)': {
                        paddingTop: '50px',
                        paddingBottom: '50px',
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${process.env.PUBLIC_URL}/images/Contact.png)`,
                        backgroundBlendMode: 'overlay',
                      },
                      '@media (max-width: 1199px)': {
                        paddingBottom: '80px',
                        paddingTop: '80px',
                      },
                      display: 'block'
                    }}>
                      <div className="contact-decor" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                        <div className="contact-circle1" style={{
                          bottom: '300px',
                          left: '300px',
                          position: 'absolute',
                          animation: 'moveleftbounce 3s linear infinite',
                          '@media (max-width: 1199px)': {
                            left: '280px',
                            position: 'absolute',
                            top: 'auto',
                          }
                        }}>
                          <img src={`${process.env.PUBLIC_URL}/images/main-banner12.png`} alt="" style={{ verticalAlign: 'middle' }} />
                        </div>
                        <div className="contact-circle2" style={{
                          bottom: '90px',
                          left: '175px',
                          position: 'absolute',
                          animation: 'moveleftbounce 3.9s linear infinite',
                          '@media (max-width: 1024px)': {
                            bottom: '0',
                            left: '10%',
                            top: 'auto',
                          },
                          '@media (max-width: 1199px)': {
                            top: 'auto',
                          }
                        }}>
                          <img src={`${process.env.PUBLIC_URL}/images/main-banner1.png`} alt="" style={{ verticalAlign: 'middle' }} />
                        </div>
                      </div>
                      <Container maxWidth="md" style={{ padding: '20px', position: 'relative', zIndex: 2 }}>
                        <Typography variant="h2" style={{ 
                          color: '#444',
                          fontSize: isMobile ? '23px' : '28px',
                          letterSpacing: '4px',
                          marginBottom: '32px',
                          fontWeight: 300,
                          lineHeight: isMobile ? '23px' : '28px',
                          textTransform: 'uppercase',
                          textAlign: 'center',
                          paddingBottom: '20px'
                        }}>
                          Contacto
                        </Typography>
                        <Formulario></Formulario>
                      </Container>
                      <style>
                        {`
                          img, svg {
                            vertical-align: middle;
                          }
                          img {
                            border-style: none;
                          }
                          @media (max-width: 991px) {
                            #contacto {
                              background-position: 50%;
                            }
                          }
                          @media (max-width: 1024px) {
                            #contacto {
                              background-size: cover;
                            }
                          }
                          #contacto {
                            background-repeat: no-repeat;
                            background-size: cover;
                            overflow: hidden;
                            position: 'relative';
                          }
                          @media (max-width: 576px) {
                            #contacto {
                              padding-bottom: 50px;
                              padding-top: 50px;
                            }
                          }
                          @media (max-width: 1199px) {
                            #contacto {
                              padding-bottom: 80px;
                              padding-top: 80px;
                            }
                          }
                          #contacto {
                            padding-bottom: 100px;
                            padding-top: 100px;
                            position: relative;
                            display: block;
                          }
                          .MuiInputBase-root {
                            background-color: rgba(255, 255, 255, 0.8) !important;
                            z-index: 1;
                          }
                          .MuiInputLabel-root {
                            z-index: 2;
                            background-color: transparent !important;
                          }
                          .MuiInputBase-input::placeholder {
                            opacity: 1 !important;
                            color: rgba(0, 0, 0, 0.6) !important;
                          }
                        `}
                      </style>
                    </Paper>
                    <Footer/>
                  </>
                } />
              </Routes>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;