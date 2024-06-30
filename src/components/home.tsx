import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', pt: '50px' }}>
      <Box sx={{ textAlign: 'center', p: 2, mt: 2 }}>
        <HomeIcon sx={{ fontSize: 80, color: '#673ab7', mb: 2 }} />
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
          Bem-vindo ao ImovCheck
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          ImovCheck é sua solução completa para avaliação e gestão de imóveis. Com inputs flexíveis e processamento de imagens, nossa ferramenta permite criar relatórios detalhados do imóvel, disponíveis em PDF para anexar em contratos ou utilização em outras finalidades essenciais.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            py: 1.5,
            px: 3,
            color: 'white',
            backgroundColor: '#673ab7',
            ':hover': {
              bgcolor: '#5e35b1',
              color: 'white'
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
