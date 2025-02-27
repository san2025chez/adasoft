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

const menuItems = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'blog', label: 'Blog' },
  { id: 'contacto', label: 'Contacto' },
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
      if (id === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('inicio');
        if (isMobile) {
          setNavColor('transparent');
          setLogoColor('white');
          setMenuIconColor('white');
        } else {
          setNavColor('#19d8db');
        }
      } else {
        const element = document.getElementById(id);
        if (element) {
          const offset = 60;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          setDrawerOpen(false);
          setActiveSection(id);
          if (!isMobile) {
            setNavColor('#19d8db');
          } else if (id === 'servicios') {
            setNavColor('white');
            setLogoColor('black');
            setMenuIconColor('#00000080');
          }
        }
      }
    }
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

  return (
    <AppBar position="fixed" sx={{ 
      backgroundColor: navColor,
      boxShadow: 'none',
      transition: 'background-color 0.3s ease'
    }}>
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
                    borderBottom: '2px solid',
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
  );
};
