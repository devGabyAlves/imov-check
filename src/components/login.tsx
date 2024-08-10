import { Container, Typography, TextField, Button, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    }

    setLoading(true);
    setError(null);
    setEmailError(null);

    // Simula a requisição de login
    setTimeout(() => {
      setLoading(false);
      // Lógica de autenticação
      console.log('Autenticando:', { email, password });
    }, 2000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Por favor, insira um email válido.');
    } else {
      setEmailError(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white', 
          }}
        >
          <Typography variant="h4" sx={{ color: '#673ab7', mb: 2 }}>
            Login
          </Typography>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#673ab7',
                },
                '&:hover fieldset': {
                  borderColor: '#673ab7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#673ab7',
                },
              },
            }}
          />
          <TextField
            variant="outlined"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#673ab7',
                },
                '&:hover fieldset': {
                  borderColor: '#673ab7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#673ab7',
                },
              },
            }}
            InputProps={{
             
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Link href="/esqueceu-senha" sx={{ display: 'block', mt: 2, color: '#673ab7', cursor: 'pointer' }}>
            Esqueceu a senha?
          </Link>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading || !!emailError}
            sx={{
              backgroundColor: '#673ab7',
              ':hover': {
              backgroundColor: '#5e35b1',
              transform: 'scale(1.05)',
              color: '#fdd835',
            },
              mt: 3,
            }}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </Box>
      </Box>
      <Box
      sx={{
        width: '50%',
        display: { xs: 'none', md: 'block' },
        backgroundImage: 'url(/src/assets/imovcheck.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
    </Container>
  );
};

export default Login;
