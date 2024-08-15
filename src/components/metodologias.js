import React from 'react';
import { Paper, Typography, Container, Grid, Card, CardContent, Box, useMediaQuery } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';

const StyledPaper2 = styled(Paper)`
  background-image: url(${process.env.PUBLIC_URL}/images/team-bg.png);
  background-size: cover;
  background-position: center;
  padding: 40px 0;
  position: relative;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  background-color: transparent;
  box-shadow: none;
  &:hover {
    transform: translateY(-5px);
  }
`;

const PhoneImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  @media (max-width: 960px) {
    margin-bottom: 30px;
  }
`;

const TeamCircle1 = styled.div`
  bottom: 200px;
  left: 100px;
  position: absolute;
  top: auto;
  animation: movebounce 2.8s linear infinite;
  z-index: 1;
  
  @media (max-width: 1366px) {
    left: 60px;
    top: auto;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  @keyframes movebounce {
    0% { transform: translateY(0px); }
    50% { transform: translateY(20px); }
    100% { transform: translateY(0px); }
  }
`;

const TeamCircle2 = styled.div`
  left: 180px;
  bottom: 100px;
  position: absolute;
  top: auto;
  animation: movebounce 3s linear infinite;
  z-index: 1;
  
  @media (max-width: 1366px) {
    left: 10px;
    top: auto;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const IndexImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const StyledDescription = styled.li`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  text-align: left;
  color: #777;
  font-size: 15px;
  letter-spacing: .03em;
  line-height: 1.8em;
  text-transform: capitalize;
`;

const StyledTitle = styled(Typography)`
  color: #444;
  font-size: ${props => props.isMobile ? '22px' : '30px'};
  letter-spacing: 4px;
  margin-bottom: 32px;
  font-weight: 300;
  line-height: ${props => props.isMobile ? '23px' : '28px'};
  text-transform: uppercase;
`;

const Metodologias = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fases = [
    {
      titulo: "Consultoría",
      items: [
        "Analizamos los procesos.",
        "Detectamos oportunidades.",
        "Evaluamos en qué parte del proceso agregar valor."
      ],
      imagen: "images/engranage.png"
    },
    {
      titulo: "Propuesta",
      items: [
        "Ofrecemos soluciones, presentando nuestra propuesta de valor.",
        "Exponemos los beneficios de implementarlas.",
        "Analizamos el retorno de la inversión."
      ],
      imagen: "images/support.png"
    },
    {
      titulo: "Implementación",
      items: [
        "Comenzamos el proceso de implementación.",
        "Damos soporte.",
        "Realizamos seguimiento de los cambios."
      ],
      imagen: "images/perfomance.png"
    }
  ];

  return (
    <StyledPaper2 id="metodologia" elevation={3} style={{ boxShadow: 'none' }}>
      <StyledTitle variant="h2" color="primary" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }} isMobile={isMobile}>Metodología</StyledTitle>
      <Container maxWidth="lg" style={{ padding: '0px', boxShadow: 'none' }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative',
            width: '100%',
            zIndex: 2
          }}>
            <Fade cascade triggerOnce>
              <Grid container spacing={3} justifyContent="center">
                {fases.map((fase, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    <StyledCard style={{ width: '100%', maxWidth: '300px' }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
                          <IndexImage src={`${process.env.PUBLIC_URL}/${fase.imagen}`} alt={`Fase ${index + 1}`} />
                          <Typography variant="h6" style={{ textAlign: 'left' }}>
                            {fase.titulo}
                          </Typography>
                        </Box>
                        <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                          {fase.items.map((item, itemIndex) => (
                            <StyledDescription key={itemIndex}>{item}</StyledDescription>
                          ))}
                        </ul>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </Container>
      <TeamCircle1><img src={`${process.env.PUBLIC_URL}/images/team1.png`} alt="" /></TeamCircle1>
      <TeamCircle2><img src={`${process.env.PUBLIC_URL}/images/team3.png`} alt="" /></TeamCircle2>
    </StyledPaper2>
  );
};

export default Metodologias;