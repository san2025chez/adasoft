import React from 'react';
import Typography from '@mui/material/Typography';

// Título de sección reutilizable (Servicios, Metodología, Nosotros, Contacto)
// para evitar redeclarar el mismo estilo (color, tracking, uppercase) en cada archivo.
const SectionTitle = ({ children, sx = {}, ...props }) => {
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        color: 'text.primary',
        fontSize: 'clamp(1.4rem, 1.15rem + 1vw, 1.9rem)',
        letterSpacing: '4px',
        marginBottom: '32px',
        fontWeight: 600,
        lineHeight: 1.25,
        textTransform: 'uppercase',
        textAlign: 'center',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default SectionTitle;
