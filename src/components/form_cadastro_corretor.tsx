import axios from 'axios';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import Header from './Header';
import Menu from './menu';

const FormCadastroCorretor = () => {
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { name, email, senha, confirmarSenha };
    try {
      const response = await axios.post('URL_DA_API', data);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 10, mb: 2, color: '#673ab7', textAlign: 'center' }}>
          Formulário de Corretor
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome:"
                variant="outlined"
                value={name}
                onChange={(e) => setNome(e.target.value)}
                margin="normal"
                placeholder="Digite seu nome"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email:"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Senha:"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirmar Senha:"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Digite sua senha novamente"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default FormCadastroCorretor;
