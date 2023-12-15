import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Formulario} from './components/Formulario'
import { NavBar } from './components/NavBar';
const theme = createTheme({
  palette: {
    primary: {
      main:'#FFFFFF', // Azul claro
    },
    secondary: {
      main: '#1976d2', // Azul más oscuro para acentos
    },
  },
});

const App = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" style={{ padding: 0, margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar/>
        <Paper id="inicio" elevation={3} style={{ padding: '0px', marginTop: '0px',boxShadow: 'none'  }}>

          <img
            src="images/miportada.jpg"
            alt="Descripción de la imagen"
            style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
          />
          
        </Paper>
        <Paper id="servicios" elevation={3} style={{ padding: '20px', margin: '20px 10px', textAlign: 'center',boxShadow: 'none' }}>
        <Container maxWidth="md" style={{ padding: '20px' }}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold' ,color: '#1976d2'}}>Servicios</Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h5"> Managed Services</Typography>
                <Typography>
                

                  En Ada Software agregamos valor al área IT de las organizaciones a través de servicios administrados y personalizados. Contamos con un equipo experto a disposición de nuestros clientes, para que puedan aprovechar al máximo nuestra colaboración.
                </Typography>
            
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: '20px', boxShadow: 'none'  }}>
                <Typography variant="h5" > IT Consulting</Typography>
                <Typography>
                 

                  Ayudamos a definir y alinear la estrategia de IT con la de la organización. Contamos con las habilidades y la experiencia adecuadas, brindamos herramientas que posibilitan mejorar y optimizar procesos, ahorrando tiempo y dinero, simplificando proyectos complejos y protegiendo los datos comerciales de nuestros clientes. En Ada Software transformamos negocios.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: '20px',boxShadow: 'none'  }}>
                <Typography variant="h5">Soluciones </Typography>
                <Typography>Brindamos soluciones a medida de cada empresa, sin importar su tamaño. Les damos a nuestros clientes las herramientas para comprender y utilizar la tecnología en favor de sus proyectos. </Typography>
              </Paper>
            </Grid>
          </Grid>
          </Container>
        </Paper>
        <Paper id="metodologia" elevation={3} style={{ padding: '30px', marginTop: '30px', marginLeft: '10px', marginRight: '10px', textAlign: 'center',boxShadow: 'none' }}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold',color: '#1976d2' }}>Nuestra Metodología</Typography>
          {/* Cuadrícula para dividir en dos partes */}
          <Container maxWidth="md" style={{ padding: '5px' }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              {/* Contenido de la parte izquierda (imagen) */}
              <img
                src="images/metodologia.jpg"
                alt="Imagen de la metodología"
                style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Contenido de la parte derecha (descripción) */}
              <Paper style={{ padding: '20px', marginTop: '20px' ,boxShadow: 'none' }}>

                <Typography component="div">
                  <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                    Fase 1: Consultoría
                  </Typography>
                  <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
                    <li>Analizamos los procesos.</li>
                    <li>Detectamos oportunidades.</li>
                    <li>Evaluamos en qué parte del proceso agregar valor.</li>
                  </ul>

                  <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                    Fase 2: Propuesta
                  </Typography>
                  <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
                    <li>Ofrecemos soluciones, presentando nuestra propuesta de valor.</li>
                    <li>Exponemos los beneficios de implementarlas.</li>
                    <li>Analizamos el retorno de la inversión.</li>
                  </ul>

                  <Typography variant="h5" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                    Fase 3: Implementación
                  </Typography>
                  <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
                    <li>Comenzamos el proceso de implementación.</li>
                    <li>Damos soporte.</li>
                    <li>Realizamos seguimiento de los cambios.</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          </Container>
        </Paper>
        <Paper id="nosotros" elevation={3} style={{ padding: '30px', marginTop: '30px',boxShadow: 'none'  }}>
        <Container maxWidth="md" style={{ padding: '20px' }}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold',color: '#1976d2', textAlign: 'center'  }}>Nosotros</Typography>
          {/* Cuadrícula para dividir en dos partes */}
         
          <Grid container spacing={2} justifyContent="center">

            <Grid item xs={12} md={6}>
              {/* Contenido de la parte derecha (descripción) */}
              <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography>


                  En ADA SOFTWARE no trabajamos de manera estandarizada, sino que adaptamos las mejoras a cada organización, según sus necesidades y sus proyecciones. Nuestras soluciones son a medida de cada cliente.

                  Contamos con años de trayectoria en el mercado que nos permiten analizar, proponer mejoras, resolver problemas y generar cambios superadores desde una mirada experimentada y profesional.

                  Trabajamos codo a codo con cada cliente para resolver, optimizar y generar nuevos proyectos.

                  Somos el aliado que tu equipo de trabajo necesita.
                  Somos ADA SOFTWARE – Fabricamos soluciones.

                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Contenido de la parte izquierda (imagen) */}
              <img
                src="images/nosotros.jpg"
                alt="Imagen de la metodología"
                style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
              />
            </Grid>

          </Grid>
          </Container>
        </Paper>
        <Paper id="contacto" elevation={3} style={{ padding: '20px', marginTop: '20px' ,boxShadow: 'none' }}>
          <Container maxWidth="md" style={{ padding: '20px' }}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold',color: '#1976d2', textAlign: 'center'  }}>Contacto</Typography>
          {/* Cuadrícula para dividir en dos partes */}
          <Typography variant="h5" color="primary" style={{ fontWeight: 'bold' }}>Comunicate</Typography>
       <Formulario></Formulario>
       </Container>
        </Paper>
        <Box component="footer" style={{ backgroundColor: '#333', color: 'white', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
          <Typography>Contacto: info@tusoftwarefactory.com</Typography>
          <Typography>&copy; ADA Software 2023</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;