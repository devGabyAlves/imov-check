import '../styles/pesquisa.css';
import Header from './header';
import Menu from './menu';

const Pesquisa = () => {
  return (
    <div>
      <Header />
      <Menu />
      <div className="pesquisa-container">
        <h1 className="titulo">Pesquisa de imóvel</h1>
        <p className="description">
          Aqui você faz a pesquisa do seu imóvel cadastrado através do ID do seu imóvel. Caso não encontre o imóvel, deverá ser cadastrado através do botão "Cadastro" acima.
        </p>
        <input type="text" className="pesquisa-input" placeholder="Digite sua pesquisa" />
        <button className="pesquisa-button">Pesquisar</button>
      </div>
    </div>
  );
};

export default Pesquisa;
