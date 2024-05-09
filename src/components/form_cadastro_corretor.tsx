import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FormButton from "./FormButton";
import FormContainer from "./FormContainer";
import FormField from "./FormField";
import Header from "./header";

const FormCadastroCorretor = () => {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [creci, setCreci] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { name, email, senha, creci };
    try {
      const response = await axios.post("URL_DA_API", data);
      console.log("Dados enviados com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <>
      <Header />

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nome:"
            type="text"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
          <FormField
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
          <div className="password-input-container flex mb-5">
            <FormField
              label="Senha:"
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <button type="button" className="ml-2 text-purple-600" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <FormField
            label="CRECI:"
            type="text"
            value={creci}
            onChange={(e) => setCreci(e.target.value)}
            placeholder="Digite seu CRECI"
            required
          />
          <FormButton>Enviar</FormButton>
        </form>
      </FormContainer>
    </>
  );
};

export default FormCadastroCorretor;
