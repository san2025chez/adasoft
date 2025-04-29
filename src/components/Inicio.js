import React from 'react';
import { Grid, useMediaQuery, useTheme, Typography, Box, Container } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import './inicio.css';

const Inicio = () => {
  // Forzar scroll al tope al montar
  React.useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fix for mobile layout shifting by preloading critical images
    const preloadImages = () => {
      // Preload the main hero image
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/images/optimized/imageSOFT-600.webp`;
    };
    
    preloadImages();
  }, []);

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
          minHeight: { xs: '100vh', md: '90vh' },
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container 
          maxWidth="xl" 
          disableGutters={isMobile} 
          sx={{ 
            overflow: 'hidden',
            width: '100%'
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
                <Fade direction='down' triggerOnce={true} duration={500}>
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
                <Fade direction='up' triggerOnce={true} duration={500}>
                  <Typography 
                    variant={isMobile ? 'body2' : 'body1'} 
                    sx={{ 
                      marginBottom: { xs: '1.5rem', md: '2rem' }, 
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
                    xs: '0', 
                    md: '0'
                  },
                  zIndex: 1,
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    minHeight: isMobile ? '250px' : '300px', // Set minimum height to prevent layout shift
                    position: 'relative'
                  }}
                >
                  <picture>
                    {/* WebP format for browsers that support it */}
                    <source
                      srcSet={`
                        ${process.env.PUBLIC_URL}/images/optimized/imageSOFT-300.webp 300w,
                        ${process.env.PUBLIC_URL}/images/optimized/imageSOFT-600.webp 600w, 
                        ${process.env.PUBLIC_URL}/images/optimized/imageSOFT-900.webp 900w
                      `}
                      sizes="(max-width: 600px) 100vw, 600px"
                      type="image/webp"
                    />
                    {/* Fallback for browsers that don't support WebP */}
                    <source
                      srcSet={`${process.env.PUBLIC_URL}/images/optimized/imageSOFT-600.png`}
                      type="image/png"
                    />
                    {/* Fallback image for older browsers */}
                    <img
                      src={`${process.env.PUBLIC_URL}/images/optimized/imageSOFT-600.png`}
                      alt="Soluciones tecnológicas ADASOFT"
                      loading="eager" 
                      width="600"
                      height="400"
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '3/2',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                        animation: 'float 6s ease-in-out infinite',
                        display: 'block',
                      }}
                    />
                  </picture>
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
