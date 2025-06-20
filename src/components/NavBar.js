import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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

export const NavBar = ({ sectionRefs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navColor, setNavColor] = useState('transparent');
  const [logoColor, setLogoColor] = useState('white');
  const [menuIconColor, setMenuIconColor] = useState('white');
  const [activeSection, setActiveSection] = useState('inicio');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToSection = (id) => {
    setDrawerOpen(false); // Close mobile drawer immediately

    // Case 1: Navigate to the Blog page
    if (id === 'blog') {
      console.log('Action: Navigating to /blog');
      navigate('/blog');
      return; // The scroll handler will update the active section
    }

    // Case 2: Navigate back to Home page to scroll to a section
    if (location.pathname !== '/') {
      console.log(`Action: Navigating to home to scroll to "${id}"`);
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    
    // Case 3: Already on the Home page, scroll to the section
    console.log(`Action: Scrolling to section "${id}" on the current page.`);
    setActiveSection(id); // Set active section for immediate UI feedback

    if (id === 'inicio') {
      console.log('Scrolling to top of the page.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const ref = sectionRefs[id];
    console.log(`Retrieved ref for "${id}":`, ref);

    if (ref && ref.current) {
      const offset = 60; // Navbar height
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      console.log(`Scrolling to position: ${offsetPosition}`);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      console.error(`Error: Could not find ref or ref.current for section "${id}". Ref is:`, ref);
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
        const isScrolled = scrollPosition > 50;

        setNavColor(isScrolled ? 'white' : 'transparent');
        setLogoColor(isScrolled ? 'black' : 'white');
        setMenuIconColor(isScrolled ? 'black' : 'white');

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
          backgroundColor: navColor,
          boxShadow: 'none',
          transition: 'background-color 0.5s ease',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: logoColor,
              cursor: 'pointer',
              transition: 'color 0.3s ease'
            }}
            onClick={() => scrollToSection('inicio')}
          >
            ADA SOFTWARE
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ 
                  color: menuIconColor,
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
                      <ListItem
                        button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        selected={activeSection === item.id}
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    color: logoColor,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    ...(activeSection === item.id && {
                      borderBottom: 'none',
                      borderRadius: 0,
                    }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
