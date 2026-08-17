import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from '../SectionTitle';
import { Formulario } from '../Formulario';
import { fadeInUp, viewportOnce } from '../../motion';

const MotionBox = motion(Box);

const ContactSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        py: { xs: 8, md: 12 },
        backgroundImage: (theme) =>
          `radial-gradient(50% 60% at 50% 0%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle sx={{ mb: 5 }}>Contacto</SectionTitle>
        <MotionBox
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <Formulario />
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ContactSection;
