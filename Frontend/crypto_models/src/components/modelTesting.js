import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';

const FullWidthPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ModelTesting = ({ id }) => {

  const modelParameters = [
    {
      model_name: 'Linear Regression',
      r_2: 0.999976,
      mse: 8.6136,
    },
    {
      model_name: 'Random Forest Regressor',
      r_2: 0.99955,
      mse: 7.8341,
    },
    {
      model_name: 'Linear Regression',
      r_2: 0.999982,
      mse: 0.000000065,
    },
    {
      model_name: 'Linear Regression',
      r_2: 0.8527,
      mse: 1.2232,
    }
  ]

  const [testCase, setTestCase] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [predictedValue, setPredictedValue] = useState('');
  const [error, setError] = useState('');
  const [percentageError, setPercentageError] = useState('');
  const model = modelParameters[id];

  const handleGenerateSample = async () => {
    if (typeof id === 'undefined') {
      alert('ID is not defined');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/generate-sample/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      setTestCase(JSON.stringify(data.testCase)); // Convert object to JSON string for display
      setTargetValue(data.targetValue);
      setPredictedValue(''); // Clear predicted value
      setError(''); // Clear error
      setPercentageError(''); // Clear percentage error
    } catch (err) {
      alert('Failed to fetch test case sample: ' + err);
    }
  };

  const handlePredictValue = async () => {
    if (typeof id === 'undefined') {
      alert('ID is not defined');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/predict-value`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          testCase: JSON.parse(testCase), // Convert JSON string back to object
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      setPredictedValue(data.predictedValue);
      const calculatedError = targetValue - data.predictedValue;
      setError(calculatedError);
      const calculatedPercentageError = (calculatedError / targetValue) * 100;
      setPercentageError(calculatedPercentageError.toFixed(2) + '%');
    } catch (err) {
      alert('Failed to predict value: ' + err);
    }
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" padding={2}>
      <FullWidthPaper elevation={3}>
        <Stack direction="row" spacing={2} mt={2}>
          <Typography variant="h5" gutterBottom>Best Fit Model:</Typography>
          <Typography variant="h5">{model.model_name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2} mt={2}>
          <Typography>R-square Value: {model.r_2}</Typography>
          <Typography>Mean Square Error: {model.mse}</Typography>
        </Stack>
      </FullWidthPaper>
      <FullWidthPaper elevation={3}>
        <Button variant="contained" onClick={handleGenerateSample}>Generate Test Case Sample</Button>
        <Stack direction="column" spacing={2} mt={2}>
          <TextField 
            label="Test Case Array" 
            value={testCase} 
            onChange={(e) => setTestCase(e.target.value)} 
            fullWidth 
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField 
            label="Target Value" 
            value={targetValue} 
            onChange={(e) => setTargetValue(e.target.value)} 
            fullWidth 
            InputProps={{
              readOnly: true,
            }}
          />
        </Stack>
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" onClick={handlePredictValue}>Predict Value</Button>
        </Stack>
        <Stack direction="column" spacing={2} mt={2}>
          <TextField 
            label="Predicted Value" 
            value={predictedValue} 
            onChange={(e) => setPredictedValue(e.target.value)} 
            fullWidth 
            InputProps={{
              readOnly: true,
            }}
          />
          <Stack direction='row' spacing={2} mt={2}>
            <TextField 
              label="Error" 
              value={error} 
              onChange={(e) => setError(e.target.value)} 
              fullWidth 
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField 
              label="Percentage Error" 
              value={percentageError} 
              onChange={(e) => setPercentageError(e.target.value)} 
              fullWidth 
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        </Stack>
      </FullWidthPaper>
    </Box>
  );
};

export default ModelTesting;
