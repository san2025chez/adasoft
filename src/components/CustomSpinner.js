import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  spinner: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  image: {
    width: '100%', // Ajusta el tamaño de la imagen según tus necesidades
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3], // Agrega una sombra si lo deseas
  },
  text: {
    color: theme.palette.text.primary,
  },
}));

const CustomSpinner = () => {
  const classes = useStyles();

  // Acción o contenido adicional
  const renderAdditionalContent = () => (
    <>
      <img
        src={`${process.env.PUBLIC_URL}/images/logoada2.jpg`}
        alt="Fondo"
        className={classes.image}
      />
      <Typography variant="h6" className={classes.text}>
        Procesando datos...
      </Typography>
    </>
  );

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress className={classes.spinner} size={60} thickness={4} />
      {renderAdditionalContent()}
    </div>
  );
};

export default CustomSpinner;
