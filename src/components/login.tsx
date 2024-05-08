import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Header from "./header";

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
      <div className="login-container">
        <h2>Login</h2>
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="username">Usuário:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="input-group">
        <label htmlFor="password">Senha:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Ícone de olho para mostrar/esconder a senha */}
          {showPassword ? (
            <FiEyeOff onClick={() => setShowPassword(false)} />
          ) : (
            <FiEye onClick={() => setShowPassword(true)} />
          )}
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="hierarchy">Hierarquia:</label>
        <input
          type="text"
          id="hierarchy"
          value={hierarchy}
          onChange={(e) => setHierarchy(e.target.value)}
          onFocus={fetchRealtyList}
          required
        />
        {realtyList.length > 0 && (
          <ul className="realty-list">
            {realtyList.map((realtyItem) => (
              <li key={realtyItem.id}>{realtyItem.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="input-group">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
