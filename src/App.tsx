import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Componente from './components/comodos_componentes';
import FormCadastro from './components/form_cadastro';
import FormCorretor from './components/form_cadastro_corretor';
import Home from './components/home';
import Login from './components/login';
import Pesquisa from './components/pesquisa';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/imoveis" element={<Componente />} />
        <Route path="/cadastro_imovel" element={<FormCadastro />} />
        <Route path="/cadastro_corretor" element={<FormCorretor />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
      </Routes>
    </Router>
  );
};

export default App;
