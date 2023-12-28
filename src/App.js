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
import { Formulario } from './components/Formulario'
import { NavBar } from "./components/NavBar";
import './App.css';
import styled from '@emotion/styled';


const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', // Azul claro
    },
    secondary: {
      main: '#1976d2', // Azul más oscuro para acentos
    },
  },
  typography: {
    fontFamily: 'Constantia, serif', // Reemplaza 'TuFuentePersonalizada' con la fuente que desees
  },
});

const App = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const GridItem = styled.div`
    background-image: url("${process.env.PUBLIC_URL}/images/metodologia.jpg");
    background-size: cover;
    background-position: center;
    height: 95%;
    box-shadow: none;
    margin-top: 20px;
    width: 100%;
    @media (max-width: 600px) {
      background-size: contain;
      background-repeat: no-repeat;
      height: 230px;
      width: 100%;
      marginTop: 50px
   
   
      box-shadow: none;
    }
  `;

  const GridItemNosotros = styled.div`
   
    background-size: cover;
    background-position: center;
    margin-top: 40px;
    height:95%;
    width: 100%;
    box-shadow: none;
 
    background-image: url('${process.env.PUBLIC_URL}/images/nosotros.jpg');
        @media (max-width: 600px) {
          background-size: contain;
          background-repeat: no-repeat;
          height: 270px;
          width: 100%;
          border: solid red
          marginTop: 50px
      
          

     
      
      
    }
  `;
  const TextComponent = styled.div`
 fontSize:20px,
 marginTop: 40px
 paddingTop: 40px
`;

  const GridPaper = styled(Paper)`
    padding: 0px;
    margin: 0px;
    box-shadow: none;
    background-image: url(${process.env.PUBLIC_URL}/images/miportada.jpg);
    background-size: cover;
    background-position: center;
    height: 500px;
    
    width: 100%
    position: relative;
    @media (max-width: 600px) {
 
      background-image: url(${process.env.PUBLIC_URL}/images/metodologia.jpg);
      background-size: contain;
      background-repeat: no-repeat;
      height: 300px

  
  
}
  `;
  const StyledPaper = styled(Paper)`
  
  margin-top: 30px;
  box-shadow: none;
  
 

  @media (max-width: 600px) {
    padding: 10px; // Tamaño de padding reducido para dispositivos móviles
    margin-top: 10px; // Tamaño de marginTop reducido para dispositivos móviles
    box-shadow: none
  }
`;

  const StyledPaper2 = styled(Paper)`
  padding: 30px,
   margin-top: 30px,
    margin-left: 10px,
     margin-right: 10px, 
     text-align: center, 
     box-Shadow: none
 

  @media (max-width: 600px) {
    padding: 10px; // Tamaño de padding reducido para dispositivos móviles
    margin-top: 10px; // Tamaño de marginTop reducido para dispositivos móviles
    box-shadow: none
  }
`;


  /* padding: '30px', marginTop: '30px', marginLeft: '10px', marginRight: '10px', textAlign: 'center', boxShadow: 'none' */
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" style={{ padding: 0, margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />

        <GridPaper

        >

        </GridPaper>
        <Container style={{ marginTop: '30px', padding: '30px' }}>
          <TextComponent>
            En Ada Software agregamos valor al área IT de las organizaciones a través de servicios administrados y personalizados. Contamos con un equipo experto a disposición de nuestros clientes, para que puedan aprovechar al máximo nuestra colaboración.

          </TextComponent>
        </Container>

        <Paper id="servicios" elevation={3} style={{ padding: '20px', margin: '20px 10px', textAlign: 'center', boxShadow: 'none' }}>
          <Container maxWidth="md" style={{ padding: '20px' }}>
            <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', color: '#1976d2' }}>Servicios</Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: '20px', boxShadow: 'none' }}>
                  <Typography variant="h5"> Managed Services</Typography>
                  <Typography >


                    En Ada Software agregamos valor al área IT de las organizaciones a través de servicios administrados y personalizados. Contamos con un equipo experto a disposición de nuestros clientes, para que puedan aprovechar al máximo nuestra colaboración.
                  </Typography>

                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: '20px', boxShadow: 'none' }}>
                  <Typography variant="h5" > IT Consulting</Typography>
                  <Typography>


                    Ayudamos a definir y alinear la estrategia de IT con la de la organización. Contamos con las habilidades y la experiencia adecuadas, brindamos herramientas que posibilitan mejorar y optimizar procesos, ahorrando tiempo y dinero, simplificando proyectos complejos y protegiendo los datos comerciales de nuestros clientes. En Ada Software transformamos negocios.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: '20px', boxShadow: 'none' }}>
                  <Typography variant="h5">Soluciones </Typography>
                  <Typography>Brindamos soluciones a medida de cada empresa, sin importar su tamaño. Les damos a nuestros clientes las herramientas para comprender y utilizar la tecnología en favor de sus proyectos. </Typography>
                </Paper>

              </Grid>
            </Grid>
          </Container>
        </Paper>
        <Paper id="metodologia" elevation={3} component={StyledPaper2} style={{ boxShadow: 'none' }}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}>Nuestra Metodología</Typography>
          {/* Cuadrícula para dividir en dos partes */}
          <Container maxWidth="md" style={{ padding: '0px', boxShadow: 'none' }}>
            <Grid container spacing={2} justifyContent="center" style={{ boxShadow: 'none' }}>
              <Grid item xs={12} md={6}>
                <GridItem
                ></GridItem>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* Contenido de la parte derecha (descripción) */}
                <Paper
                  id="metodologia"
                  style={{ boxShadow: 'none', marginTop: '20px' }}
                >
                  <Typography component="div">
                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                      Fase 1: Consultoría
                    </Typography>
                    <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
                      <li>Analizamos los procesos.</li>
                      <li>Detectamos oportunidades.</li>
                      <li>Evaluamos en qué parte del proceso agregar valor.</li>
                    </ul>

                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                      Fase 2: Propuesta
                    </Typography>
                    <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
                      <li>Ofrecemos soluciones, presentando nuestra propuesta de valor.</li>
                      <li>Exponemos los beneficios de implementarlas.</li>
                      <li>Analizamos el retorno de la inversión.</li>
                    </ul>

                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
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
        <Paper id="nosotros" elevation={3} component={StyledPaper2} style={{ boxShadow: 'none' }}>
         
            <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>Nosotros</Typography>
            {/* Cuadrícula para dividir en dos partes */}
            <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center">

              <Grid item xs={12} md={6}>
                {/* Contenido de la parte derecha (descripción) */}
                <Paper style={{ padding: '20px', marginTop: '20px', boxShadow: 'none' }}>
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
                <GridItemNosotros />
              </Grid>





            </Grid>
          </Container>
        </Paper>
        <Paper id="contacto" elevation={3} style={{ padding: '20px', marginTop: '20px', boxShadow: 'none' }}>
          <Container maxWidth="md" style={{ padding: '20px' }}>
            <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>Contacto</Typography>
            {/* Cuadrícula para dividir en dos partes */}
            <Typography variant="h5" color="primary" style={{ fontWeight: 'bold' }}>Comunicate</Typography>
            <Formulario></Formulario>
          </Container>
        </Paper>
        <Box component="footer" style={{ backgroundColor: '#333', color: 'white', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
          <Typography>Contacto:softadait@gmail.com</Typography>
          <Typography>&copy; ADASoftware 2023</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;