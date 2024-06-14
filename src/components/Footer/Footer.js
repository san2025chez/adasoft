import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Link } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#8bdedd',
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column', // Cambiado a column para alinear los elementos en columnas
    alignItems: 'center', // Para centrar horizontalmente los elementos
    padding: theme.spacing(2), // Espaciado entre las filas
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1), // Espaciado entre las filas
  },
  icon: {
    color: 'black',
    fontSize: 30,
    marginRight: theme.spacing(1), // Espacio entre el icono y el texto
  },
  copyright: {
    color: 'black',
    textAlign: 'center', // Alinear el texto al centro
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* Primera fila */}
        <div className={classes.row}>
          <Link href="https://www.instagram.com/adasoft_tech?utm_source=qr&igsh=enQ0Zm1uanZvNzNy" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton>
              <InstagramIcon className={classes.icon} />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/company/101532286/admin/feed/posts/?feedType=following" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton>
              <LinkedInIcon className={classes.icon} />
            </IconButton>
          </Link>
          <Link href="https://www.facebook.com/adasoftwareIT/" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton>
              <FacebookIcon className={classes.icon} />
            </IconButton>
          </Link>
          <Link href="https://wa.link/3311zp" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton>
              <WhatsappIcon className={classes.icon} />
            </IconButton>
          </Link>
        </div>

        {/* Segunda fila */}
        <div className={classes.row}>
          <Typography variant="body2" className={classes.copyright}>
          &copy;2024 Creado por <Link href="https://adasoft.com.ar/" target="_blank" rel="noopener noreferrer" color="inherit">AdaSoft</Link>.
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
