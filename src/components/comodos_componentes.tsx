import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Modal, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import Header from './Header';
import Menu from './menu';

interface Component {
  name: string;
  description: string;
  photos: string[];
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
  const [fotoModal, setFotoModal] = useState<string | null>(null);

  const handleDescricaoChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const novosComponentes = [...componentes];
    novosComponentes[index].description = event.target.value;
    setComponentes(novosComponentes);
  };

  const handleAdicionarFoto = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const novosComponentes = [...componentes];
    const files = event.target.files;
    if (files) {
      novosComponentes[index].photos.push(URL.createObjectURL(files[0]));
      setComponentes(novosComponentes);
    }
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
    setFotoModal(null);
  };

  const handleExtrairRelatorio = () => {
    axios.post('URL_DA_API/relatorio', {
      userId: 'ID_DO_USUARIO',
      imovelId: 'ID_DO_IMOVEL'
    })
      .then(response => console.log('Relatório extraído com sucesso:', response.data))
      .catch(error => console.error('Erro ao extrair relatório:', error));
  };

  return (
    <Box>
      <Header />
      <Menu />
      <Grid container spacing={2} sx={{ p: 2 }}>
        {componentes.map((componente, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Typography variant="h6">{componente.name}</Typography>
            <TextareaAutosize
              aria-label={`description-${index}`}
              minRows={3}
              value={componente.description}
              onChange={(event) => handleDescricaoChange(index, event as React.ChangeEvent<HTMLTextAreaElement>)}
              style={{ width: '100%' }}
            />
            <TextField
              type="file"
              InputLabelProps={{ shrink: true }}
              label="Adicionar Foto"
              variant="outlined"
              onChange={(event) => handleAdicionarFoto(index, event as React.ChangeEvent<HTMLInputElement>)}
              fullWidth
              margin="normal"
              inputProps={{ multiple: true }}
            />
            {componente.photos.map((foto, fotoIndex) => (
              <img
                key={fotoIndex}
                src={foto}
                alt={`Foto ${fotoIndex + 1}`}
                style={{ width: '100%', cursor: 'pointer', marginRight: '10px' }}
                onClick={() => abrirModal(foto)}
              />
            ))}
          </Grid>
        ))}
        <Grid item xs={12} sm={8} md={4}>
          <TextField
            label="Digite novo Cômodo"
            variant="outlined"
            value={novoNomeComponente}
            onChange={(event) => setNovoNomeComponente(event.target.value)}
            fullWidth
            margin="normal"
          />
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              onClick={handleAdicionarComponente}
              sx={{ backgroundColor: '#673ab7', color: '#fff', '&:hover': { backgroundColor: '#5e35b1' } }}
              style={{ flex: 1 }}
            >
              Add Componente
            </Button>
            <Button
              variant="contained"
              onClick={handleExtrairRelatorio}
              sx={{ backgroundColor: '#673ab7', color: '#fff', '&:hover': { backgroundColor: '#5e35b1' } }}
              style={{ flex: 1 }}
            >
              Extrair relatório
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={!!fotoModal}
        onClose={fecharModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src={fotoModal || ''} alt="Foto Modal" style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </Modal>
    </Box>
  );
};

export default Componente;
