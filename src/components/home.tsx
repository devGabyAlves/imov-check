import { Link } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-secondary" style={{ paddingTop: '50px' }}>
      <Header />
      <div className="text-center max-w-md p-8 -mt-24">
        <h1 className="text-3xl font-bold">Bem-vindo ao ImovCheck</h1>
        <p className="mt-4 text-lg">
          ImovCheck é sua solução completa para avaliação e gestão de imóveis. Com inputs flexíveis e processamento de imagens, nossa ferramenta permite criar relatórios detalhados do imóvel, disponíveis em PDF para anexar em contratos ou utilização em outras finalidades essenciais.
        </p>
        <Link to="/login" className="inline-block mt-6 px-6 py-3 bg-secondary text-primary font-bold rounded hover:bg-white hover:text-primary transition-colors duration-300">
          Clique aqui para realizar o Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
