import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Formulrio.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
    '& fieldset': {
      borderColor: 'rgba(15, 23, 42, 0.15)',
    },
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 4px rgba(15, 184, 178, 0.15)',
    },
  },
  '& .MuiInputLabel-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '0 6px',
  },
};

export const Formulario = () => {
  const form = useRef();

  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value,
    };

    emailjs.sendForm(
      'service_wzijndk',
      'template_49qbndc',
      form.current,
      { publicKey: 'XT5EO2oI14qIFykvW' }
    ).then(
      () => {
        form.current.reset();
        setSnackbar({ open: true, severity: 'success', message: 'Correo enviado con éxito.' });
      },
      () => {
        // Reintento con el método alternativo de EmailJS si sendForm falla
        emailjs.send(
          'service_wzijndk',
          'template_49qbndc',
          templateParams,
          { publicKey: 'XT5EO2oI14qIFykvW' }
        ).then(
          () => {
            form.current.reset();
            setSnackbar({ open: true, severity: 'success', message: 'Correo enviado con éxito.' });
          },
          () => {
            setSnackbar({ open: true, severity: 'error', message: 'No pudimos enviar tu mensaje. Intentá nuevamente en unos minutos.' });
          }
        );
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="field contact">
      <TextField
        label="Nombre"
        name="user_name"
        required
        fullWidth
        margin="normal"
        className="my-input"
        sx={textFieldStyle}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Correo Electrónico"
        name="user_email"
        type="email"
        required
        fullWidth
        margin="normal"
        className="my-input"
        sx={textFieldStyle}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Mensaje"
        name="message"
        required
        fullWidth
        margin="normal"
        className="my-input"
        sx={textFieldStyle}
        InputLabelProps={{ shrink: true }}
        multiline
        rows={6}
      />

      <Button
        variant="contained"
        type="submit"
        color="primary"
        size="large"
        sx={{
          display: 'block',
          margin: '20px auto 0',
          px: 5,
          py: 1.2,
        }}
      >
        Enviar
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
