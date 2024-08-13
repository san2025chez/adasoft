import React from 'react';
import { Grid, Button, useMediaQuery, useTheme } from '@mui/material';
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
            <Fade direction='down' triggerOnce='true' style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, textTransform: 'uppercase' }}>
              <h2>¡Potencia el crecimiento de tu negocio!</h2>
            </Fade>
            <Fade direction='up' triggerOnce='true'>
              <p style={{ fontSize: isMobile ? '14px' : '16px' }}>¡Con Ada Soft, haz que tu presencia en línea impulse tu éxito!</p>
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
