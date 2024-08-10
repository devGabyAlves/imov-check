import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import HomeIcon from '@mui/icons-material/Home';
import '../styles/home.scss';

const Home = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: '#fff',
        textAlign: 'center',
        padding: '50px 20px',
      }}
    >
      <Box sx={{ p: 2 }}>
        <HomeIcon
          sx={{
            fontSize: 80,
            color: '#ffeb3b',
            marginBottom: '20px',
            animation: 'icon-bounce 2s infinite',
          }}
        />
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
          Bem vindo ao
        </Typography>
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2, color: '#ffeb3b' }}>
          Imov Check
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Imov Check é sua solução completa para avaliação e gestão de imóveis. Com inputs flexíveis e processamento avançado de imagens, nossa ferramenta permite criar relatórios detalhados, prontos para serem anexados a contratos ou utilizados em outras finalidades essenciais.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            paddingY: 1.5,
            paddingX: 3,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#000000',
            marginTop: '20px',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#fdd835',
              transform: 'scale(1.05)',
              color: '#673ab7',
            },
          }}
        >
          Realizar o Login
        </Button>
      </Box>
      {/* Ícone do WhatsApp flutuante */}
      <a
        href="https://wa.me/5511918490207?text=Olá! Tenho interesse em saber mais sobre o Imov Check."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <WhatsAppIcon sx={{ fontSize: 60, color: '#25D366' }} />
      </a>
    </Container>
  );
};

export default Home;
