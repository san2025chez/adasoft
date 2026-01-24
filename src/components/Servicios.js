import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import './Servicios.css';
import { keyframes } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Fade } from 'react-awesome-reveal'
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

const rollInRight = keyframes`
0% {
  -webkit-transform: translateX(1000px);
          transform: translateX(1000px);
  opacity: 0;
}
100% {
  -webkit-transform: translateX(0);
          transform: translateX(0);
  opacity: 1;
}`

const floatSlow = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
  50% { transform: translate3d(0, -14px, 0) rotate(2deg); }
`;

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(18px, -8px, 0); }
`;

const pulseSpin = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
  50% { transform: translate3d(-10px, 10px, 0) rotate(6deg) scale(1.03); }
`;

const StyledDescription = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  text-align: left;
  color: #777;
  font-size: 15px;
  letter-spacing: .03em;
  line-height: 1.8em;
  text-transform: capitalize;
`;

// Definición de servicios con descripciones optimizadas para SEO
const services = [
  {
    id: "1",
    title: "Landing Page",
    description: "Desarrollamos Landing Pages profesionales que convierten visitantes en clientes. Diseño web personalizado, responsive y optimizado para SEO que impulsa tu negocio online y maximiza tus conversiones.",
    keywords: ["landing page", "diseño web", "conversión", "página de aterrizaje", "responsive"]
  },
  {
    id: "2",
    title: "Desarrollo de Aplicaciones Web",
    description: "Creamos aplicaciones web a medida que potencian tu negocio. Implementamos soluciones tecnológicas innovadoras con interfaces intuitivas, adaptadas a tus necesidades específicas para mejorar la eficiencia y productividad.",
    keywords: ["aplicaciones web", "desarrollo web", "software personalizado", "aplicaciones a medida", "soluciones digitales"]
  },
  {
    id: "3",
    title: "Tiendas Online",
    description: "Diseñamos y desarrollamos tiendas online efectivas que impulsan tus ventas. E-commerce personalizado con pasarelas de pago seguras, gestión de inventario y experiencia de usuario óptima para maximizar tus conversiones.",
    keywords: ["tienda online", "e-commerce", "comercio electrónico", "venta online", "tienda virtual"]
  },
  {
    id: "4",
    title: "Mantenimiento",
    description: "Servicio profesional de mantenimiento web que garantiza la seguridad, rendimiento y actualización de tu sitio. Monitoreo continuo, backups regulares y soporte técnico para mantener tu presencia online siempre funcionando perfectamente.",
    keywords: ["mantenimiento web", "soporte técnico", "actualización", "seguridad web", "rendimiento"]
  },
  {
    id: "5",
    title: "Integración de Inteligencia Artificial",
    description: "Implementamos soluciones de Inteligencia Artificial que transforman tu negocio. Desde chatbots inteligentes hasta análisis predictivo y automatización de procesos, nuestra tecnología AI potencia la eficiencia y competitividad de tu empresa.",
    keywords: ["inteligencia artificial", "IA", "machine learning", "automatización", "chatbots", "análisis predictivo"]
  },
  {
    id: "6",
    title: "Desarrollo de Software a Medida",
    description: "Desarrollamos software personalizado que se adapta perfectamente a los procesos de tu empresa. Soluciones tecnológicas a medida que optimizan operaciones, mejoran la eficiencia y resuelven problemas específicos de tu negocio.",
    keywords: ["software a medida", "desarrollo personalizado", "aplicaciones de negocio", "soluciones empresariales", "desarrollo de sistemas"]
  },
  {
    id: "7",
    title: "Clases de Informática y Programación",
    description: "Ofrecemos formación especializada en informática y programación con métodos didácticos adaptados a cada nivel. Aprende desarrollo web, programación, bases de datos y nuevas tecnologías con nuestros planes de aprendizaje personalizados.",
    keywords: ["clases programación", "formación informática", "aprendizaje tecnológico", "cursos desarrollo web", "educación digital"]
  },
  {
    id: "8",
    title: "Consultoría en Arquitectura de Software",
    description: "Consultoría experta en arquitectura de software para optimizar tus proyectos tecnológicos. Asesoramiento estratégico para diseñar sistemas escalables, seguros y eficientes que impulsen el crecimiento sostenible de tu negocio.",
    keywords: ["consultoría software", "arquitectura de sistemas", "asesoramiento tecnológico", "diseño de soluciones", "optimización de procesos"]
  },
  {
    id: "9",
    title: "Instalación de Sistemas Operativos",
    description: "Instalación de sistemas operativos (Windows, Linux) con configuración personalizada. Formateo seguro, migración de datos y garantía de funcionamiento óptimo en tu dispositivo",
    keywords: ["formateo", "instalación", "sistemas operativos", "asesoramiento tecnológico", "diseño de soluciones", "optimización de procesos"]
  },
  {
    id: "10",
    title: "Instalación de Programas y Antivirus",
    description: "Configuración e instalación de software esencial (ofimática, diseño, antivirus) para garantizar seguridad y productividad.",
    keywords: ["formateo", "instalación", "sistemas operativos", "antivirus", "diseño de soluciones", "optimización de procesos"]
  } 
];

