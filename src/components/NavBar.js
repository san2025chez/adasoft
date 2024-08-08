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

const menuItems = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

export const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navColor, setNavColor] = useState('transparent');

  const scrollToSection = (id) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setNavColor('transparent'); // Cambia el color del nav a transparente
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setDrawerOpen(false);
      }
    }
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    const sectionHeight = window.innerHeight;
    const section = Math.floor(offset / sectionHeight);

    if (section === 1 || section === 2 || section === 3 || section === 4) {
      setNavColor('#19d8db');
    } else {
      setNavColor('transparent');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
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
            onClick={() => toggleDrawer(true)}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <a
              href="#"
              style={{
                textDecoration: 'none',
                color: 'white',
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
              <Button color="inherit" key={item.id} onClick={() => scrollToSection(item.id)} sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
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
            width: '100vw',
            marginTop: '56px',
            background: '#19d8db',
          }
        }}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: '100%' }}>
          <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {menuItems.map((item) => (
              <ListItem button key={item.id} onClick={() => scrollToSection(item.id)} sx={{ width: '100%', textAlign: 'center' }}>
                <ListItemText primary={item.label} sx={{ color: 'white', fontWeight: 'bold', fontSize:'18px' ,fontFamily: 'Poppins, sans-serif'}} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
