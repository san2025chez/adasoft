import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import { fadeInUp, viewportOnce } from '../../motion';

const MotionCard = motion(Card);

const fases = [
  {
    titulo: 'Consultoría',
    items: [
      'Analizamos los procesos.',
      'Detectamos oportunidades.',
      'Evaluamos en qué parte del proceso agregar valor.',
    ],
    imagen: 'images/engranage.png',
  },
  {
    titulo: 'Propuesta',
    items: [
      'Ofrecemos soluciones, presentando nuestra propuesta de valor.',
      'Exponemos los beneficios de implementarlas.',
      'Analizamos el retorno de la inversión.',
    ],
    imagen: 'images/support.png',
  },
  {
    titulo: 'Implementación',
    items: [
      'Comenzamos el proceso de implementación.',
      'Damos soporte.',
      'Realizamos seguimiento de los cambios.',
    ],
    imagen: 'images/perfomance.png',
  },
];

const MethodologySection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box component="section" id="metodologia-content" sx={{ backgroundColor: 'background.paper', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle sx={{ mb: 6 }}>Metodología</SectionTitle>

        <Grid container spacing={4} justifyContent="center">
          {fases.map((fase, index) => (
            <Grid item xs={12} sm={6} md={4} key={fase.titulo} sx={{ display: 'flex', justifyContent: 'center' }}>
              <MotionCard
                initial={prefersReducedMotion ? undefined : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={viewportOnce}
                custom={index}
                variants={fadeInUp}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                sx={{
                  width: '100%',
                  maxWidth: 320,
                  backgroundColor: 'background.default',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    borderColor: (theme) => alpha(theme.palette.primary.main, 0.6),
                    boxShadow: (theme) => `0 20px 40px -20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                    <Box
                      component="img"
                      src={`${process.env.PUBLIC_URL}/${fase.imagen}`}
                      alt=""
                      aria-hidden="true"
                      sx={{ width: 30, height: 30 }}
                    />
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                      {fase.titulo}
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ textAlign: 'left', pl: 2.5, m: 0 }}>
                    {fase.items.map((item) => (
                      <Typography
                        key={item}
                        component="li"
                        variant="body2"
                        sx={{ color: 'text.secondary', lineHeight: 1.8, letterSpacing: '.02em' }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MethodologySection;
