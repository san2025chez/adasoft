import { createTheme, alpha } from '@mui/material/styles';

// Paleta de marca ADASOFT: cian/teal ya presente en el sitio (hero, footer, WhatsApp)
// llevado a valores sólidos y accesibles, con neutros consistentes para texto.
const theme = createTheme({
  palette: {
    mode: 'light',
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
    // Pesos más livianos y tamaños fluidos (clamp: min, preferido según viewport, máx)
    // para una tipografía más delicada y proporcional a cualquier ancho de pantalla.
    h1: { fontWeight: 600, letterSpacing: '-0.01em', fontSize: 'clamp(2.25rem, 1.9rem + 1.5vw, 3.25rem)' },
    h2: { fontWeight: 600, letterSpacing: '-0.01em', fontSize: 'clamp(1.75rem, 1.5rem + 1vw, 2.5rem)' },
    h3: { fontWeight: 500, fontSize: 'clamp(1.5rem, 1.3rem + 0.8vw, 2rem)' },
    h4: { fontWeight: 500, fontSize: 'clamp(1.25rem, 1.1rem + 0.6vw, 1.75rem)' },
    h5: { fontWeight: 500, fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.4rem)' },
    h6: {
      fontWeight: 500,
      fontSize: 'clamp(1.05rem, 0.98rem + 0.3vw, 1.2rem)',
      lineHeight: 1.6,
    },
    body1: { fontWeight: 400, fontSize: 'clamp(0.95rem, 0.9rem + 0.2vw, 1rem)' },
    body2: { fontWeight: 400, fontSize: 'clamp(0.85rem, 0.82rem + 0.15vw, 0.9rem)' },
    button: { fontWeight: 500, textTransform: 'none' },
    // Eyebrow/etiqueta de sección: "NUESTROS SERVICIOS", "METODOLOGÍA", etc.
    overline: {
      fontWeight: 600,
      letterSpacing: '3px',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          '&:hover fieldset': {
            borderColor: '#0FB8B2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0FB8B2',
            boxShadow: `0 0 0 4px ${alpha('#0FB8B2', 0.15)}`,
          },
        },
      },
    },
  },
});

export default theme;
