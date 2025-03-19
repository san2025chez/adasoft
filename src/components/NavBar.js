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

export const NavBar = () => {
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
    if (id === 'blog') {
      navigate('/blog');
      setDrawerOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 60;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 60; // Adjust this value according to your navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    setActiveSection(id);
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/blog') {
        setNavColor('#19d8db');
        setLogoColor('white');
        setMenuIconColor('white');
        return;
      }

      const offset = window.scrollY;
      const isHomePage = location.pathname === '/';
      
      if (isHomePage && offset < 100) {
        // En el inicio (primeros 100px), navbar transparente
        setNavColor('transparent');
        setLogoColor('white');
        setMenuIconColor('white');
        setActiveSection('inicio');
      } else {
        // En cualquier otra sección o página, navbar con color sólido
        setNavColor('#19d8db');
        setLogoColor('white');
        setMenuIconColor('white');
        
        if (isHomePage) {
          const sectionHeight = window.innerHeight;
          const section = Math.floor(offset / sectionHeight);
          setActiveSection(section === 0 ? 'inicio' : menuItems[section - 1]?.id || '');
        }
      }
    };

    // Ejecutar handleScroll al montar el componente
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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
