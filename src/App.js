import React, { Suspense, lazy, useRef, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formulario } from './components/Formulario'
import { NavBar } from "./components/NavBar";
import SectionTitle from './components/SectionTitle';
import theme from './theme';
import './App.css';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import {Fade} from 'react-awesome-reveal'
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Carga diferida de páginas principales
const Inicio = lazy(() => import('./components/Inicio'));
const Servicios = lazy(() => import('./components/Servicios'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Metodologias = lazy(() => import('./components/metodologias'));

const moveLeftBounce = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-16px); }
  100% { transform: translateY(0px); }
`;

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sectionRefs = {
    inicio: useRef(null),
    servicios: useRef(null),
    metodologia: useRef(null),
    nosotros: useRef(null),
    contacto: useRef(null),
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      // Using a small timeout to ensure the component has rendered.
      const timer = setTimeout(() => {
        const ref = sectionRefs[location.state.scrollTo];
        if (ref && ref.current) {
          const offset = 60; // Navbar height
          const elementPosition = ref.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          // Clean up state after scrolling to prevent re-triggering.
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100);
      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [location, navigate, sectionRefs]);

  const GridItemNosotros = styled.div`
    background-image: url(${process.env.PUBLIC_URL}/images/nosotros2.jpeg);
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

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <IconButton
            component="a"
            href="https://wa.link/lwpeuq"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            sx={{
              position: 'fixed',
              bottom: { xs: 12, sm: 16, md: 20 },
              right: { xs: 12, sm: 16, md: 20 },
              zIndex: 1000,
              width: { xs: 56, sm: 62, md: 68 },
              height: { xs: 56, sm: 62, md: 68 },
              borderRadius: '50%',
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 8px 20px -6px rgba(37, 211, 102, 0.6)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                backgroundColor: '#1EBE57',
                transform: 'scale(1.08)',
              },
            }}
          >
            <WhatsAppIcon
              sx={{
                fontSize: {
                  xs: 30,
                  sm: 34,
                  md: 38,
                },
              }}
            />
          </IconButton>
          <Container maxWidth="xl" style={{ padding: 0, margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar sectionRefs={sectionRefs} />
            <Suspense fallback={<div style={{padding: '3rem', textAlign: 'center'}}>Cargando...</div>}>
              <Routes>
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/" element={
                  <>
                    <div id="inicio" ref={sectionRefs.inicio}>
                      <Paper elevation={3} style={{ textAlign: 'center', boxShadow: 'none' }}>
                        <Inicio />
                      </Paper>
                    </div>
                    <div id="servicios" ref={sectionRefs.servicios}>
                      <Fade triggerOnce='true'>
                        <Servicios/>
                      </Fade>
                    </div>
                    <div id="metodologia" ref={sectionRefs.metodologia}>
                      <Metodologias />
                    </div>
                    <div id="nosotros" ref={sectionRefs.nosotros}>
                      <Paper component="div" style={{ 
                        margin: '20px 0px', 
                        boxShadow: 'none',
                        padding: isMobile ? '1px 15px 15px' : '25px 25px 25px',
                        minHeight: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                      }}>
                         <SectionTitle sx={{ marginBottom: '20px', paddingBottom: '15px' }}>
                          Nosotros
                        </SectionTitle>
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
                                    color: theme.palette.text.secondary,
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
                    </div>
                    <div id="contacto" ref={sectionRefs.contacto}>
                      <Paper style={{
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
                        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                          <Box sx={{
                            display: { xs: 'none', md: 'block' },
                            bottom: '300px',
                            left: '300px',
                            position: 'absolute',
                            animation: `${moveLeftBounce} 3s ease-in-out infinite`,
                            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                            '@media (max-width: 1199px)': {
                              left: '280px',
                            }
                          }}>
                            <img src={`${process.env.PUBLIC_URL}/images/main-banner12.png`} alt="" width="120" height="120" style={{ verticalAlign: 'middle' }} />
                          </Box>
                          <Box sx={{
                            display: { xs: 'none', md: 'block' },
                            bottom: '90px',
                            left: '175px',
                            position: 'absolute',
                            animation: `${moveLeftBounce} 3.9s ease-in-out infinite`,
                            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                            '@media (max-width: 1024px)': {
                              bottom: '0',
                              left: '10%',
                            },
                          }}>
                            <img src={`${process.env.PUBLIC_URL}/images/main-banner1.png`} alt="" width="120" height="120" style={{ verticalAlign: 'middle' }} />
                          </Box>
                        </Box>
                        <Container maxWidth="md" style={{ padding: '20px', position: 'relative', zIndex: 2 }}>
                          <SectionTitle sx={{ paddingBottom: '20px' }}>
                            Contacto
                          </SectionTitle>
                          <Formulario />
                        </Container>
                        <style>
                          {`
                            .MuiInputBase-root {
                              background-color: rgba(255, 255, 255, 0.85) !important;
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
                    </div>
                    <Footer />
                  </>
                } />
              </Routes>
            </Suspense>
          </Container>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;