import { useState } from "react";
import React from 'react'
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

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setDrawerOpen(false); // Cerrar el Drawer después de hacer clic en un elemento
      }
    };
  
    const toggleDrawer = (open) => {
      setDrawerOpen(open);
    };

  return (
<>
    <AppBar position="static" color="primary">
          <Toolbar>
            {/* Botón del menú para dispositivos móviles */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Título del navbar */}
            <div style={{ flexGrow: 1 }}>
              <Typography variant="h5" style={{ fontWeight: 'bold', paddingTop: '10px' }}>
                ADA Software
              </Typography>
            </div>

            {/* Botones del menú para dispositivos de escritorio */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {menuItems.map((item) => (
                <Button color="inherit" key={item.id} onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer para dispositivos móviles */}
        <Drawer anchor="left" open={drawerOpen}
          sx={{
            // Añadir estilos específicos del Drawer para dispositivos móviles
            '& .MuiDrawer-paper': {
              width: '60vw', // Ajusta el ancho como desees
             
            },
          }}
         onClose={() => toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.id} onClick={() => scrollToSection(item.id)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
</>

  )
}
