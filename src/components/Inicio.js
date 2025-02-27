import React from 'react';
import { Grid, Button, useMediaQuery, useTheme, Typography } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import './inicio.css';

const Inicio = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className="contenedor-imagen">
      <Grid container spacing={2} alignItems="center">
        {/* Primera división con grid */}
        <Grid item xs={12} md={6} className='centrado' style={{ fontWeight: 500, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
          <div>
            <Fade direction='down' triggerOnce='true'>
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                style={{ 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  marginBottom: '1rem',
                  fontSize: 'calc(1.5rem + 1pt)', // Aumenta 1 punto para escritorio por defecto
                  ...(isMobile && {
                    fontSize: 'calc(1.5rem - 1pt)' // Reduce 1 punto solo en móvil
                  })
                }}
              >
                ¡Potencia el crecimiento de tu negocio!
              </Typography>
            </Fade>
            <Fade direction='up' triggerOnce='true'>
              <Typography variant={isMobile ? 'body2' : 'body1'} style={{ marginBottom: '1rem' }}>
                ¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito!
              </Typography>
            </Fade>
          </div>
        </Grid>

        {/* Segunda división con grid para la imagen */}
        {(isDesktop || (isMobile && !isLandscape)) && (
          <Grid
            item
            xs={12}
            md={6}
            sx={(theme) => ({
              paddingLeft: '15px',
              paddingRight: '15px',
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: {
                xs: '20px',
                sm: '30px',
                md: '0px'
              },
              marginTop: {
                xs: '85px',
                sm: '30px',
                md: '170px'
              },
            })}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/imageSOFT.png`}
              alt="Imagen"
              style={{
                maxWidth: isMobile ? '70%' : '70%',
                height: 'auto',
                marginBottom: '20px'
              }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Inicio;
