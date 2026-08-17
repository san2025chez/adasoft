import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import './Servicios.css';
import { keyframes } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fade } from 'react-awesome-reveal'
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import SectionTitle from './SectionTitle';
import { services } from '../data/servicesData';

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

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(18px, -8px, 0); }
`;

const pulseSpin = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
  50% { transform: translate3d(-10px, 10px, 0) rotate(6deg) scale(1.03); }
`;

const StyledDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 400,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontSize: 15,
  letterSpacing: '.03em',
  lineHeight: '1.8em',
}));

const Servicios = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-50px 0px',
  });

  const [roll, setRoll] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (inView && !roll) setRoll(true);
  }, [inView, roll]);

  // Crear esquema de datos estructurados para los servicios
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "ADASOFT",
        "url": "https://adasoft.com.ar"
      },
      "serviceType": service.title
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>
      
      <Paper
        id="servicios"
        elevation={3}
        className="servicios-root"
        ref={ref}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          boxShadow: 'none',
          borderRadius: { xs: 0, md: 4 },
          mx: { xs: 0, md: 2.5 },
          my: { xs: 0, md: 2.5 },
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 7, sm: 8, md: 10 },
          color: 'text.primary',
          backgroundColor: 'background.paper',
          animation: roll ? `${rollInRight} 0.6s ease-out both` : 'none',
        }}
      >
        {/* Todas las imágenes van detrás del contenido y conservan su color original */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team-bg.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          sx={{
            position: 'absolute',
            inset: { xs: '-10%', md: '-20%' },
            width: '140%',
            height: '140%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 1,
          }}
        />

        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          sx={{
            position: 'absolute',
            left: { xs: '50%', md: '55%' },
            top: { xs: '52%', md: '50%' },
            transform: 'translate(-50%, -50%)',
            width: { xs: 220, sm: 320, md: 420 },
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 1,
            animation: `${pulseSpin} 11s ease-in-out infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
        {/* Decoración estática (solo visual) */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team1.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="servicios-deco servicios-deco--a"
          sx={{
            position: 'absolute',
            left: { xs: '-28px', sm: '-16px', md: '24px' },
            top: { xs: '38px', sm: '44px', md: '54px' },
            width: { xs: 120, sm: 160, md: 220 },
            height: 'auto',
            opacity: 1,
            zIndex: 0,
          }}
        />
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team3.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="servicios-deco servicios-deco--b"
          sx={{
            position: 'absolute',
            right: { xs: '-36px', sm: '-18px', md: '28px' },
            bottom: { xs: '18px', sm: '22px', md: '34px' },
            width: { xs: 140, sm: 190, md: 260 },
            height: 'auto',
            opacity: 1,
            zIndex: 0,
            animation: `${drift} 9s ease-in-out infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          <SectionTitle sx={{ padding: '15px' }}>
            Nuestros Servicios
          </SectionTitle>

          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {services.map((service, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={service.id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Fade 
                  direction="up" 
                  triggerOnce={true} 
                  delay={index * 150}
                  fraction={0.1}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      width: '100%',
                      maxWidth: '300px', // igual que Metodología
                      height: '100%',
                      borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.08)',
                      backgroundColor: 'background.paper',
                      boxShadow: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out, border-color 180ms ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: { xs: 'none', md: 'translateY(-5px)' },
                        borderColor: 'primary.main',
                        boxShadow: { xs: 'none', md: '0 16px 32px -16px rgba(15, 184, 178, 0.35)' },
                      },
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          pb: 1.2,
                          textAlign: 'center',
                          color: 'text.primary',
                          letterSpacing: '0.02em',
                          fontSize: { xs: '1.05rem', md: '1.1rem' },
                          lineHeight: 1.4,
                          textTransform: 'none',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <StyledDescription
                        className="service-description"
                        sx={{ flexGrow: 1 }}
                      >
                        {service.description}
                      </StyledDescription>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default Servicios;
