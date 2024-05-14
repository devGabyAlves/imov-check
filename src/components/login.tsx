import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Header from "./Header";

interface UserData {
  username: string;
  password: string;
  hierarchy: string;
}

type AuthContextI = {
  handleLogin: (userData: UserData) => void;
};

const AuthContext = React.createContext<AuthContextI>({} as unknown as AuthContextI);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hierarchy, setHierarchy] = useState("");
  const [realtyList, setRealtyList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const fetchRealtyList = async () => {
    try {
      const response = await axios.get("URL_DA_SUA_API_FLASK/imobiliarias");
      setRealtyList(response.data);
    } catch (error) {
      console.error("Erro ao buscar lista de imobiliárias:", error);
    }
  };

  const handleLogin = async (userData: UserData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", userData);

      console.log("Resposta da API:", response.data);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        alert("Login Realizado com sucesso!");

        navigate("/pesquisa");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-primary text-secondary p-4">
        <h2 className="mb-4">Login</h2>
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
      </div>
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
  realtyList,
  fetchRealtyList,
  showPassword,
  setShowPassword,
}: {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  hierarchy: string;
  setHierarchy: (value: string) => void;
  realtyList: {
    id: number;
    name: string;
  }[];
  fetchRealtyList: () => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) => {
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleLogin({ username, password, hierarchy });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Usuário:</label>
        <input type="text" id="username" className="form-input w-full px-3 py-2 border border-gray-300 rounded" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <div className="flex-grow">
          <label htmlFor="password" className="block mb-2">Senha:</label>
          <input 
            type={showPassword ? "text" : "password"} 
            id="password" 
            className="form-input w-full px-3 py-2 border border-gray-300 rounded"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button
          type="button"
          onClick={toggleShowPassword}
          className="bg-transparent hover:bg-gray-200 text-black font-semibold border border-gray-300 rounded text-lg"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="hierarchy" className="block mb-2">Hierarquia:</label>
        <input
          type="text"
          id="hierarchy"
          className="form-input w-full px-3 py-2 border border-gray-300 rounded"
          value={hierarchy}
          onChange={(e) => setHierarchy(e.target.value)}
          onFocus={fetchRealtyList}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
    </form>
  );
};



export default Login;
