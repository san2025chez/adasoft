import { createTheme } from '@mui/material/styles';

// Paleta de marca ADASOFT: cian/teal ya presente en el sitio (hero, footer, WhatsApp)
// llevado a valores sólidos y accesibles, con neutros consistentes para texto.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0FB8B2',
      light: '#5FD9D4',
      dark: '#0A8580',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1E293B',
      light: '#334155',
      dark: '#0F172A',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#1A2027',
      secondary: '#5B6472',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none' },
    // Eyebrow/etiqueta de sección: "NUESTROS SERVICIOS", "METODOLOGÍA", etc.
    overline: {
      fontWeight: 600,
      letterSpacing: '3px',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
        },
        containedPrimary: {
          boxShadow: '0 8px 20px -8px rgba(15, 184, 178, 0.6)',
          '&:hover': {
            boxShadow: '0 10px 24px -6px rgba(15, 184, 178, 0.55)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        },
      },
    },
  },
});

export default theme;
