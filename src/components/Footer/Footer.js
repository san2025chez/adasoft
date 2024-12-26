import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Link, useMediaQuery } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import Typography from '@mui/material/Typography';
import { FaMapMarkerAlt } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#fff',
    top: 'auto',
    bottom: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  icon: {
   
    fontSize: 30,
    marginRight: theme.spacing(1),
  },
  copyright: {
    color: '#777',
    textAlign: 'center',
    fontSize:13,
    fontFamily: 'Poppins, sans-serif',
  }
}));

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
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
        <Location address="Perico, Jujuy" />
        <div className={classes.row}>
          <Typography variant="body2" className={classes.copyright}>
          &copy;2024 Creado por <Link href="https://adasoft.com.ar/" target="_blank" rel="noopener noreferrer" color="inherit">AdaSoft</Link>.
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const Location = ({ address }) => {
  const classes = useStyles();
  return (
    <p  className={classes.copyright}>
      <FaMapMarkerAlt /> {address}
    </p>
  );
};

export default Footer;
