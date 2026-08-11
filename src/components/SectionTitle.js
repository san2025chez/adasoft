import React from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Título de sección reutilizable (Servicios, Metodología, Nosotros, Contacto)
// para evitar redeclarar el mismo estilo (color, tracking, uppercase) en cada archivo.
const SectionTitle = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        color: 'text.primary',
        fontSize: isMobile ? '23px' : '30px',
        letterSpacing: '4px',
        marginBottom: '32px',
        fontWeight: 700,
        lineHeight: isMobile ? 1.3 : 1.2,
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
