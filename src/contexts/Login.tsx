import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { redirect } from 'react-router-dom';

export interface UserData {
  username: string;
  password: string;
  hierarchy: string;
}

interface LoginContextI {
  handleLoginCtx: (userData: UserData) => Promise<string | null>;
  username: string | null;
}

export const LoginContext = createContext<LoginContextI>({
  handleLoginCtx: () => Promise.resolve(null),
  username: null
});

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');

  const handleLoginCtx = async (userData: UserData): Promise<string | null> => {
    try {
      const response = await axios.post('http://172.174.192.190/login', {
        real_state: userData.hierarchy,
        username: userData.username,
        password: userData.password
      });

      localStorage.setItem('token', response.data.token);

      setUsername(userData.username);

      redirect('/pesquisa');

      return null;
    } catch (error: any) {
      if (error.response) {
        return error.response.data.message || 'Erro desconhecido';
      } else {
        return 'Erro de conexão com o servidor';
      }
    }
  };

  return <LoginContext.Provider value={{ handleLoginCtx, username }}>{children}</LoginContext.Provider>;
};
