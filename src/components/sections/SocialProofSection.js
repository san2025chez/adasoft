import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

// Placeholders genéricos: reemplazar por logos reales de clientes cuando estén disponibles.
const placeholders = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5'];

const clients = [
  {
    name: 'Préstamos Perico',
    logo: '/logos/prestamo.png',
    url: 'https://prestamosperico.netlify.app/',
    description: 'Préstamos personales con empeño, rápidos y confiables.',
  },
  ...placeholders.map((name) => ({ name })),
];

const track = [...clients, ...clients];

const SocialProofSection = () => (
  <Box
    component="section"
    sx={{
      backgroundColor: 'background.default',
      py: { xs: 4, md: 5 },
      borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      borderBottom: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    }}
  >
    <Typography
      variant="body2"
      align="center"
      sx={{ color: 'text.secondary', mb: 3, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}
    >
      Empresas que confían en nuestro trabajo
    </Typography>

    <Box
      sx={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        '@media (prefers-reduced-motion: reduce)': {
          '& > div': { animation: 'none' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 4, md: 6 },
          width: 'max-content',
          animation: 'adasoft-logo-marquee 22s linear infinite',
          '@keyframes adasoft-logo-marquee': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-50%)' },
          },
        }}
      >
        {track.map((client, index) =>
          client.logo ? (
            <Box
              key={`${client.name}-${index}`}
              component="a"
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              title={client.description}
              sx={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                width: { xs: 110, sm: 130, md: 150 },
                height: { xs: 76, sm: 84, md: 90 },
                px: 1.5,
                py: 1,
                borderRadius: 2,
                border: (theme) => `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.75 },
              }}
            >
              <Box
                component="img"
                src={client.logo}
                alt={`${client.name} - ${client.description}`}
                sx={{ width: '100%', height: { xs: 40, sm: 46, md: 52 }, objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  lineHeight: 1.2,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {client.name}
              </Typography>
            </Box>
          ) : (
            <Box
              key={`${client.name}-${index}`}
              sx={{
                flexShrink: 0,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                border: (theme) => `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
              }}
            >
              {client.name}
            </Box>
          )
        )}
      </Box>
    </Box>
  </Box>
);

export default SocialProofSection;
