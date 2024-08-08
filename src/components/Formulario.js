import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Formulario = () => {
  const form = useRef();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_mo6xcsa', 'template_49qbndc', form.current, 'XT5EO2oI14qIFykvW')
      .then((result) => {
        console.log(result.text);
        form.current.reset();
        setOpenSnackbar(true);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className='field'>
      <TextField
        label="Nombre"
        name="user_name"
        className="my-input"
        style={{ marginTop: '10px' }}
      />
      <TextField
        label="Correo Electronico"
        name="user_email"
        className="my-input"
        style={{ marginTop: '10px' }}
      />
      <TextField
        label="Mensaje"
        name="message"
        className="my-input"
        style={{ marginTop: '10px', width: '100%', minHeight: '200px' }}
        multiline
        rows={6}
      />

      <Button variant="contained" type="submit" style={{ marginTop: '10px', backgroundColor: '#19d8db', color:'black' }}>
        Enviar
      </Button>


      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Correo enviado con éxito.
        </Alert>
      </Snackbar>
    </form>
  );
};

