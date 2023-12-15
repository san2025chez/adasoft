import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB', // Azul claro
    },
    secondary: {
      main: '#1976d2', // Azul más oscuro para acentos
    },
  },
});

export const Formulario = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (campo) => (event) => {
    setFormulario({ ...formulario, [campo]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario
    console.log('Datos del formulario:', formulario);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        value={formulario.nombre}
        onChange={handleChange('nombre')}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={formulario.email}
        onChange={handleChange('email')}
      />
      <TextField
        label="Asunto"
        fullWidth
        margin="normal"
        value={formulario.asunto}
        onChange={handleChange('asunto')}
      />
      <TextField
        label="Mensaje"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={formulario.mensaje}
        onChange={handleChange('mensaje')}
      />
      <Button variant="contained" style={{backgroundColor:'#1976d2'}} type="submit">
        Enviar
      </Button>
    </form>
  );
};