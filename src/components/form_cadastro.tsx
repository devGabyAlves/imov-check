import axios from 'axios';
import { useState } from 'react';
import '../styles/formulario.css';
import Header from './header';

const Formulario = () => {
  const [idImovel, setIdImovel] = useState('');
  const [data, setData] = useState('');
  const [vistoriador, setVistoriador] = useState('');
  const [corretor, setCorretor] = useState('');
  const [tipoVistoria, setTipoVistoria] = useState('');
  const [endereco, setEndereco] = useState({ cep: '', bairro: '', numero: '', complemento: '' });
  const [metragem, setMetragem] = useState('');
  const [mobiliado, setMobiliado] = useState('');
  const [locador, setLocador] = useState('');
  const [locatario, setLocatario] = useState('');
  const [testemunha, setTestemunha] = useState('');
  const [administradora, setAdministradora] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post('URL_DA_API', {
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
        administradora
      });


      console.log('Resposta da API:', response.data);
    } catch (error) {

      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="formulario-container">
        <form onSubmit={handleSubmit} className="formulario-form">
          <label htmlFor="idImovel">ID-Imóvel:</label>
          <input type="text" id="idImovel" value={idImovel} onChange={(e) => setIdImovel(e.target.value)} />

          <label htmlFor="data">Data:</label>
          <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} />

          <label htmlFor="vistoriador">Vistoriador:</label>
          <input type="text" id="vistoriador" value={vistoriador} onChange={(e) => setVistoriador(e.target.value)} />

          <label htmlFor="corretor">Corretor:</label>
          <input type="text" id="corretor" value={corretor} onChange={(e) => setCorretor(e.target.value)} />

          <label htmlFor="tipoVistoria">Tipo de Vistoria:</label>
          <select id="tipoVistoria" value={tipoVistoria} onChange={(e) => setTipoVistoria(e.target.value)}>
            <option value="">Selecione</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>

          <label htmlFor="endereco">Endereço:</label>
          <input type="text" id="cep" placeholder="CEP" value={endereco.cep} onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })} />
          <input type="text" id="bairro" placeholder="Bairro" value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} />
          <input type="text" id="numero" placeholder="Número" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
          <input type="text" id="complemento" placeholder="Complemento" value={endereco.complemento} onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })} />

          <label htmlFor="metragem">Metragem do Imóvel:</label>
          <input type="number" id="metragem" value={metragem} onChange={(e) => setMetragem(e.target.value)} />

          <label htmlFor="mobiliado">Mobiliado:</label>
          <select id="mobiliado" value={mobiliado} onChange={(e) => setMobiliado(e.target.value)}>
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>

          <label htmlFor="locador">Locador:</label>
          <input type="text" id="locador" value={locador} onChange={(e) => setLocador(e.target.value)} />

          <label htmlFor="locatario">Locatário:</label>
          <input type="text" id="locatario" value={locatario} onChange={(e) => setLocatario(e.target.value)} />

          <label htmlFor="testemunha">Testemunha:</label>
          <input type="text" id="testemunha" value={testemunha} onChange={(e) => setTestemunha(e.target.value)} />

          <label htmlFor="administradora">Administradora:</label>
          <input type="text" id="administradora" value={administradora} onChange={(e) => setAdministradora(e.target.value)} />

          <button type="submit" className="formulario-submit-button">Enviar</button>        </form>
      </div>
    </>
  );
};

export default Formulario;
