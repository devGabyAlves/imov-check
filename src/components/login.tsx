import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Link
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLogin, UserData } from '../contexts/Login';

type AuthContextI = {
  handleLogin: (userData: UserData) => void;
};

interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextI>({} as AuthContextI);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { handleLoginCtx } = useLogin();

  const handleLogin = async (userData: UserData) => {
    await handleLoginCtx(userData);
    try {
      const response = await axios.post('http://172.174.192.190/login', {
        username: userData.username,
        password: userData.password
      });
      localStorage.setItem('token', response.data.token); 
      window.location.href = '/pesquisa'; 
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Erro desconhecido'); 
      } else {
        setErrorMessage('Erro de conexão com o servidor');
      }
      setOpenModal(true);
    }
  };

  return (
    <>
      <Container
        component="main"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          maxWidth: '40rem'
        }}
      >
        <Paper elevation={4} sx={{ p: '2rem', borderRadius: '0.5rem' }}>
          <Typography component="h1" variant="h5" sx={{ color: '#673ab7', textAlign: 'center' }}>
            Login ImovCheck
          </Typography>
          <AuthContext.Provider value={{ handleLogin: handleLogin }}>
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </AuthContext.Provider>
        </Paper>
      </Container>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Erro ao Entrar</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword
}: LoginFormProps) => {
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          backgroundColor: '#f3f3f3',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#673ab7'
            },
            '&:hover fieldset': {
              borderColor: '#5e35b1'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5e35b1'
            }
          }
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          backgroundColor: '#f3f3f3',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#673ab7'
            },
            '&:hover fieldset': {
              borderColor: '#5e35b1'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5e35b1'
            }
          }
        }}
      />
      <Box mt={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={toggleShowPassword}
              sx={{
                color: '#673ab7',
                '&.Mui-checked': {
                  color: '#673ab7'
                }
              }}
            />
          }
          label={showPassword ? 'Hide Password' : 'Show Password'}
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          py: 1.5,
          px: 3,
          color: 'white',
          backgroundColor: '#673ab7',
          ':hover': {
            bgcolor: '#5e35b1'
          },
          ':focus': {
            bgcolor: '#5e35b1'
          }
        }}
      >
        Login
      </Button>
      <Box mt={2} textAlign="center">
        <Link href="/forgot-password" variant="body2" sx={{ color: '#673ab7' }}>
          Esqueci a senha
        </Link>
      </Box>
    </form>
  );
};

export default Login;
