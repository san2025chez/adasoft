import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../SectionTitle';
import { services } from '../../data/servicesData';
import { fadeInUp, viewportOnce } from '../../motion';

const MotionCard = motion(Card);

const ServicesSection = () => {
  const prefersReducedMotion = useReducedMotion();

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'Service',
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: { '@type': 'Organization', name: 'ADASOFT', url: 'https://adasoft.com.ar' },
      serviceType: service.title,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>

      <Box component="section" id="servicios-content" sx={{ backgroundColor: 'background.default', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionTitle sx={{ mb: 6 }}>Nuestros Servicios</SectionTitle>

          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={service.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <MotionCard
                  initial={prefersReducedMotion ? undefined : 'hidden'}
                  whileInView={prefersReducedMotion ? undefined : 'visible'}
                  viewport={viewportOnce}
                  custom={index % 4}
                  variants={fadeInUp}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  sx={{
                    width: '100%',
                    maxWidth: 300,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.6),
                      boxShadow: (theme) => `0 20px 40px -20px ${alpha(theme.palette.primary.main, 0.4)}`,
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
                        lineHeight: 1.4,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        flexGrow: 1,
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        letterSpacing: '.02em',
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ServicesSection;
