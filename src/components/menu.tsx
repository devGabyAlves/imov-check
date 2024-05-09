import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="px-2.5 bg-purple-700 text-white cursor-pointer" onClick={toggleDropdown}>
        Cadastro
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white border border-t-0 border-purple-700 rounded-b-md z-10">
          {/* Use o Link para cada opção do dropdown */}
          <Link
            to="/cadastro_imovel"
            className="px-2.5 cursor-pointer text-purple-700"
            onClick={() => handleOptionClick("Imóvel")}
          >
            Imóvel
          </Link>
          <Link
            to="/cadastro_corretor"
            className="px-2.5 cursor-pointer text-purple-700"
            onClick={() => handleOptionClick("Novo Corretor")}
          >
            Novo Corretor
          </Link>
        </div>
      )}
      {selectedOption && <div className="mt-2.5 text-purple-700">Você selecionou: {selectedOption}</div>}
    </div>
  );
};

export default Dropdown;
