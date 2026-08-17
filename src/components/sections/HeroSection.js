import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ParticlesBackground from './ParticlesBackground';
import { fadeInUp } from '../../motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

const scrollToRef = (ref) => {
  if (!ref || !ref.current) return;
  const offset = 60; // altura del NavBar
  const elementPosition = ref.current.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
};

const HeroSection = ({ sectionRefs = {} }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const prefersReducedMotion = useReducedMotion();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ADASOFT',
    url: 'https://adasoft.com.ar',
    logo: 'https://adasoft.com.ar/images/logotrans2.png',
    description: 'ADASOFT - Desarrollamos soluciones tecnológicas a medida, páginas web profesionales, software personalizado e implementación de inteligencia artificial para impulsar el crecimiento de tu negocio.',
    address: { '@type': 'PostalAddress', addressCountry: 'Argentina' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-9-11-1234-5678',
      contactType: 'customer service',
      email: 'info@adasoft.com.ar',
    },
    sameAs: [
      'https://www.facebook.com/adasoft',
      'https://www.instagram.com/adasoft',
      'https://www.linkedin.com/company/adasoft',
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '100vh', md: '92vh' },
          display: 'flex',
          alignItems: 'center',
          pt: { xs: '96px', md: '120px' },
          pb: { xs: 6, md: 4 },
          backgroundColor: 'background.default',
          backgroundImage: `radial-gradient(60% 60% at 78% 32%, ${alpha(theme.palette.primary.main, 0.16)} 0%, transparent 70%),
            radial-gradient(45% 45% at 15% 80%, ${alpha(theme.palette.primary.main, 0.10)} 0%, transparent 70%)`,
        }}
      >
        <ParticlesBackground />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <MotionTypography
                variant="h2"
                component="h1"
                custom={0}
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true }}
                variants={fadeInUp}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  mb: 3,
                  fontSize: 'clamp(2rem, 1.6rem + 2.2vw, 2.9rem)',
                  textTransform: 'uppercase',
                }}
              >
                Construimos la tecnología que escala tu negocio.
              </MotionTypography>

              <MotionTypography
                variant="body1"
                custom={1}
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true }}
                variants={fadeInUp}
                sx={{
                  color: 'text.secondary',
                  fontSize: 'clamp(1rem, 0.95rem + 0.3vw, 1.1rem)',
                  lineHeight: 1.7,
                  maxWidth: 520,
                  mb: 5,
                }}
              >
                Desarrollamos páginas web, sistemas personalizados y soluciones con inteligencia
                artificial para aumentar tu productividad, mejorar tu imagen digital y atraer más
                clientes.
              </MotionTypography>

              <MotionBox
                custom={2}
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <MotionButton
                    variant="contained"
                    color="primary"
                    size="large"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => scrollToRef(sectionRefs.contacto)}
                  >
                    Cotizar mi proyecto
                  </MotionButton>
                  <MotionButton
                    variant="outlined"
                    color="primary"
                    size="large"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    onClick={() => scrollToRef(sectionRefs.servicios)}
                  >
                    Explorar servicios
                  </MotionButton>
                </Stack>
              </MotionBox>
            </Grid>

            {isDesktop && (
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <MotionBox
                  custom={1}
                  initial={prefersReducedMotion ? undefined : 'hidden'}
                  whileInView={prefersReducedMotion ? undefined : 'visible'}
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  animate={prefersReducedMotion ? undefined : { y: [0, -14, 0] }}
                  transition={prefersReducedMotion ? undefined : { y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                  sx={{ maxWidth: 480, width: '100%' }}
                >
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/images/imageSOFT.png`}
                    alt="Soluciones tecnológicas ADASOFT"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      filter: `drop-shadow(0 0 40px ${alpha(theme.palette.primary.main, 0.45)})`,
                    }}
                  />
                </MotionBox>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
