import React from 'react';
import { Grid, Button, useMediaQuery, useTheme, Typography, Box, Container } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import './inicio.css';

const Inicio = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // Datos estructurados Schema.org para la organización
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ADASOFT",
    "url": "https://adasoft.com.ar",
    "logo": "https://adasoft.com.ar/images/logotrans2.png",
    "description": "ADASOFT - Desarrollamos soluciones tecnológicas a medida, páginas web profesionales, software personalizado e implementación de inteligencia artificial para impulsar el crecimiento de tu negocio.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Argentina"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-9-11-1234-5678",
      "contactType": "customer service",
      "email": "info@adasoft.com.ar"
    },
    "sameAs": [
      "https://www.facebook.com/adasoft",
      "https://www.instagram.com/adasoft",
      "https://www.linkedin.com/company/adasoft"
    ]
  };

  // Datos estructurados para los servicios principales
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Desarrollo de Software y Diseño Web",
    "provider": {
      "@type": "Organization",
      "name": "ADASOFT",
      "url": "https://adasoft.com.ar"
    },
    "description": "Soluciones tecnológicas a medida, desarrollo de software, diseño web profesional e implementación de inteligencia artificial para empresas y emprendedores.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "ARS"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>
      
      <Box 
        className="contenedor-imagen" 
        sx={{
          paddingTop: { xs: '80px', sm: '100px', md: '130px' }, 
          minHeight: { md: '100vh' },
          overflow: 'hidden',
          width: '100%'
        }}
      >
        <Container 
          maxWidth="xl" 
          disableGutters={isMobile} 
          sx={{ 
            overflow: 'hidden'
          }}
        >
          <Grid 
            container 
            spacing={0} 
            alignItems="center" 
            justifyContent="center"
            sx={{
              m: 0, 
              width: '100%',
              pt: { xs: 0, md: '0.5rem' } 
            }}
          >
            {/* Primera división con grid - Texto */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { 
                  xs: '1rem 1rem', 
                  md: '1rem 1.5rem 2rem' 
                },
                textAlign: { xs: 'center', md: 'center' },
                width: '100%'
              }}
            >
              <Box 
                sx={{ 
                  width: '100%',
                  maxWidth: { xs: '100%', md: '550px' },
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: { xs: 0, md: '-0.5rem' } 
                }}
              >
                <Fade direction='down' triggerOnce={true}>
                  <Typography 
                    variant={isMobile ? 'h5' : 'h4'} 
                    sx={{ 
                      fontWeight: 700, 
                      textTransform: 'uppercase', 
                      marginBottom: { xs: '1.2rem', md: '1.3rem' }, 
                      fontSize: { 
                        xs: '1.1rem', 
                        md: '1.2rem'
                      },
                      letterSpacing: '0.05em',
                      lineHeight: 1.3,
                      color: '#ffffff',
                      textAlign: 'center !important', 
                      width: '100%'
                    }}
                  >
                    ¡Potencia el crecimiento de tu negocio con soluciones tecnológicas!
                  </Typography>
                </Fade>
                <Fade direction='up' triggerOnce={true}>
                  <Typography 
                    variant={isMobile ? 'body2' : 'body1'} 
                    sx={{ 
                      marginBottom: { xs: '1.5rem', md: '1.6rem' }, 
                      fontSize: { 
                        xs: '0.8rem', 
                        md: '0.95rem'
                      },
                      lineHeight: 1.7,
                      color: '#ffffff',
                      fontWeight: 400,
                      textAlign: 'center !important', 
                      width: '100%'
                    }}
                  >
                    En ADASOFT desarrollamos software a medida, páginas web profesionales y soluciones con inteligencia artificial que transforman y optimizan los procesos de tu empresa.
                  </Typography>
                </Fade>
                <Fade direction='up' triggerOnce={true} delay={200}>
                  <Button 
                    variant="contained" 
                    href="#contacto"
                    sx={{ 
                      background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                      marginTop: { xs: '0.8rem', md: '0.7rem' }, 
                      fontWeight: 600,
                      padding: { xs: '10px 24px', md: '12px 28px' },
                      borderRadius: '30px',
                      fontSize: { xs: '0.8rem', md: '0.85rem' },
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0, 183, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      alignSelf: 'center', 
                      '&:hover': {
                        background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 70%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(0, 183, 255, 0.5)',
                      }
                    }}
                    component="a"
                    onClick={(e) => {
                      e.preventDefault();
                      const contactoSection = document.getElementById('contacto');
                      if (contactoSection) {
                        contactoSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    ¡Cotiza tu proyecto ahora!
                  </Button>
                </Fade>
              </Box>
            </Grid>

            {/* Segunda división con grid para la imagen */}
            {(isDesktop || (isMobile && !isLandscape)) && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', 
                  padding: { xs: '0.5rem', md: '0.5rem 1.5rem' }, 
                  position: 'relative',
                  marginTop: {
                    xs: '1rem',
                    md: '0'
                  },
                  zIndex: 1,
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: { xs: '75%', sm: '70%', md: '85%', lg: '80%' },
                    mt: { xs: 0, md: '0' }, 
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: { xs: '150px', sm: '200px', md: '250px' },
                      height: { xs: '150px', sm: '200px', md: '250px' },
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(58, 123, 213, 0.1) 0%, rgba(0, 210, 255, 0.05) 70%)',
                      top: { xs: '-10px', md: '-20px' },
                      right: { xs: '-20px', md: '-40px' },
                      zIndex: -1
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: { xs: '120px', sm: '150px', md: '180px' },
                      height: { xs: '120px', sm: '150px', md: '180px' },
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, rgba(58, 123, 213, 0.03) 70%)',
                      bottom: { xs: '-15px', md: '-30px' },
                      left: { xs: '-10px', md: '-20px' },
                      zIndex: -1
                    }
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/imageSOFT.png`}
                    alt="Soluciones tecnológicas ADASOFT"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                      animation: 'float 6s ease-in-out infinite',
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </>
  );
};

export default Inicio;
