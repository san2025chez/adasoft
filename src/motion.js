// Variants de framer-motion reutilizables entre secciones, para no
// duplicar la misma configuración de entrada/scroll-reveal en cada archivo.

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Props comunes para disparar el reveal una sola vez al entrar en viewport.
export const viewportOnce = { once: true, margin: '-80px' };
