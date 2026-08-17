import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '@mui/material/styles';

// Referencia estable: ParticlesProvider exige que `init` no cambie entre renders.
const initEngine = async (engine) => {
  await loadSlim(engine);
};

const ParticlesBackground = ({ id = 'tsparticles-hero' }) => {
  const theme = useTheme();
  const accentColor = theme.palette.primary.main;
  const isMobile = useMediaQuery('(max-width:600px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: !prefersReducedMotion, mode: 'grab' },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
      },
    },
    particles: {
      color: { value: accentColor },
      links: {
        color: accentColor,
        distance: 130,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: !prefersReducedMotion,
        speed: 0.6,
        outModes: { default: 'bounce' },
      },
      number: {
        value: isMobile ? 20 : 45,
        density: { enable: true, width: 900, height: 900 },
      },
      opacity: { value: 0.45 },
      size: { value: { min: 1, max: 3 } },
    },
  }), [isMobile, prefersReducedMotion, accentColor]);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <ParticlesProvider init={initEngine}>
        <Particles
          id={id}
          options={options}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </ParticlesProvider>
    </Box>
  );
};

export default ParticlesBackground;
