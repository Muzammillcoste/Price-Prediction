import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Switch, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';
import Home from './home';
import ModelTesting from './modelTesting';
import GraphsPlots from './graghsPlot';

const Sidebar = styled(Box)(({ theme }) => ({
  width: '250px',
  backgroundColor: theme.palette.background.paper,
  padding: '20px',
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Content = styled(Box)(({ theme }) => ({
  marginLeft: '270px',
  padding: '20px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.default, // Lighter background color for the content area in dark mode
}));


const DetailView = ({ cards, darkMode, handleThemeChange }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('home');
  const card = cards[id];

  const handleNotebookClick = () => {
    let url = '';
    switch (id) {
      case '0':
        url = 'https://www.kaggle.com/code/abdulkareemahmed/ethereumcoin';
        break;
      case '1':
        url = 'https://colab.research.google.com/drive/1BfyMJmtcs5gxFZHVA8rm_XevcPCTYc8P?authuser=1#scrollTo=JlEYIzfuNxgF';
        break;
      case '2':
        url = 'https://www.kaggle.com/code/muhammadalihasnain/crypto-currency-prediction'
        break;
      case '3':
        url = 'https://www.kaggle.com/code/muzammilrizvi1/price-prediction';
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box display="flex">
      <Sidebar>
        <div>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1">Toggle Theme</Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} />
          </Stack>
          <Typography variant="h5" gutterBottom>{card.title}</Typography>
          <Button fullWidth onClick={() => setCurrentView('home')}>Home</Button>
          <Button fullWidth onClick={() => setCurrentView('graphs')}>Graphs and Plots</Button>
          <Button fullWidth onClick={handleNotebookClick}>Notebook</Button>
          <Button fullWidth onClick={() => setCurrentView('modelTesting')}>Model Testing</Button>
          <Button fullWidth onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </Sidebar>
      <Content width="100%">
        {currentView === 'home' && <Home card={card} />}
        {currentView === 'modelTesting' && <ModelTesting id={id} />}
        {currentView === 'graphs' && <GraphsPlots id={id} theme={darkMode} />}
      </Content>
    </Box>
  );
};

export default DetailView;
