import React, { useState, useEffect } from 'react';
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

// No es necesario inicializar EmailJS de esta manera con la nueva versión

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
    console.log("Formulario a enviar:", form.current);
    
    // Primero verificamos que el formulario tiene los campos necesarios
    const formData = new FormData(form.current);
    console.log("Contenido del formulario:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Para depurar, creamos un objeto con los datos del formulario
    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value
    };
    
    console.log("Enviando con parámetros:", templateParams);
    
    // Utilizando la forma recomendada por EmailJS
    emailjs.sendForm(
      'service_wzijndk',  // Tu Service ID actualizado
      'template_49qbndc', // Tu Template ID
      form.current, 
      {
        publicKey: 'XT5EO2oI14qIFykvW', // Tu Public Key
      }
    )
      .then((result) => {
        console.log('SUCCESS!', result.text);
        form.current.reset();
        setOpenSnackbar(true);
      }, (error) => {
        console.error('FAILED...', error.text);
        console.error('Error completo:', error);
        
        // Si falla sendForm, intentamos el método alternativo con send
        console.log("Intentando método alternativo...");
        
        emailjs.send(
          'service_wzijndk',
          'template_49qbndc',
          templateParams,
          {
            publicKey: 'XT5EO2oI14qIFykvW',
          }
        ).then(
          (result) => {
            console.log('ÉXITO CON MÉTODO ALTERNATIVO!', result.text);
            form.current.reset();
            setOpenSnackbar(true);
          },
          (error) => {
            console.error('AMBOS MÉTODOS FALLARON:', error.text);
            alert('Error al enviar el formulario: ' + error.text);
          }
        );
      });
  };

  const textFieldStyle = {
    marginTop: '10px',
    '& .MuiOutlinedInput-root': {
      border: 'none',
      borderRadius: '50px',
      boxShadow: '0 0 5px 0 red',
      fontSize: '12px',
      height: 'auto',
      padding: '12px 30px',
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover, &:focus': {
        boxShadow: '0 0 15px 0 red',
        animation: '$pulseRed 1.5s infinite',
      },
    },
    '@keyframes pulseRed': {
      '0%': {
        boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.7)',
      },
      '70%': {
        boxShadow: '0 0 0 10px rgba(255, 0, 0, 0)',
      },
      '100%': {
        boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)',
      },
    },
    '@media (max-width: 768px)': {
      '& .MuiOutlinedInput-root': {
        boxShadow: '0 0 5px 0 red',
      },
    },
    '@media (max-width: 576px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        paddingBottom: '10px',
        paddingTop: '10px',
      },
    },
  };

  return (
    <form ref={form} onSubmit={sendEmail} className='field contact' >
      <TextField
        label="Nombre"
        name="user_name"
        className="my-input"
        style={{
          ...textFieldStyle,
          '& .MuiInputLabel-root': {
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '0 5px',
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Correo Electronico"
        name="user_email"
        className="my-input"
        style={{
          ...textFieldStyle,
          '& .MuiInputLabel-root': {
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '0 5px',
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Mensaje"
        name="message"
        className="my-input"
        style={{
          ...textFieldStyle,
          '& .MuiInputLabel-root': {
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '0 5px',
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        multiline
        rows={6}
      />

      <Button 
        variant="contained" 
        type="submit" 
        style={{ 
          marginTop: '10px', 
          backgroundColor: '#18e7d3', 
          color: '#fff',
          backgroundSize: '300% 100%',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '14px',
          padding: '10px 40px',
          textTransform: 'uppercase',
          transition: 'all .4s ease-in-out',
          display: 'block',
          margin: '10px auto 0',
          fontWeight: 400,
          lineHeight: 1.5,
          backgroundPosition: '100% 0',
          '&:hover': {
            color: '#212529',
            textDecoration: 'none'
          }
        }}
      >
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
