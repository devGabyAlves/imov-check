import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Menu from './menu';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30px'
}));

const StyledTextField = styled(TextField)({
  width: '50%',
  marginBottom: '20px'
});

const Pesquisa = () => {
  return (
    <div>
      <Header />
      <Menu />
      <StyledBox>
        <Typography variant="h4" gutterBottom sx={{ color: '#673ab7' }}>
          Pesquisa de imóvel
        </Typography>
        <Typography variant="body1" paragraph>
          Use o ID para buscar seu imóvel cadastrado. Se o imóvel não estiver registrado, utilize o botão
          <span style={{ color: '#673ab7' }}> 'Menu' </span>
          acima para adicioná-lo.
        </Typography>
        <StyledTextField variant="outlined" placeholder="Digite sua pesquisa" />
        <Button variant="contained" sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}>
          Pesquisar
        </Button>
      </StyledBox>
    </div>
  );
};

export default Pesquisa;
