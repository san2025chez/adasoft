import { useState } from "react";
import React, { useEffect } from 'react';
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
import Fade from 'react-reveal/Fade'; // Asumiendo que estás utilizando react-reveal para animaciones
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const menuItems = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

export const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navColor, setNavColor] = useState('transparent');
  const [logoColor, setLogoColor] = useState('white');
  const [menuIconColor, setMenuIconColor] = useState('white');
  const [isInicio, setIsInicio] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToSection = (id) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsInicio(true);
      if (isMobile) {
        setNavColor(drawerOpen ? '#19d8db' : 'transparent');
        setLogoColor('white');
        setMenuIconColor('white');
      } else {
        setNavColor('transparent');
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setDrawerOpen(false);
        setIsInicio(false);
        if (!isMobile) {
          setNavColor('#19d8db');
        }
      }
    }
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    const sectionHeight = window.innerHeight;
    const section = Math.floor(offset / sectionHeight);

    if (isMobile) {
      if (section === 0) {
        setNavColor(drawerOpen ? '#19d8db' : 'transparent');
        setLogoColor('white');
        setMenuIconColor('white');
        setIsInicio(true);
      } else {
        setNavColor('white');
        setLogoColor('#00000080');
        setMenuIconColor('#00000080');
        setIsInicio(false);
      }
    } else {
      if (section === 0) {
        setNavColor('transparent');
        setIsInicio(true);
      } else {
        setNavColor('#19d8db');
        setIsInicio(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, drawerOpen]);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
    if (isMobile && isInicio) {
      setNavColor(open ? '#19d8db' : 'transparent');
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: navColor,
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          border: 0
        }}
      >
        <Toolbar style={{ background: navColor, height: '60px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(!drawerOpen)}
            sx={{ mr: 2, display: { sm: 'none' }, color: isMobile ? menuIconColor : 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <a
              href="#"
              style={{
                textDecoration: 'none',
                color: isMobile ? logoColor : 'white',
                fontSize: '30px',
                fontWeight: 'bold',
                paddingTop: '10px',
                cursor: 'pointer',
              }}
              onClick={() => scrollToSection('inicio')}
            >
ADA SOFT
            </a>
          </div>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {menuItems.map((item) => (
              <Button 
                color="inherit" 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold', 
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            height: 'auto',
            maxHeight: '100%',
            marginTop: '60px',
            background: isMobile && isInicio ? '#19d8db' : 'white',
          }
        }}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: '100%' }}>
          <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px' }}>
            {menuItems.map((item) => (
              <ListItem button key={item.id} onClick={() => scrollToSection(item.id)} sx={{ width: '100%' }}>
                <ListItemText 
                  primary={item.label} 
                  sx={{ 
                    color: isMobile && isInicio ? 'white' : '#00000080', 
                    fontWeight: 'bold', 
                    fontSize:'18px',
                    fontFamily: 'Poppins, sans-serif'
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
