import React from 'react';
import { Paper, Typography, Container, Grid, Card, CardContent, Box, useMediaQuery } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import SectionTitle from './SectionTitle';

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
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  transition: transform 0.3s ease-in-out, border-color 180ms ease, box-shadow 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: none;
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(15, 184, 178, 0.55);
    box-shadow: 0 16px 32px -16px rgba(15, 184, 178, 0.35);
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

const StyledDescription = styled.li(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 400,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  fontSize: 15,
  letterSpacing: '.03em',
  lineHeight: '1.8em',
}));

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
      <SectionTitle sx={{ position: 'relative', zIndex: 2 }}>Metodología</SectionTitle>
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