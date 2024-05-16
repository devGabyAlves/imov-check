import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{ color: 'white', backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#5e35b1' } }}
        onClick={handleClick}
      >
        Cadastro
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={() => handleOptionClick('Novo Imóvel')} component={Link} to="/cadastro_imovel">
          Imóvel
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick('Novo Corretor')} component={Link} to="/cadastro_corretor">
          Corretor
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick('Novo Corretor')} component={Link} to="/pesquisa">
          Pesquisa
        </MenuItem>
      </Menu>
      {selectedOption && (
        <Typography color="purple" sx={{ mt: 1 }}>
          Você selecionou: {selectedOption}
        </Typography>
      )}
    </div>
  );
};

export default Dropdown;
