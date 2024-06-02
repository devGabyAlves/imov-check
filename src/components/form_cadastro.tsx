import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Menu from './menu';
import { useLogin } from '../contexts/Login';

const Formulario = () => {
  const [realEstates, setRealEstates] = useState<string[]>([]);
  const { username } = useLogin();

  const initialForm = {
    cod_property: '',
    inspection_type: '',
    surveyor: '',
    broker: '',
    inspection_date: '',
    metreage: 0,
    furnished: false,
    locator: '',
    tenant: '',
    witness: '',
    address: '',
    real_state_name: ''
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const fetchImobiliarias = async () => {
      try {
        const response = await axios.get('http://172.174.192.190/get-real-states-list');
        setRealEstates(response.data);
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
      surveyor: form.surveyor,
      broker: form.broker,
      real_state_name: form.real_state_name,
      inspection_date: form.inspection_date,
      inspection_type: form.inspection_type,
      address: form.address,
      ['length property']: form.metreage,
      furniture: form.furnished,
      locator: form.locator,
      tenant: form.tenant,
      witness: form.witness,
      administrator: username,
      cod_property: form.cod_property
    };

    try {
      const response = await axios.post('http://172.174.192.190/properties-register', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Dados enviados com sucesso:', response.data);
      // setModalContent({ title: 'Sucesso', message: 'Usuário cadastrado com sucesso!' });
      // setOpenModal(true);

      setForm(initialForm);
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : 'Erro ao enviar dados.';
      // setModalContent({ title: 'Erro', message: errorMessage });
      // setOpenModal(true);
    }
  };

  const isFormComplete = Object.values(form).every((value) => value);

  return (
    <>
      <Header />

      <Menu />

      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 10, mb: 2, color: '#673ab7', textAlign: 'center' }}>
          Cadstro de Vistoria
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID-Imóvel:"
                variant="outlined"
                value={form.cod_property}
                onChange={(e) => setForm({ ...form, cod_property: e.target.value })}
                margin="normal"
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vistoriador:"
                variant="outlined"
                value={form.surveyor}
                onChange={(e) => setForm({ ...form, surveyor: e.target.value })}
                margin="normal"
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="mobiliado-label">Mobiliado</InputLabel>

                <Select
                  labelId="mobiliado-label"
                  id="mobiliado"
                  label="Mobiliado"
                  value={form.furnished}
                  onChange={(e) => setForm({ ...form, furnished: e.target.value === 'true' ? true : false })}
                >
                  <MenuItem value="true">Sim</MenuItem>

                  <MenuItem value="false">Não</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Locador:"
                variant="outlined"
                margin="normal"
                value={form.locator}
                onChange={(e) => setForm({ ...form, locator: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Locatário:"
                variant="outlined"
                margin="normal"
                value={form.tenant}
                onChange={(e) => setForm({ ...form, tenant: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Testemunha:"
                variant="outlined"
                value={form.witness}
                onChange={(e) => setForm({ ...form, witness: e.target.value })}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Endereço:"
                variant="outlined"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Imobiliária:"
                value={form.real_state_name}
                onChange={(e) => setForm({ ...form, real_state_name: e.target.value })}
                variant="outlined"
                required
              >
                {realEstates.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!isFormComplete}
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
