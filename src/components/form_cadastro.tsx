import axios from "axios";
import { useState } from "react";
import FormButton from "./FormButton";
import FormContainer from "./FormContainer";
import FormField from "./FormField";
import Header from "./Header";

const Formulario = () => {
  const [idImovel, setIdImovel] = useState("");
  const [data, setData] = useState("");
  const [vistoriador, setVistoriador] = useState("");
  const [corretor, setCorretor] = useState("");
  const [tipoVistoria, setTipoVistoria] = useState("");
  const [endereco, setEndereco] = useState({ cep: "", bairro: "", numero: "", complemento: "" });
  const [metragem, setMetragem] = useState("");
  const [mobiliado, setMobiliado] = useState("");
  const [locador, setLocador] = useState("");
  const [locatario, setLocatario] = useState("");
  const [testemunha, setTestemunha] = useState("");
  const [administradora, setAdministradora] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("URL_DA_API", {
        idImovel,
        data,
        vistoriador,
        corretor,
        tipoVistoria,
        endereco,
        metragem,
        mobiliado,
        locador,
        locatario,
        testemunha,
        administradora,
      });
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField
            label="ID-Imóvel:"
            type="text"
            value={idImovel}
            onChange={(e) => setIdImovel(e.target.value)}
            placeholder="Digite o ID do Imóvel"
          />
          <FormField
            label="Data:"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Escolha uma data"
          />
          <FormField
            label="Vistoriador:"
            type="text"
            value={vistoriador}
            onChange={(e) => setVistoriador(e.target.value)}
            placeholder="Nome do Vistoriador"
          />
          <FormField
            label="Corretor:"
            type="text"
            value={corretor}
            onChange={(e) => setCorretor(e.target.value)}
            placeholder="Nome do Corretor"
          />

          <div className="flex flex-col mb-5">
            <label htmlFor="tipoVistoria">Tipo de Vistoria:</label>

            <select
              id="tipoVistoria"
              value={tipoVistoria}
              onChange={(e) => setTipoVistoria(e.target.value)}
              className="mb-5 p-2.5 border border-gray-300 rounded-md text-lg w-full"
            >
              <option value="">Selecione</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <FormField
            label="Endereço (CEP):"
            type="text"
            value={endereco.cep}
            onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
            placeholder="Digite o CEP"
          />
          <FormField
            label="Endereço (Bairro):"
            type="text"
            value={endereco.bairro}
            onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
            placeholder="Digite o Bairro"
          />
          <FormField
            label="Endereço (Número):"
            type="text"
            value={endereco.numero}
            onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
            placeholder="Digite o Número"
          />
          <FormField
            label="Endereço (Complemento):"
            type="text"
            value={endereco.complemento}
            onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
            placeholder="Digite o Complemento"
          />
          <FormField
            label="Metragem do Imóvel:"
            type="number"
            value={metragem}
            onChange={(e) => setMetragem(e.target.value)}
            placeholder="Metragem em m²"
          />

          <div className="flex flex-col mb-5">
            <label htmlFor="mobiliado">Mobiliado:</label>

            <select
              id="mobiliado"
              value={mobiliado}
              onChange={(e) => setMobiliado(e.target.value)}
              className="mb-5 p-2.5 border border-gray-300 rounded-md text-lg w-full"
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          <FormField
            label="Locador:"
            type="text"
            value={locador}
            onChange={(e) => setLocador(e.target.value)}
            placeholder="Nome do Locador"
          />
          <FormField
            label="Locatário:"
            type="text"
            value={locatario}
            onChange={(e) => setLocatario(e.target.value)}
            placeholder="Nome do Locatário"
          />
          <FormField
            label="Testemunha:"
            type="text"
            value={testemunha}
            onChange={(e) => setTestemunha(e.target.value)}
            placeholder="Nome da Testemunha"
          />
          <FormField
            label="Administradora:"
            type="text"
            value={administradora}
            onChange={(e) => setAdministradora(e.target.value)}
            placeholder="Nome da Administradora"
          />
          <FormButton>Enviar</FormButton>
        </form>
      </FormContainer>
    </>
  );
};

export default Formulario;
