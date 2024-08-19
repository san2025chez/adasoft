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
import Slide from '@mui/material/Slide';
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
  const [activeSection, setActiveSection] = useState('inicio');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToSection = (id) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsInicio(true);
      setActiveSection('inicio');
      if (isMobile) {
        setNavColor('transparent');
        setLogoColor('white');
        setMenuIconColor('white');
      } else {
        setNavColor('transparent');
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 60; // Altura de la barra de navegación
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        setDrawerOpen(false);
        setIsInicio(false);
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
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    const sectionHeight = window.innerHeight;
    const section = Math.floor(offset / sectionHeight);

    if (isMobile) {
      if (section === 0) {
        setNavColor('transparent');
        setLogoColor('white');
        setMenuIconColor('white');
        setIsInicio(true);
        setActiveSection('inicio');
      } else {
        setNavColor('white');
        setLogoColor('black');
        setMenuIconColor('#00000080');
        setIsInicio(false);
        setActiveSection(menuItems[section - 1]?.id || '');
      }
    } else {
      if (section === 0) {
        setNavColor('transparent');
        setIsInicio(true);
        setActiveSection('inicio');
      } else {
        setNavColor('#19d8db');
        setIsInicio(false);
        setActiveSection(menuItems[section - 1]?.id || '');
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
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: navColor,
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          border: 0
        }}
      >
        <Toolbar style={{ backgroundColor: navColor, height: '60px', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1 }}>
            <a
              href="#"
              style={{
                textDecoration: 'none',
                color: isMobile ? logoColor : 'white',
                fontSize: isMobile ? '27px' : '30px',
                fontWeight: 'bold',
                paddingTop: '10px',
                cursor: 'pointer',
              }}
              onClick={() => scrollToSection('inicio')}
            >
ADASOFT
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
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(!drawerOpen)}
            sx={{ display: { sm: 'none' }, color: isMobile ? menuIconColor : 'white' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: '81%',
            height: 'auto',
            maxHeight: '100%',
            marginTop: '60px',
            background: 'white',
            boxShadow: 'none',
            left: '9.5%',
            right: '9.5%',
          }
        }}
        onClose={() => toggleDrawer(false)}
        BackdropProps={{ invisible: true }}
      >
        <Slide direction="down" in={drawerOpen} mountOnEnter unmountOnExit>
          <Box sx={{ width: '100%', padding: '0 16px' }}>
            <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
              {menuItems.map((item, index) => (
                <Slide direction="down" in={drawerOpen} style={{ transitionDelay: `${index * 100}ms` }}>
                  <ListItem button key={item.id} onClick={() => scrollToSection(item.id)} sx={{ width: '100%' }}>
                    <ListItemText 
                      primary={item.label} 
                      sx={{ 
                        color: isMobile && activeSection === item.id ? '#19d8db' : '#00000080', 
                        fontWeight: 400, 
                        fontSize: '15px',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '1px',
                        padding: '10px 0 10px 5px',
                        textTransform: 'uppercase',
                        lineHeight: 1.0,
                        textAlign: 'left',
                        ...(isMobile && {
                          fontSize: '13px',
                          fontWeight: 400,
                          paddingTop: 1.0,
                          paddingBottom: 1.0,
                          lineHeight: 1.5,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }),
                        '& .MuiTypography-root': {
                          margin: 0,
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          lineHeight: 1.1,
                          display: 'block',
                          fontSize: '13px',
                        }
                      }} 
                    />
                  </ListItem>
                </Slide>
              ))}
            </List>
          </Box>
        </Slide>
      </Drawer>
    </>
  );
};
