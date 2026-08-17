import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Link, Typography, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { FaMapMarkerAlt } from 'react-icons/fa';

const StyledFooter = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  padding: '28px 0',
  marginTop: 'auto',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  '& .MuiIconButton-root': {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-2px)',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.8rem',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const socialLinks = [
  { href: 'https://www.instagram.com/adasoft.ar/', label: 'Instagram de ADASOFT', Icon: InstagramIcon },
  { href: 'https://www.linkedin.com/company/ada-software-argentina/', label: 'LinkedIn de ADASOFT', Icon: LinkedInIcon },
  { href: 'https://www.facebook.com/adasoftwareIT', label: 'Facebook de ADASOFT', Icon: FacebookIcon },
  { href: 'https://wa.link/lwpeuq', label: 'WhatsApp de ADASOFT', Icon: WhatsAppIcon },
];

const Footer = () => (
  <StyledFooter position="static">
    <StyledToolbar>
      <SocialIcons>
        {socialLinks.map(({ href, label, Icon }) => (
          <Link key={href} href={href} target="_blank" rel="noopener noreferrer" color="inherit">
            <IconButton size="large" aria-label={label}>
              <Icon />
            </IconButton>
          </Link>
        ))}
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

export default Footer;
