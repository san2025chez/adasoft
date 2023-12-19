import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Formulrio.css'
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
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_mo6xcsa', 'template_49qbndc', form.current, 'XT5EO2oI14qIFykvW')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className='field'>
   <TextField
  label="Name"
  name="user_name"
  className="my-input"
  style={{ marginTop: '10px' }}
/>
<TextField
  label="Email"
  name="user_email"
  className="my-input"
  style={{ marginTop: '10px' }}
/>
<TextField
  label="Message"
  name="message"
  className="my-input"
  style={{ marginTop: '10px', width: '100%', minHeight: '200px' }}
  multiline
  rows={6} 
/>

<Button variant="contained"  type="submit" style={{ marginTop: '10px', backgroundColor:'blue', }}>
        Enviar
      </Button>
  </form>
  );
};
