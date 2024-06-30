import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useLogin } from '../contexts/Login';

const Formulario = () => {
  const { username } = useLogin();

  const initialForm = {
    cod_property: '',
    inspection_type: '',
    surveyor_name: '',
    surveyor_cpf: '',
    broker: '',
    inspection_date: '',
    metreage: 0,
    furnished: false,
    locator_name: '',
    locator_cpf: '',
    tenant_name: '',
    tenant_cpf: '',
    witness_name: '',
    witness_cpf: '',
    address: '',
    cep: '',
    city: '',
    state: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
    reference_point: '',
    principal_address: false,
    real_state_name: ''
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const fetchImobiliarias = async () => {
      try {
        const response = await axios.get('http://172.174.192.190/get-real-states-list');
        console.log('Imobiliárias:', response.data);
      } catch (error) {
        console.error('Erro ao buscar imobiliárias:', error);
      }
    };
    fetchImobiliarias();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const data = {
      surveyor_name: form.surveyor_name,
      surveyor_cpf: form.surveyor_cpf,
      broker: form.broker,
      real_state_name: form.real_state_name,
      inspection_date: form.inspection_date,
      inspection_type: form.inspection_type,
      address: form.address,
      cep: form.cep,
      city: form.city,
      state: form.state,
      neighborhood: form.neighborhood,
      street: form.street,
      number: form.number,
      complement: form.complement,
      reference_point: form.reference_point,
      principal_address: form.principal_address,
      ['length property']: form.metreage,
      furniture: form.furnished,
      locator_name: form.locator_name,
      locator_cpf: form.locator_cpf,
      tenant_name: form.tenant_name,
      tenant_cpf: form.tenant_cpf,
      witness_name: form.witness_name,
      witness_cpf: form.witness_cpf,
      administrator: username,
      cod_property: form.cod_property
    };

    try {
      const response = await axios.post('http://172.174.192.190/properties-register', data, {
        headers: {
          Authorization: token
        }
      });
      console.log('Dados enviados com sucesso:', response.data);
      setForm(initialForm);
    } catch (error: any) {
      console.error('Erro ao enviar dados:', error.response.data);
    }
  };

  const isFormComplete = Object.values(form).every((value) => value !== '' && value !== null);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 10, mb: 2, color: '#673ab7', textAlign: 'center' }}>
          Cadastro de Vistoria
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <img src="https://i.ibb.co/f1VH31H/novo-imovel.webp" alt="Imagem de Vistoria" style={{ maxWidth: '50%', height: 'auto', borderRadius: '8px' }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2, color: '#673ab7' }}>
            Informações Gerais
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID-Imóvel:"
                variant="outlined"
                value={form.cod_property}
                onChange={(e) => setForm({ ...form, cod_property: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data:"
                type="date"
                variant="outlined"
                value={form.inspection_date}
                onChange={(e) => setForm({ ...form, inspection_date: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome do Vistoriador:"
                variant="outlined"
                value={form.surveyor_name}
                onChange={(e) => setForm({ ...form, surveyor_name: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CPF do Vistoriador:"
                variant="outlined"
                value={form.surveyor_cpf}
                onChange={(e) => setForm({ ...form, surveyor_cpf: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Corretor:"
                variant="outlined"
                value={form.broker}
                onChange={(e) => setForm({ ...form, broker: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="tipoVistoria-label">Tipo de Vistoria</InputLabel>
                <Select
                  labelId="tipoVistoria-label"
                  id="tipoVistoria"
                  label="Tipo de Vistoria"
                  value={form.inspection_type}
                  onChange={(e) => setForm({ ...form, inspection_type: e.target.value })}
                  required
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
                margin="normal"
                value={form.metreage}
                onChange={(e) => setForm({ ...form, metreage: +e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="mobiliado-label">Mobiliado</InputLabel>
                <Select
                  labelId="mobiliado-label"
                  id="mobiliado"
                  label="Mobiliado"
                  value={form.furnished.toString()}
                  onChange={(e) => setForm({ ...form, furnished: e.target.value === 'true' })}
                  required
                >
                  <MenuItem value="true">Sim</MenuItem>
                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#673ab7' }}>
            Informações do Locador e Locatário
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome do Locador:"
                variant="outlined"
                margin="normal"
                value={form.locator_name}
                onChange={(e) => setForm({ ...form, locator_name: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CPF do Locador:"
                variant="outlined"
                margin="normal"
                value={form.locator_cpf}
                onChange={(e) => setForm({ ...form, locator_cpf: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome do Locatário:"
                variant="outlined"
                margin="normal"
                value={form.tenant_name}
                onChange={(e) => setForm({ ...form, tenant_name: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CPF do Locatário:"
                variant="outlined"
                margin="normal"
                value={form.tenant_cpf}
                onChange={(e) => setForm({ ...form, tenant_cpf: e.target.value })}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome da Testemunha:"
                variant="outlined"
                value={form.witness_name}
                onChange={(e) => setForm({ ...form, witness_name: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CPF da Testemunha:"
                variant="outlined"
                value={form.witness_cpf}
                onChange={(e) => setForm({ ...form, witness_cpf: e.target.value })}
                margin="normal"
                required
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#673ab7' }}>
            Endereço do Imóvel
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CEP"
                variant="outlined"
                value={form.cep}
                onChange={(e) => setForm({ ...form, cep: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cidade"
                variant="outlined"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estado"
                variant="outlined"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bairro"
                variant="outlined"
                value={form.neighborhood}
                onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Logradouro"
                variant="outlined"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número"
                variant="outlined"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Complemento"
                variant="outlined"
                value={form.complement}
                onChange={(e) => setForm({ ...form, complement: e.target.value })}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ponto de Referência"
                variant="outlined"
                value={form.reference_point}
                onChange={(e) => setForm({ ...form, reference_point: e.target.value })}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
              disabled={!isFormComplete}
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
