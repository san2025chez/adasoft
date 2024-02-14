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
import { Helmet } from 'react-helmet'
import Inicio from './components/inicio';
import Servicios from './components/Servicios';
import Footer from './components/Footer/Footer';


const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(42, 27, 161, 0.1)', // Azul claro
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
    background-image: url("${process.env.PUBLIC_URL}/images/metodologia-transformed.jpeg");
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
 
    background-image: url('${process.env.PUBLIC_URL}/images/nosotros2.jpeg');
        @media (max-width: 600px) {
          background-size: contain;
          background-repeat: no-repeat;
          height: 270px;
          width: 100%;
    
          marginTop: 50px
      
          

     
      
      
    }
  `;
  const TextComponent = styled.div`
 fontSize:20px,
 marginTop: 40px
 paddingTop: 40px
`;

  const GridPaper = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  box-shadow: none;
  height: 410px;
  width: 100%;
  position: relative;

  @media (max-width: 600px) {
    height: 150px;
    background-color: #2196F3;
    margin-top: 55px;

    img {
      width: 90%;
      height: 100%;
      object-fit: cover;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
  const StyledPaper = styled(Paper)`
 
    margin-top: 30px, 
    padding-top: 20px 
    
    box-shadow: none;
   @media (max-width: 767px): {  // Aplicar estilos para dispositivos con ancho máximo de 767px
      margin-top: 5px,  // Reducir marginTop para dispositivos móviles
      padding: 5px   
      box-shadow: none; // Reducir padding para dispositivos móviles
    }

`;

  const StyledPaper2 = styled(Paper)`
  padding: 0px,
   margin-top: 30px,
    margin-left: 103px,
     margin-right: 10px, 
     text-align: center, 
     box-Shadow: none
 

  @media (max-width: 600px) {
    padding: 10px; // Tamaño de padding reducido para dispositivos móviles
    margin-top: 10px; // Tamaño de marginTop reducido para dispositivos móviles
    box-shadow: none
  }
`;
  const containerStyles = {
    marginTop: '10px',
    padding: '10px',
    /*   display: 'flex', 
      flexDirection: 'column',
       alignItems: 'center' , */
  };

  const mobileStyles = {
    marginTop: '5px',
    padding: '3px'/*   display: 'flex', 
  flexDirection: 'column',
   alignItems: 'center' , */
  };



  /* padding: '30px', marginTop: '30px', marginLeft: '10px', marginRight: '10px', textAlign: 'center', boxShadow: 'none' */
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <CssBaseline />
      <Container maxWidth="xl" style={{ padding: 0, margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>


        <NavBar />
        <Paper id="inicio" elevation={3} style={{ textAlign: 'center', boxShadow: 'none' }}>

          <Inicio id="inicio" />
        </Paper>

<Servicios/>
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
                    <ul style={{ textAlign: 'left', marginLeft: '20px' ,fontSize: '15px' }}>
                      <li>Analizamos los procesos.</li>
                      <li>Detectamos oportunidades.</li>
                      <li>Evaluamos en qué parte del proceso agregar valor.</li>
                    </ul>

                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                      Fase 2: Propuesta
                    </Typography>
                    <ul style={{ textAlign: 'left', marginLeft: '20px',fontSize: '15px'  }}>
                      <li>Ofrecemos soluciones, presentando nuestra propuesta de valor.</li>
                      <li>Exponemos los beneficios de implementarlas.</li>
                      <li>Analizamos el retorno de la inversión.</li>
                    </ul>

                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left', marginLeft: '20px' }}>
                      Fase 3: Implementación
                    </Typography>
                    <ul style={{ textAlign: 'left', marginLeft: '20px',fontSize: '15px'  }}>
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
        <Paper id="nosotros" elevation={3} component={StyledPaper2} style={{ margin: '20px 10px', boxShadow: 'none' }}>

          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>Nosotros</Typography>
          {/* Cuadrícula para dividir en dos partes */}
          <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center">

              <Grid item xs={12} md={6}>
                {/* Contenido de la parte derecha (descripción) */}
                <Paper style={{ padding: '20px', marginTop: '20px', boxShadow: 'none' }}>
                  <Typography style={{fontSize: '15px' }}>


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
      
          <Footer/>

      </Container>
    </ThemeProvider>
  );
}

export default App;