const Servicios = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-50px 0px',
  });

  const [roll, setRoll] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (inView && !roll) setRoll(true);
  }, [inView, roll]);

  // Crear esquema de datos estructurados para los servicios
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "ADASOFT",
        "url": "https://adasoft.com.ar"
      },
      "serviceType": service.title
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>
      
      <Paper
        id="servicios"
        elevation={3}
        className="servicios-root"
        ref={ref}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          boxShadow: 'none',
          borderRadius: { xs: 0, md: 4 },
          mx: { xs: 0, md: 2.5 },
          my: { xs: 0, md: 2.5 },
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 7, sm: 8, md: 10 },
          // Color base de la sección (los títulos se definen abajo; la descripción se fuerza aparte)
          color: '#212529',
          backgroundColor: '#fff',
          animation: roll ? `${rollInRight} 0.6s ease-out both` : 'none',
        }}
      >
        {/* Todas las imágenes van detrás del contenido y conservan su color original */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team-bg.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          sx={{
            position: 'absolute',
            inset: { xs: '-10%', md: '-20%' },
            width: '140%',
            height: '140%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 1,
          }}
        />

        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          sx={{
            position: 'absolute',
            left: { xs: '50%', md: '55%' },
            top: { xs: '52%', md: '50%' },
            transform: 'translate(-50%, -50%)',
            width: { xs: 220, sm: 320, md: 420 },
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 1,
            animation: `${pulseSpin} 11s ease-in-out infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
        {/* Decoración animada (solo visual) */}
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team1.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="servicios-deco servicios-deco--a"
          sx={{
            position: 'absolute',
            left: { xs: '-28px', sm: '-16px', md: '24px' },
            top: { xs: '38px', sm: '44px', md: '54px' },
            width: { xs: 120, sm: 160, md: 220 },
            height: 'auto',
            opacity: 1,
            zIndex: 0,
            animation: `${floatSlow} 7.5s ease-in-out infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/team3.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="servicios-deco servicios-deco--b"
          sx={{
            position: 'absolute',
            right: { xs: '-36px', sm: '-18px', md: '28px' },
            bottom: { xs: '18px', sm: '22px', md: '34px' },
            width: { xs: 140, sm: 190, md: 260 },
            height: 'auto',
            opacity: 1,
            zIndex: 0,
            animation: `${drift} 9s ease-in-out infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Estilo/tipografía igual a la sección Metodología */}
          <Typography
            variant="h2"
            sx={{
              // Re-override del título para mantener jerarquía (no 15px)
              color: '#444',
              fontSize: `${isMobile ? '22px' : '30px'} !important`,
              letterSpacing: '4px !important',
              marginBottom: '32px',
              fontWeight: 300,
              lineHeight: `${isMobile ? '23px' : '28px'} !important`,
              textTransform: 'uppercase !important',
              padding: '15px',
            }}
          >
            Nuestros Servicios
          </Typography>

          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {services.map((service, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={service.id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Fade 
                  direction="up" 
                  triggerOnce={true} 
                  delay={index * 150}
                  fraction={0.1}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      width: '100%',
                      maxWidth: '300px', // igual que Metodología
                      height: '100%',
                      borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.08)',
                      backgroundColor: '#fff',
                      boxShadow: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out, border-color 180ms ease',
                      '&:hover': {
                        transform: { xs: 'none', md: 'translateY(-5px)' },
                        borderColor: 'rgba(25, 216, 219, 0.55)',
                      },
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          pb: 1.2,
                          textAlign: 'center',
                          // Re-override del título de card para mantener jerarquía (no 15px)
                          color: '#222',
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                          fontSize: { xs: '1.05rem', md: '1.1rem' },
                          lineHeight: 1.4,
                          textTransform: 'none',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <StyledDescription
                        className="service-description"
                        sx={{
                          flexGrow: 1,
                          color: '#777 !important',
                        }}
                      >
                        {service.description}
                      </StyledDescription>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default Servicios;
