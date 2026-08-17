import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import { fadeInUp, viewportOnce } from '../../motion';

const MotionBox = motion(Box);

const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box component="section" sx={{ backgroundColor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <SectionTitle sx={{ mb: 5 }}>Nosotros</SectionTitle>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={fadeInUp}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  textAlign: 'left',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.9,
                }}
              >
                En ADA SOFTWARE no trabajamos de manera estandarizada, sino que adaptamos las
                mejoras a cada organización, según sus necesidades y sus proyecciones. Nuestras
                soluciones son a medida de cada cliente.
                <br /><br />
                Contamos con años de trayectoria en el mercado que nos permiten analizar, proponer
                mejoras, resolver problemas y generar cambios superadores desde una mirada
                experimentada y profesional.
                <br /><br />
                Trabajamos codo a codo con cada cliente para resolver, optimizar y generar nuevos
                proyectos.
                <br /><br />
                Somos el aliado que tu equipo de trabajo necesita. Somos ADA SOFTWARE — Fabricamos
                soluciones.
              </Typography>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <MotionBox
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={viewportOnce}
              custom={1}
              variants={fadeInUp}
              sx={{
                width: 300,
                height: 300,
                borderRadius: '50%',
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/nosotros2.jpeg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: (theme) => `0 0 0 6px ${alpha(theme.palette.primary.main, 0.12)}`,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
