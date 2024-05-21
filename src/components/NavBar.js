import { useState } from "react";
import React, {useEffect} from 'react'
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

const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'metodologia', label: 'Metodología' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];
export const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navColor, setNavColor] = useState('#abe6e5');

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setDrawerOpen(false); // Cerrar el Drawer después de hacer clic en un elemento
      }
    };
    const handleScroll = () => {
      const offset = window.scrollY;
      const sectionHeight = window.innerHeight;
      const section = Math.floor(offset / sectionHeight);
      console.log("seccion", section);
    
      if (section === 1 || section === 2  || section === 3 || section === 4  ) {
        setNavColor('linear-gradient(45deg, rgba(131, 84, 218, 0.1), rgba(54, 85, 224, 0.1) 100%), rgba(42, 27, 161, 0.7)'); // Cambia el color del Navbar cuando se desplaza a la segunda sección
      } else {
        setNavColor('transparent'); // Vuelve al color original cuando se desplaza a otras secciones
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
    const drawerHeight = menuItems.length * 40;


  return (
<>
<AppBar 
  position="fixed" 
  sx={{
    background: '#abe6e5',
    boxShadow: 'none',
    zIndex: (theme) => theme.zIndex.drawer + 2,
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    border: 0
  }}
  md={{
    position: { sm: 'static' },
    background: '#abe6e5',    boxShadow: 'none',
    border: 0
  }}
  lg={{
    position: { sm: 'static' },
    background: '#abe6e5',
    boxShadow: 'none',
    border: 0
  }}
>
<Toolbar 
style={{ background: '#abe6e5',
height: '60px' }}>

    {/* Botón del menú para dispositivos móviles */}
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={() => toggleDrawer(true)}
      sx={{ mr: 2, display: { sm: 'none' } ,color: 'black'}}
    >
      <MenuIcon />
    </IconButton>

    {/* Título del navbar */}
    <div style={{ flexGrow: 1 }}>
      <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '10px', color: 'black' }}>
        ADA SOFT
      </Typography>
    </div>

    {/* Botones del menú para dispositivos de escritorio */}
    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
      {menuItems.map((item) => (
        <Button color="inherit" key={item.id} onClick={() => scrollToSection(item.id)} style={{ color: 'black' }}>
          {item.label}
        </Button>
      ))}
    </Box>
  </Toolbar>
</AppBar>


<Drawer
        anchor="left" // Cambia el anchor a top para que el Drawer se despliegue desde arriba hacia abajo
        open={drawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            marginTop: '56px', // Altura del Navbar
            background: '#abe6e5',
                }        }}
        onClose={() => toggleDrawer(false)}
      >
  <Box sx={{ width: '100%'}} > {/* Cambia el color de fondo aquí */}
  <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      {menuItems.map((item) => (
        <ListItem button key={item.id} onClick={() => scrollToSection(item.id)} sx={{ width: '100%', textAlign: 'center' }}>
          <ListItemText primary={item.label}  sx={{ color: 'black' }} />
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>
</>

  )
}
