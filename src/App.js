import React, { Suspense, lazy, useRef, useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NavBar } from './components/NavBar';
import lightTheme from './theme';
import darkTheme from './theme.dark';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Carga diferida de páginas principales
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const SocialProofSection = lazy(() => import('./components/sections/SocialProofSection'));
const ServicesSection = lazy(() => import('./components/sections/ServicesSection'));
const MethodologySection = lazy(() => import('./components/sections/MethodologySection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

const COLOR_MODE_STORAGE_KEY = 'adasoft-color-mode';

const getInitialColorMode = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [colorMode, setColorMode] = useState(getInitialColorMode);

  useEffect(() => {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (colorMode === 'light' ? lightTheme : darkTheme), [colorMode]);

  const sectionRefs = {
    inicio: useRef(null),
    servicios: useRef(null),
    metodologia: useRef(null),
    nosotros: useRef(null),
    contacto: useRef(null),
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      // Using a small timeout to ensure the component has rendered.
      const timer = setTimeout(() => {
        const ref = sectionRefs[location.state.scrollTo];
        if (ref && ref.current) {
          const offset = 60; // Navbar height
          const elementPosition = ref.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          // Clean up state after scrolling to prevent re-triggering.
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100);
      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [location, navigate, sectionRefs]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline enableColorScheme />
          <IconButton
            component="a"
            href="https://wa.link/lwpeuq"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            sx={{
              position: 'fixed',
              bottom: { xs: 12, sm: 16, md: 20 },
              right: { xs: 12, sm: 16, md: 20 },
              zIndex: 1000,
              width: { xs: 56, sm: 62, md: 68 },
              height: { xs: 56, sm: 62, md: 68 },
              borderRadius: '50%',
              backgroundColor: '#25D366',
              color: '#fff',
              boxShadow: '0 8px 20px -6px rgba(37, 211, 102, 0.6)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                backgroundColor: '#1EBE57',
                transform: 'scale(1.08)',
              },
            }}
          >
            <WhatsAppIcon
              sx={{
                fontSize: {
                  xs: 30,
                  sm: 34,
                  md: 38,
                },
              }}
            />
          </IconButton>
          <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
            <NavBar sectionRefs={sectionRefs} colorMode={colorMode} onToggleColorMode={toggleColorMode} />
            <Suspense fallback={<Box sx={{ padding: '3rem', textAlign: 'center', color: 'text.primary', backgroundColor: 'background.default' }}>Cargando...</Box>}>
              <Routes>
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/" element={
                  <>
                    <div id="inicio" ref={sectionRefs.inicio}>
                      <HeroSection sectionRefs={sectionRefs} />
                    </div>
                    <SocialProofSection />
                    <div id="servicios" ref={sectionRefs.servicios}>
                      <ServicesSection />
                    </div>
                    <div id="metodologia" ref={sectionRefs.metodologia}>
                      <MethodologySection />
                    </div>
                    <div id="nosotros" ref={sectionRefs.nosotros}>
                      <AboutSection />
                    </div>
                    <div id="contacto" ref={sectionRefs.contacto}>
                      <ContactSection />
                    </div>
                    <Footer />
                  </>
                } />
              </Routes>
            </Suspense>
          </Container>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
