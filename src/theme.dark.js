import { createTheme, alpha } from '@mui/material/styles';

// Theme "dark tech" — fondo azul marino profundo + acento turquesa,
// pensado para una estética premium orientada a IA / B2B.
const ACCENT = '#0AC5B3';
const SURFACE = '#1E293B';
const BACKGROUND = '#0B1120';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: ACCENT,
      light: '#4FE0D2',
      dark: '#078F82',
      contrastText: '#04201C',
    },
    secondary: {
      main: '#94A3B8',
      contrastText: '#0B1120',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8',
    },
    background: {
      default: BACKGROUND,
      paper: SURFACE,
    },
    divider: alpha(ACCENT, 0.15),
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
          backgroundColor: BACKGROUND,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          paddingLeft: 28,
          paddingRight: 28,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
        },
        containedPrimary: {
          boxShadow: `0 8px 24px -8px ${alpha(ACCENT, 0.7)}`,
          '&:hover': {
            boxShadow: `0 12px 32px -6px ${alpha(ACCENT, 0.65)}`,
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderColor: alpha(ACCENT, 0.5),
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: ACCENT,
            borderWidth: '1.5px',
            backgroundColor: alpha(ACCENT, 0.08),
            boxShadow: `0 0 24px ${alpha(ACCENT, 0.25)}`,
            transform: 'translateY(-2px)',
          },
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
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
          borderRadius: 16,
          border: `1px solid ${alpha(ACCENT, 0.14)}`,
          backgroundImage: 'none',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#FFFFFF', 0.04),
          borderRadius: 14,
          '& fieldset': {
            borderColor: alpha(ACCENT, 0.25),
          },
          '&:hover fieldset': {
            borderColor: alpha(ACCENT, 0.5),
          },
          '&.Mui-focused fieldset': {
            borderColor: ACCENT,
            boxShadow: `0 0 0 4px ${alpha(ACCENT, 0.15)}`,
          },
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

export const DARK_ACCENT = ACCENT;
export const DARK_SURFACE = SURFACE;
export const DARK_BACKGROUND = BACKGROUND;

export default theme;
