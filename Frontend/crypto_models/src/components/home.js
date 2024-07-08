import React from 'react';
import { Container, Typography, Box} from '@mui/material';
import { styled } from '@mui/system';

const Content = styled(Box)(({ theme }) => ({
    marginLeft: '270px',
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.default,
  }));
  
  const ImageContainer = styled(Box)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
  
  const StyledImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '400px', // Constrain the image height
    borderRadius: '8px',
  });
  
//   const CircularButton = styled(IconButton)(({ theme }) => ({
//     position: 'absolute',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     backgroundColor: theme.palette.background.paper,
//     color: theme.palette.getContrastText(theme.palette.background.paper),
//     '&:hover': {
//       backgroundColor: theme.palette.background.default,
//     },
//     width: '50px',
//     height: '50px',
//     zIndex: 1,
//     boxShadow: theme.shadows[3], // Add box shadow for paper effect
//     borderRadius: '50%', // Make the button circular
//   }));
  
//   const LeftButton = styled(CircularButton)({
//     left: '-25px', // Adjust to position correctly
//   });
  
//   const RightButton = styled(CircularButton)({
//     right: '-25px', // Adjust to position correctly
//   });

const Home = ({card}) => {
    // const handleNext = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % card.length);
    //   };
    
    //   const handlePrev = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 1 + card.length) % card.length);
    //   };

    return (
      <Box>
        <Container maxWidth="sm">
          <Typography variant="h3" gutterBottom>
            {card.title}
          </Typography>
          <ImageContainer>
            {/* <LeftButton onClick={handlePrev}>
              {'<'}
            </LeftButton> */}
            <StyledImage src={card.cImage} alt={card.title} />
            {/* <RightButton onClick={handleNext}>
              {'>'}
            </RightButton> */}
          </ImageContainer>
          <Typography variant="body1" mt={2}>
            {card.cont}
          </Typography>
        </Container>
      </Box>
    );
  }
  export default Home;