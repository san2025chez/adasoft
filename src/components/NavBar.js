import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, alpha } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

// Menú items con descripciones y títulos SEO-friendly
const menuItems = [
  { 
    id: 'servicios', 
    label: 'Servicios', 
    title: 'Servicios de Desarrollo Web, Software y AI',
    description: 'Servicios profesionales de desarrollo de software, diseño web, aplicaciones a medida e implementación de inteligencia artificial'
  },
  { 
    id: 'metodologia', 
    label: 'Metodología',
    title: 'Nuestra metodología de trabajo ágil',
    description: 'Metodología ágil de trabajo para desarrollo de software y proyectos digitales eficientes'
  },
  { 
    id: 'nosotros', 
    label: 'Nosotros',
    title: 'Sobre ADASOFT - Expertos en desarrollo tecnológico',
    description: 'Equipo de profesionales especializados en desarrollo de software, diseño web e implementación de inteligencia artificial'
  },
  { 
    id: 'blog', 
    label: 'Blog',
    title: 'Blog de tecnología, desarrollo y tendencias digitales',
    description: 'Artículos y recursos sobre desarrollo, tecnología, inteligencia artificial y tendencias digitales'
  },
  { 
    id: 'contacto', 
    label: 'Contacto',
    title: 'Contacta con ADASOFT - Solicita tu presupuesto',
    description: 'Contacta con nuestro equipo para solicitar presupuesto o información sobre servicios de desarrollo'
  },
];

export const NavBar = ({ sectionRefs, colorMode, onToggleColorMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToSection = (id) => {
    setDrawerOpen(false); // Close mobile drawer immediately

    // Case 1: Navigate to the Blog page
    if (id === 'blog') {
      navigate('/blog');
      return; // The scroll handler will update the active section
    }

    // Case 2: Navigate back to Home page to scroll to a section
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    // Case 3: Already on the Home page, scroll to the section
    setActiveSection(id); // Set active section for immediate UI feedback

    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const ref = sectionRefs[id];

    if (ref && ref.current) {
      const offset = 60; // Navbar height
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    let animationFrameId = null;

    const handleScroll = () => {
      if (!isMounted) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 50);

        if (location.pathname !== '/') {
          if (activeSection !== '') {
            setActiveSection('');
          }
          return;
        }

        const offset = 150;
        let currentSectionId = 'inicio';

        for (const sectionId in sectionRefs) {
          const ref = sectionRefs[sectionId];
          if (ref && ref.current) {
            const elementTop = ref.current.offsetTop - offset;
            const elementBottom = elementTop + ref.current.offsetHeight;

            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSectionId = sectionId;
              break;
            }
          }
        }

        if (activeSection !== currentSectionId) {
          setActiveSection(currentSectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, sectionRefs, activeSection]);

  // Encuentra el título y descripción del enlace activo para el SEO
  const activeMenuItem = menuItems.find(item => item.id === activeSection) || {
    title: 'ADASOFT - Desarrollo de Software, Diseño Web e Inteligencia Artificial',
    description: 'Empresa especializada en desarrollo de software a medida, diseño web profesional e implementación de soluciones con inteligencia artificial'
  };

  return (
    <>
      <Helmet>
        <title>{activeMenuItem.title}</title>
        <meta name="description" content={activeMenuItem.description} />
      </Helmet>
      
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isScrolled ? alpha(theme.palette.background.default, 0.8) : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 8px 24px -12px rgba(0, 0, 0, 0.5)' : 'none',
          borderBottom: isScrolled ? `1px solid ${alpha(theme.palette.primary.main, 0.15)}` : '1px solid transparent',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="button"
            type="button"
            onClick={() => scrollToSection('inicio')}
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              color: theme.palette.text.primary,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              fontWeight: 700,
              letterSpacing: '0.02em',
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '4px',
                borderRadius: '4px',
              },
            }}
          >
            ADA SOFTWARE
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label={colorMode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                onClick={onToggleColorMode}
                sx={{ color: theme.palette.text.primary, padding: '12px' }}
              >
                {colorMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: theme.palette.text.primary,
                  padding: '12px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '2rem' // Aumentando el tamaño del icono
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                  sx: {
                    width: '280px', // Haciendo el drawer un poco más ancho
                    backgroundColor: 'background.paper',
                    '& .MuiListItem-root': {
                      padding: '12px 24px', // Aumentando el padding de los items
                      '& .MuiListItemText-primary': {
                        fontSize: '1.1rem' // Aumentando el tamaño del texto
                      }
                    }
                  }
                }}
              >
                <Box sx={{ width: '100%' }} role="presentation">
                  <List>
                    {menuItems.map((item) => (
                      <ListItemButton
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        selected={activeSection === item.id}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.12),
                            borderRight: `3px solid ${theme.palette.primary.main}`,
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.18),
                          },
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontWeight: activeSection === item.id ? 700 : 500,
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      position: 'relative',
                      color: theme.palette.text.primary,
                      fontWeight: isActive ? 700 : 500,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '20%',
                        right: '20%',
                        bottom: 6,
                        height: 2,
                        borderRadius: 1,
                        backgroundColor: theme.palette.primary.main,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
              <IconButton
                aria-label={colorMode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                onClick={onToggleColorMode}
                sx={{ color: theme.palette.text.primary, ml: 0.5 }}
              >
                {colorMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
