import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Link, useMediaQuery, Typography, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const StyledFooter = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#19d8db',
  padding: '20px 0',
  marginTop: 'auto',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

const SocialIcons = styled(Box)({
  display: 'flex',
  gap: '10px',
  '& .MuiIconButton-root': {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.8rem',
  },
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.9rem',
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledFooter position="static">
      <StyledToolbar>
        <SocialIcons>
          <Link href="https://www.instagram.com/adasoft.ar/" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton size="large">
              <InstagramIcon />
            </IconButton>
          </Link>
          <Link href="https://www.linkedin.com/company/ada-software-argentina/" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton size="large">
              <LinkedInIcon />
            </IconButton>
          </Link>
          <Link href="https://www.facebook.com/adasoft.ar" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton size="large">
              <FacebookIcon />
            </IconButton>
          </Link>
          <Link href="https://wa.link/3311zp" target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton size="large">
              <WhatsAppIcon />
            </IconButton>
          </Link>
        </SocialIcons>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <StyledTypography variant="body2">
            <FaMapMarkerAlt />Jujuy, Argentina
          </StyledTypography>
          <StyledTypography variant="body2">
            &copy; {new Date().getFullYear()} ADA SOFTWARE. Todos los derechos reservados.
          </StyledTypography>
        </Box>
      </StyledToolbar>
    </StyledFooter>
  );
};

export default Footer;
