// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Switch, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import bgGif from './images/bgGif.gif';
import C1 from './images/EthereumCardImg.jfif';
import C2 from './images/CardanoCardImg.jfif';
import C3 from './images/DogeCardImg.jfif';
import C4 from './images/tetherCardImg.jpg';
import DetailView from './components/detailView';

const CardContentObject = [
  {
    title: "Ethereum",
    cImage: C1,
    cont: 'Ethereum is a decentralized blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Among cryptocurrencies, ether is second only to bitcoin in market capitalization.',
  },
  {
    title: 'Cardano',
    cImage: C2,
    cont: "Cardano's development began in 2015, led by Ethereum co-founder Charles Hoskinson. The project is overseen and supervised by the Cardano Foundation based in Zug, Switzerland. When launched in 2017, it was the largest cryptocurrency to use a proof-of-stake blockchain.",
  },
  {
    title: 'Doge Coin',
    cImage: C3,
    cont: "Dogecoin is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a joke, making fun of the wild speculation in cryptocurrencies at the time. It is considered both the first 'meme coin'",
  },
  {
    title: 'Tether',
    cImage: C4,
    cont: "Tether is an unaudited cryptocurrency stablecoin, launched by the company Tether Limited Inc. in 2014. ",
  }
];

const BackgroundContainer = styled('div')({
  backgroundImage: `url(${bgGif})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
});

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100%',
  justifyContent: 'space-between',
});

const CardContentWrapper = styled('div')({
  flexGrow: 1,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            <BackgroundContainer>
              <Container maxWidth="lg">
                <Typography variant="h2" align="center" gutterBottom style={{ color: 'white' }}>
                  Crypto Trends and Predictions
                </Typography>
                <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1">Toggle Theme</Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                 </Stack>
                </Grid>
                <Grid container spacing={4}>
                  {CardContentObject.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} style={{ display: 'flex' }}>
                      <StyledCard>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={card.cImage}
                          title={card.title}
                        />
                        <CardContentWrapper>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {card.cont}
                            </Typography>
                          </CardContent>
                        </CardContentWrapper>
                        <CardActions>
                          <Button size="small" onClick={() => window.location.href = `/details/${index}`}>Learn More</Button>
                        </CardActions>
                      </StyledCard>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </BackgroundContainer>
          } />
          <Route path="/details/:id" element={<DetailView cards={CardContentObject} darkMode={darkMode} handleThemeChange={handleThemeChange} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
