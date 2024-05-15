import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid
} from '@mui/material';
import Header from './Header';

const Formulario = () => {
  const [idImovel, setIdImovel] = useState('');
  const [data, setData] = useState('');
  const [vistoriador, setVistoriador] = useState('');
  const [corretor, setCorretor] = useState('');
  const [tipoVistoria, setTipoVistoria] = useState('');
  const [metragem, setMetragem] = useState('');
  const [mobiliado, setMobiliado] = useState('');
  const [locador, setLocador] = useState('');
  const [locatario, setLocatario] = useState('');
  const [testemunha, setTestemunha] = useState('');
  const [administradora, setAdministradora] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 10, mb: 2, color: '#673ab7', textAlign: 'center' }}>
          Formulário de Vistoria
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID-Imóvel:"
                variant="outlined"
                value={idImovel}
                onChange={(e) => setIdImovel(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data:"
                type="date"
                variant="outlined"
                value={data}
                onChange={(e) => setData(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vistoriador:"
                variant="outlined"
                value={vistoriador}
                onChange={(e) => setVistoriador(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Corretor:"
                variant="outlined"
                value={corretor}
                onChange={(e) => setCorretor(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="tipoVistoria-label">Tipo de Vistoria</InputLabel>
                <Select
                  labelId="tipoVistoria-label"
                  id="tipoVistoria"
                  value={tipoVistoria}
                  label="Tipo de Vistoria"
                  onChange={(e) => setTipoVistoria(e.target.value)}
                >
                  <MenuItem value="entrada">Entrada</MenuItem>
                  <MenuItem value="saida">Saída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Metragem do Imóvel:"
                type="number"
                variant="outlined"
                value={metragem}
                onChange={(e) => setMetragem(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="mobiliado-label">Mobiliado</InputLabel>
                <Select
                  labelId="mobiliado-label"
                  id="mobiliado"
                  value={mobiliado}
                  label="Mobiliado"
                  onChange={(e) => setMobiliado(e.target.value)}
                >
                  <MenuItem value="sim">Sim</MenuItem>
                  <MenuItem value="nao">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Locador:"
                variant="outlined"
                value={locador}
                onChange={(e) => setLocador(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Locatário:"
                variant="outlined"
                value={locatario}
                onChange={(e) => setLocatario(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Testemunha:"
                variant="outlined"
                value={testemunha}
                onChange={(e) => setTestemunha(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Administradora:"
                variant="outlined"
                value={administradora}
                onChange={(e) => setAdministradora(e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
            >
              Enviar
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Formulario;
