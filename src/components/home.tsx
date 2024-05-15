import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import Header from './Header';

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', pt: '50px' }}>
      <Header />
      <Box sx={{ textAlign: 'center', p: 2, mt: -6 }}>
        <Typography variant="h3" component="h1" fontWeight="bold">
          Bem-vindo ao ImovCheck
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          ImovCheck é sua solução completa para avaliação e gestão de imóveis. Com inputs flexíveis e processamento de imagens, nossa ferramenta permite criar relatórios detalhados do imóvel, disponíveis em PDF para anexar em contratos ou utilização em outras finalidades essenciais.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            px: 3,
            color: 'white',
            backgroundColor: '#673ab7',
            ':hover': {
              bgcolor: '#5e35b1', 
              color: 'black' 
            }
          }}
        >
          Clique aqui para realizar o Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
