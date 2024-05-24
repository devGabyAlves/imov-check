import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, MenuItem, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import Header from './Header';
import Menu from './menu';

interface Imobiliaria {
  id: string;
  name: string;
}

const FormCadastroCorretor = () => {
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [creci, setCreci] = useState('');
  const [imobiliaria, setImobiliaria] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [imobiliarias, setImobiliarias] = useState<Imobiliaria[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  useEffect(() => {
    const fetchImobiliarias = async () => {
      try {
        const response = await axios.get('http://172.174.192.190/get-real-states-list');
        const imobiliariaData = response.data.map((nomeImobiliaria: string, index: number) => ({
          id: index.toString(), 
          name: nomeImobiliaria 
        }));
        setImobiliarias(imobiliariaData);
      } catch (error) {
        console.error('Erro ao buscar imobiliárias:', error);
      }
    };
    fetchImobiliarias();
  }, []);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setModalContent({ title: "Erro de Validação", message: "Por favor, insira um e-mail válido." });
      setOpenModal(true);
      return;
    }
  
    if (senha !== confirmarSenha) {
      setModalContent({ title: "Erro de Validação", message: "As senhas não coincidem." });
      setOpenModal(true);
      return;
    }
  
    const token = localStorage.getItem('token');
    const data = {
      real_state_name: imobiliaria,
      name,
      email,
      password: senha,
      creci,
      type_user: tipoUsuario.toLowerCase()
    };
  
    try {
      const response = await axios.post('http://172.174.192.190/broker-registration', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Dados enviados com sucesso:', response.data);
      setModalContent({ title: "Sucesso", message: "Usuário cadastrado com sucesso!" });
      setOpenModal(true);
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : "Erro ao enviar dados.";
      setModalContent({ title: "Erro", message: errorMessage });
      setOpenModal(true);
    }
  };

  const isFormComplete = name && email && senha && confirmarSenha && creci && imobiliaria && tipoUsuario;

  return (
    <>
      <Header />
      <Menu />
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 10, mb: 2, color: '#673ab7', textAlign: 'center' }}>
          Cadastro de Corretor
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CRECI:"
                variant="outlined"
                value={creci}
                onChange={(e) => setCreci(e.target.value)}
                placeholder="Digite seu CRECI"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Imobiliária:"
                value={imobiliaria}
                onChange={(e) => setImobiliaria(e.target.value)}
                variant="outlined"
                required
              >
                {imobiliarias.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Tipo de Usuário:"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              variant="outlined"
              required
            >
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Usuário">Comum</MenuItem>
            </TextField>
          </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!isFormComplete}
                sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>{modalContent.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {modalContent.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="primary">Fechar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default FormCadastroCorretor;
