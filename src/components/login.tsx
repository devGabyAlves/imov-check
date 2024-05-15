import React, { FormEvent, useContext, useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

interface UserData {
  username: string;
  password: string;
  hierarchy: string;
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
  realtyList: {
    id: number;
    name: string;
  }[];
  fetchRealtyList: () => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}


const AuthContext = React.createContext<AuthContextI>({} as AuthContextI);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hierarchy, setHierarchy] = useState('');
  const [realtyList, setRealtyList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const fetchRealtyList = async () => {};
  const handleLogin = async (userData: UserData) => {};

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  };

  return (
    <>
      <Header />
      <Container component="main" style={style}>
        <Typography component="h1" variant="h5" sx={{ color: "#673ab7" }}>Login</Typography>
        <AuthContext.Provider value={{ handleLogin }}>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            hierarchy={hierarchy}
            setHierarchy={setHierarchy}
            realtyList={realtyList}
            fetchRealtyList={fetchRealtyList}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </AuthContext.Provider>
      </Container>
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
  fetchRealtyList,
  showPassword,
  setShowPassword
}: LoginFormProps) => {
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        onChange={e => setUsername(e.target.value)}
        sx={{
          backgroundColor: '#f3f3f3', 
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#673ab7', 
            },
            '&:hover fieldset': {
              borderColor: '#5e35b1', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5e35b1', 
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
        onChange={e => setPassword(e.target.value)}
        sx={{
          backgroundColor: '#f3f3f3', 
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#673ab7', 
            },
            '&:hover fieldset': {
              borderColor: '#5e35b1', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5e35b1', 
            }
          }
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={showPassword}
            onChange={toggleShowPassword}
            sx={{
              color: '#673ab7', 
              '&.Mui-checked': {
                color: '#673ab7', 
              }
            }}
          />
        }
        label={showPassword ? 'Hide Password' : 'Show Password'}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="hierarchy"
        label="Hierarchy"
        name="hierarchy"
        autoComplete="hierarchy"
        value={hierarchy}
        onChange={e => setHierarchy(e.target.value)}
        onFocus={fetchRealtyList}
        sx={{
          backgroundColor: '#f3f3f3', 
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#673ab7', 
            },
            '&:hover fieldset': {
              borderColor: '#5e35b1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5e35b1', 
            }
          }
        }}
      />
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
