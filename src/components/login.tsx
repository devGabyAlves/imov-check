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
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLogin, UserData } from '../contexts/Login';
import Header from './Header';

interface RealtyItem {
  id: string;
  name: string;
}

type AuthContextI = {
  handleLogin: (userData: UserData) => void;
};

interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  hierarchy: string;
  setHierarchy: React.Dispatch<React.SetStateAction<string>>;
  fetchRealtyList: () => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  realtyList: RealtyItem[];
}

const AuthContext = React.createContext<AuthContextI>({} as AuthContextI);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hierarchy, setHierarchy] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [realtyList, setRealtyList] = useState<RealtyItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { handleLoginCtx } = useLogin();

  const handleLogin = async (userData: UserData) => {
    try {
      const response = await axios.post('http://172.174.192.190/login', {
        real_state: userData.hierarchy,
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

  useEffect(() => {
    const fetchRealtyList = async () => {
      try {
        const response = await axios.get('http://172.174.192.190/get-real-states-list');
        const list = response.data.map((item: string, index: number) => ({
          id: index.toString(),
          name: item
        }));
        setRealtyList(list);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchRealtyList();
  }, []);

  return (
    <>
      <Header />
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
            Login
          </Typography>
          <AuthContext.Provider value={{ handleLogin: handleLogin }}>
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              hierarchy={hierarchy}
              setHierarchy={setHierarchy}
              fetchRealtyList={() => {}}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              realtyList={realtyList}
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
  hierarchy,
  setHierarchy,
  showPassword,
  setShowPassword,
  realtyList
}: LoginFormProps) => {
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin({ username, password, hierarchy });
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
      <Select
        labelId="hierarchy-label"
        id="hierarchy"
        value={hierarchy}
        label="Hierarchy"
        onChange={(e) => setHierarchy(e.target.value)}
        fullWidth
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
      >
        {realtyList.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
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
    </form>
  );
};

export default Login;
