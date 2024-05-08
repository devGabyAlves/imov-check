import { Link } from 'react-router-dom';
import '../styles/home.css';
import Header from './header';

const Home = () => {
  return (
    <div>

      <Header />

      <div className="home-container">

        <div className="content">
          <h1>Bem-vindo ao ImovCheck</h1>
          <p>
            ImovCheck é uma ferramenta para avaliação de imóveis através de descrição flexível e input de imagens. É possível também gerar relatórios sobre imóvel com todo detalhamento do imóvel e da avaliação em pdf para fins de anexar em contrato ou outras finalidades.
          </p>
          <Link to="/login" className="login-button">Clique aqui para o Login</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
