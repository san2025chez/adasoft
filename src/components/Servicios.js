import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './Servicios.css';
import keyframes from '@emotion/styled';
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
 /*  {
    id: "9",
    title: "Reparación y Mantenimiento de Netbooks y PCs",
    description: "Servicio técnico especializado en reparación y mantenimiento de netbooks y computadoras. Diagnóstico preciso, limpieza interna, cambio de componentes y optimización para alargar la vida útil de tus equipos.",
    keywords: ["reparación de netbooks", "mantenimiento de PCs", "servicio técnico computadoras", "hardware", "optimización de equipos"]
  }, */
  {
    id: "10",
    title: "Instalación de Sistemas Operativos",
    description: "Instalación de sistemas operativos (Windows, Linux) con configuración personalizada. Formateo seguro, migración de datos y garantía de funcionamiento óptimo en tu dispositivo.",
    keywords: ["instalación de Windows", "formateo de PC", "instalación Linux", "sistemas operativos", "configuración de software"]
  },
  {
    id: "11",
    title: "Instalación de Programas y Antivirus",
    description: "Configuración e instalación de software esencial (ofimática, diseño, antivirus) para garantizar seguridad y productividad.",
    keywords: ["instalación de programas", "antivirus", "optimización de PC"]
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
    const handleScroll = () => {
      // Check if the component is in view and has not already rolled in
      if (inView && !roll) {
        setRoll(true);
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
        style={{
          padding: '20px 10px', margin: '20px 20px 20px ', textAlign: 'center', boxShadow: 'none',
          animation: roll ? `${rollInRight} 0.6s ease-out both` : 'none'
        }}
      >
        <Container maxWidth="lg" >
          <Typography variant="h2" style={{
            color: '#444',
            fontSize: isMobile ? '23px' : '30px',
            letterSpacing: '4px',
            marginBottom: '32px',
            fontWeight: 300,
            lineHeight: isMobile ? '23px' : '28px',
            textTransform: 'uppercase',
            padding: '15px'
          }}>
            Nuestros Servicios
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} md={3} key={service.id}>
                <Fade 
                  direction="up" 
                  triggerOnce={true} 
                  delay={index * 150}
                  fraction={0.1}
                >
                  <Card variant="outlined" style={{ borderRadius: "15px", border: "none", boxShadow: "none" }}>
                    <CardContent>
                      <Typography variant="h6" style={{ paddingBottom: '10px', textAlign: 'center' }}>{service.title}</Typography>
                      <StyledDescription style={{ textAlign: 'center' }}>
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
