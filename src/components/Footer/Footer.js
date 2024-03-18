import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Link } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsappIcon from '@material-ui/icons/WhatsApp'
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'linear-gradient(45deg, rgba(131, 84, 218, 0.1), rgba(54, 85, 224, 0.1) 100%), rgba(42, 27, 161, 0.7)',
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
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
        <Link href="https://walink.co/8ac4ac" target="_blank" rel="noopener noreferrer" color="inherit">
          <IconButton>
            <WhatsappIcon className={classes.icon} />
          </IconButton>
        </Link>
      </Toolbar>
      
    </AppBar>
  );
};

export default Footer;
