import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(12), // Adicionado espaçamento superior
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  maxWidth: '500px',
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#5e35b1',
    },
    '&:hover fieldset': {
      borderColor: '#5e35b1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5e35b1',
    },
  },
}));

interface Property {
  id: string;
  name: string;
}

const Pesquisa = () => {
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (realStateName: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://172.174.192.190/list-properties', {
        real_state_name: realStateName,
      }, {
        headers: {
          Authorization: token
        }
      });
      setProperties(response.data);
    } catch (error) {
      setError('Erro ao buscar imóveis. Por favor, tente novamente.');
      console.error('Erro ao buscar imóveis:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const realStateName = localStorage.getItem('realtyName');
    if (realStateName) {
      fetchProperties(realStateName);
    } else {
      console.log('Real state name not found in localStorage');
    }
  }, []); 
  
  return (
    <div>
      <Header />
      <StyledBox>
        <Typography variant="h4" gutterBottom sx={{ color: '#673ab7' }}>
          Pesquisa de Imóvel
        </Typography>
        <Typography variant="body1" paragraph>
          Use o ID para buscar seu imóvel cadastrado. Se o imóvel não estiver registrado, utilize o botão
          <span style={{ color: '#673ab7' }}> 'Menu' </span>
          acima para adicioná-lo.
        </Typography>
        <StyledTextField
          variant="outlined"
          placeholder="Digite sua pesquisa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box display="flex" justifyContent="center" gap={2} width="100%" maxWidth="500px">
          <Button
            variant="contained"
            sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
            disabled={loading}
            onClick={() => fetchProperties(search)}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Pesquisar'}
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: '#673ab7', color: '#673ab7', '&:hover': { backgroundColor: '#f3e5f5' } }}
            onClick={() => setSearch('')}
          >
            Limpar
          </Button>
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          properties.length > 0 ? (
            <Box mt={4} width="100%" maxWidth="600px">
              {properties.map((property) => (
                <Box key={property.id} sx={{ mb: 2, p: 2, border: '1px solid #673ab7', borderRadius: '4px' }}>
                  <Typography variant="h6">{property.name}</Typography>
                  <Typography>ID: {property.id}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ mt: 4, color: '#673ab7' }}>
              Nenhum imóvel encontrado.
            </Typography>
          )
        )}
      </StyledBox>
    </div>
  );
};

export default Pesquisa;
