import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        Cadastro
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {/* Use o Link para cada opção do dropdown */}
          <Link to="/cadastro_imovel" className="dropdown-option" onClick={() => handleOptionClick('Imóvel')}>
            Imóvel
          </Link>
          <Link to="/cadastro_corretor" className="dropdown-option" onClick={() => handleOptionClick('Novo Corretor')}>
            Novo Corretor
          </Link>
        </div>
      )}
      {selectedOption && (
        <div className="selected-option">
          Você selecionou: {selectedOption}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
