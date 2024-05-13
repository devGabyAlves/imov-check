import axios from 'axios';
import { ChangeEvent, useState } from 'react';
// import '../styles/styles.css';
import Header from './Header';
import Menu from './menu';

interface Component {
  name: string
  description: string
  photos: string[]
}

const Componente = () => {
  const [componentes, setComponentes] = useState<Array<Component>>([
    { name: 'Cozinha', description: '', photos: [] },
    { name: 'Sala', description: '', photos: [] },
    { name: 'Dormitório', description: '', photos: [] },
    { name: 'Banheiro', description: '', photos: [] },
    { name: 'Lavanderia', description: '', photos: [] }
  ]);

  const [novoNomeComponente, setNovoNomeComponente] = useState('');
  const [fotoModal, setFotoModal] = useState('');

  const handleDescricaoChange = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const novosComponentes = [...componentes];
    novosComponentes[index].description = event.target.value;
    setComponentes(novosComponentes);
  };

  const handleAdicionarFoto = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const novosComponentes = [...componentes];

    novosComponentes[index].photos.push(URL.createObjectURL(event.target.files![0]));

    setComponentes(novosComponentes);
  };

  const handleAdicionarComponente = () => {
    if (novoNomeComponente.trim() === '') {
      alert('Nome do novo cômodo precisa ser escrito');
      return;
    }
    const novoComponente = { name: novoNomeComponente, description: '', photos: [] };
    setComponentes([...componentes, novoComponente]);
    setNovoNomeComponente('');
  };

  const abrirModal = (foto: string) => {
    setFotoModal(foto);
  };

  const fecharModal = () => {
    setFotoModal('');
  };

  const handleExtrairRelatorio = () => {
    axios.post('URL_DA_API/relatorio', {
      userId: 'ID_DO_USUARIO',
      imovelId: 'ID_DO_IMOVEL'
    })
      .then(response => {
        console.log('Relatório extraído com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao extrair relatório:', error);
      });
  };

  return (
    <div>
      <Header />
      <Menu /> {/* Inclui o menu de hambúrguer */}
      <div className="flex flex-wrap p-4"> {/* .container */}
        {componentes.map((componente, index) => (
          <div key={index} className="w-1/5 p-5"> {/* .container > div */}
            <h2>{componente.name}</h2>
            <div>
              <label htmlFor={`description-${index}`}>Descrição:</label>
              <textarea
                id={`description-${index}`}
                value={componente.description}
                onChange={(event) => handleDescricaoChange(index, event)}
                rows={6}
                className="w-full mb-4"
              />
            </div>
            <div>
              <label htmlFor={`foto-${index}`}>Adicionar Foto:</label>
              <input
                type="file"
                id={`foto-${index}`}
                onChange={(event) => handleAdicionarFoto(index, event)}
                multiple
                className="mb-4"
              />
            </div>
            <div>
              {componente.photos.map((foto, fotoIndex) => (
                <img
                  key={fotoIndex}
                  src={foto}
                  alt={`Foto ${fotoIndex + 1}`}
                  className="w-50 h-auto mr-2.5 cursor-pointer" /* Adjusted width and margin */
                  onClick={() => abrirModal(foto)}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="absolute top-30 right-2.5"> {/* Adjusted positions */}
          <input
            type="text"
            value={novoNomeComponente}
            onChange={(event) => setNovoNomeComponente(event.target.value)}
            placeholder="Digite novo Comodo"
            className="mb-4"
          />
          <button className="mb-4 w-full" onClick={handleAdicionarComponente}>Adicionar Componente</button>
          <button className="mb-4 w-full" onClick={handleExtrairRelatorio}>Extrair relatório</button>
        </div>
        {fotoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={fecharModal}>
            <img src={fotoModal} alt="Foto" className="max-w-screen-lg max-h-screen-90" />
            <button className="absolute top-2.5 right-2.5 bg-white border-none cursor-pointer z-50" onClick={fecharModal}>X</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Componente;
