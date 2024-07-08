import React, {useState} from 'react';
import { Typography, Box, IconButton} from '@mui/material';
import { styled } from '@mui/system';
import ei1 from '../images/plot1.png';
import ei2 from '../images/plot2.PNG';
import ei3 from '../images/plot3.PNG';
import ei4 from '../images/plot4.PNG';
import ei5 from '../images/plot5.PNG';
import ei6 from '../images/plot6.PNG';
import eid1 from '../images/plot1d.PNG';
import eid2 from '../images/plot2d.PNG';
import eid3 from '../images/plot3d.PNG';
import eid4 from '../images/plot4d.PNG';
import eid5 from '../images/plot5d.PNG';
import eid6 from '../images/plot6d.PNG';
import c1 from '../images/c1.jpeg';
import c2 from '../images/c2.jpeg';
import c3 from '../images/c3.jpeg';
import c4 from '../images/c4.jpeg';
import cd1 from '../images/cd1.jpeg';
import cd2 from '../images/cd2.jpeg';
import cd3 from '../images/cd3.jpeg';
import cd4 from '../images/cd4.jpeg';
import d1 from '../images/d1.jpeg';
import d2 from '../images/d2.jpeg';
import d3 from '../images/d3.jpeg';
import d4 from '../images/d4.jpeg';
import dd1 from '../images/dd1.jpeg';
import dd2 from '../images/dd2.jpeg';
import dd3 from '../images/dd3.jpeg';
import dd4 from '../images/dd4.jpeg';
import t1 from '../images/t1.jpeg';
import t2 from '../images/t2.jpeg';
import t3 from '../images/t3.jpeg';
import t4 from '../images/t4.jpeg';
import td1 from '../images/td1.jpeg';
import td2 from '../images/td2.jpeg';
import td3 from '../images/td3.jpeg';
import td4 from '../images/td4.jpeg';


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
  
const CircularButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    width: '50px',
    height: '50px',
    zIndex: 1,
    boxShadow: theme.shadows[3], // Add box shadow for paper effect
    borderRadius: '50%', // Make the button circular
  }));
  
const LeftButton = styled(CircularButton)({
    left: '-50px', // Adjust to position correctly
  });
  
const RightButton = styled(CircularButton)({
    right: '-50px', // Adjust to position correctly
  });

const GraphsPlots = ({ id = 0, theme = false }) => {

    const list = [
        [
            {
                title: "Close Price Over Time",
                plot: ei1,
                desc: "The above helps understand that for a start time to mid the price has been low but in recent past there is uprise in close price which increses the variance much.",
            },
            {
                title: "Volume of transaction",
                plot: ei2,
                desc: "Voulme of transaction of currency has increased in recent past which may be the reason of increase in close price." 
            },
            {
                title: "Market Capatilization Over Time",
                plot: ei3,
                desc: "A spike in market capitalization, reflected as a rise in a company's stock price multiplied by its outstanding shares, typically indicates increased investor interest or positive news. This spike often leads to a higher closing price, as the market perceives the company as more valuable.",
            },
            {
                title: "Close Price Vs High Pice, Low Price & Volume",
                plot: ei4,
                desc: "Close price and High price and Low price are strongly dependent. But Volume is Not as the shows scattered points."
            },
            {
                title: "Correlation Matrix",
                plot: ei5,
                desc: "All the columns are highly corelated"
            },
            {
                title: "Linear Regression Model",
                plot: ei6,
                desc: "It represents how perfectly model has learn the data points and predictions are also almost correct, showing 99% accuracy."
            }
        ],
        [
            {
                title: "Feature Importance",
                plot: c1,
                desc: "",
            },
            {
                title: "Distribution of Close Price",
                plot: c2,
                desc: "",
            },
            {
                title: "Close Price Overtime",
                plot: c3,
                desc: "",
            },
            {
                title: "Corelation matrix",
                plot: c4,
                desc: "",
            },
        ],
        [
            {
                title: "Model Evaluation Metrics",
                plot: d1,
                desc: "This bar chart compares the performance metrics (MSE, MAE, and R2) of five different regression models: Linear Regression, Random Forest, Gradient Boosting, Support Vector Regressor, and Decision Tree. The Linear Regression model shows the best performance with the lowest MSE and MAE and the highest R2 score, indicating its superior predictive accuracy compared to the other models. The Support Vector Regressor shows a negative R2 score, indicating poor performance.",
            },
            {
                title: "Model Comparision",
                plot: d2,
                desc: "These scatter plots display the actual values versus the predicted values for each of the five models. The dashed line represents the ideal scenario where predicted values perfectly match the actual values. The closer the points are to this line, the better the model's predictions. The Linear Regression, Random Forest, and Gradient Boosting models show predictions closely aligning with the actual values, indicating high accuracy. In contrast, the Support Vector Regressor shows significant deviations from the ideal line.",
            },
            {
                title: "Close Price and Volume Over Time",
                plot: d3,
                desc: "This line chart visualizes Dogecoin's closing price and trading volume over time. It shows a significant spike in both price and volume around early 2021, highlighting a period of intense market activity and interest in Dogecoin. The dual y-axes allow for a clear comparison of how the trading volume correlates with price movements.",
            },
            {
                title: "Close Price Over Time",
                plot: d4,
                desc: "This line chart focuses on Dogecoin's closing price from 2014 to 2021. It illustrates a relatively stable price with a sharp increase starting in late 2020, peaking in early 2021. This visualization highlights the sudden and dramatic rise in Dogecoin's value, which can be attributed to market speculation and increased popularity.",
            },
        ],
        [
            {
                title: "Close Price and Volume Over Time",
                plot: t1,
                desc: "Above Plot suggest that the of price of tether coin remains constant even though the volume of coin keep increasing",
            },
            {
                title: "Close Price Over Time",
                plot: t2,
                desc: "Above Plot suggest that the price of tether coin remains constant through out the dataset, just a spike at beginning because at that time coin listed at trading forum",
            },
            {
                title: "Feature Importance",
                plot: t3,
                desc: `Feature ranking:
                            1. feature High (0.431400)
                            2. feature Open (0.189569)
                            3. feature Low (0.183214)
                            4. feature Marketcap (0.165394)
                            5. feature Volume (0.030423)
                        Feature selection confirm that all these fetures are important,as we already take them for our training and drop rest of them`,
            },
            {
                title: "Corelation Matrix",
                plot: t4,
                desc: "The correlation graph above shows the relationship between different features and how they are correlated. If the value is close to 1, it means they are highly correlated, and vice versa.",
            },
        ]
    ];
    
    const listd = [
        [
            {
                title: "Close Price Over Time",
                plot: eid1,
                desc: "The above plot helps understand that for a start time to mid the price has been low but in recent past there is uprise in close price which incraeses the variance much.",
            },
            {
                title: "Volume of transaction",
                plot: eid2,
                desc: "Volume of transaction of currency has increased in recent past which may be the reason of increase in close price." 
            },
            {
                title: "Market Capatilization Over Time",
                plot: eid3,
                desc: "A spike in market capitalization, reflected as a rise in a company's stock price multiplied by its outstanding shares, typically indicates increased investor interest or positive news. This spike often leads to a higher closing price, as the market perceives the company as more valuable.",
            },
            {
                title: "Close Price Vs High Pice, Low Price & Volume",
                plot: eid4,
                desc: "Close price and High price and Low price are strongly dependent. But Volume is Not as the plot shows scattered points."
            },
            {
                title: "Correlation Matrix",
                plot: eid5,
                desc: "All the columns are highly corelated"
            },
            {
                title: "Linear Regression Model",
                plot: eid6,
                desc: "It represents how perfectly model has learn the data points and predictions are also almost correct, showing 99% accuracy."
            }
        ],
        [
            {
                title: "Feature Importance",
                plot: cd1,
                desc: "",
            },
            {
                title: "Distribution of Close Price",
                plot: cd2,
                desc: "",
            },
            {
                title: "Close Price Overtime",
                plot: cd3,
                desc: "",
            },
            {
                title: "Corelation matrix",
                plot: cd4,
                desc: "",
            },
        ],
        [
            {
                title: "Model Evaluation Metrics",
                plot: dd1,
                desc: "This bar chart compares the performance metrics (MSE, MAE, and R2) of five different regression models: Linear Regression, Random Forest, Gradient Boosting, Support Vector Regressor, and Decision Tree. The Linear Regression model shows the best performance with the lowest MSE and MAE and the highest R2 score, indicating its superior predictive accuracy compared to the other models. The Support Vector Regressor shows a negative R2 score, indicating poor performance.",
            },
            {
                title: "Model Comparision",
                plot: dd2,
                desc: "These scatter plots display the actual values versus the predicted values for each of the five models. The dashed line represents the ideal scenario where predicted values perfectly match the actual values. The closer the points are to this line, the better the model's predictions. The Linear Regression, Random Forest, and Gradient Boosting models show predictions closely aligning with the actual values, indicating high accuracy. In contrast, the Support Vector Regressor shows significant deviations from the ideal line.",
            },
            {
                title: "Close Price and Volume Over Time",
                plot: dd3,
                desc: "This line chart visualizes Dogecoin's closing price and trading volume over time. It shows a significant spike in both price and volume around early 2021, highlighting a period of intense market activity and interest in Dogecoin. The dual y-axes allow for a clear comparison of how the trading volume correlates with price movements",
            },
            {
                title: "Close Price Over Time",
                plot: dd4,
                desc: "This line chart focuses on Dogecoin's closing price from 2014 to 2021. It illustrates a relatively stable price with a sharp increase starting in late 2020, peaking in early 2021. This visualization highlights the sudden and dramatic rise in Dogecoin's value, which can be attributed to market speculation and increased popularity.",
            },
        ],
        [
            {
                title: "Close Price and Volume Over Time",
                plot: td1,
                desc: "Above Plot suggest that the of price of tether coin remains constant even though the volume of coin keep increasing",
            },
            {
                title: "Close Price Over Time",
                plot: td2,
                desc: "Above Plot suggest that the price of tether coin remains constant through out the dataset, just a spike at beginning because at that time coin listed at trading forum",
            },
            {
                title: "Feature Importance",
                plot: td3,
                desc: `Feature ranking:
                            1. feature High (0.431400)
                            2. feature Open (0.189569)
                            3. feature Low (0.183214)
                            4. feature Marketcap (0.165394)
                            5. feature Volume (0.030423)
                        Feature selection confirm that all these fetures are important,as we already take them for our training and drop rest of them`,
            },
            {
                title: "Corelation Matrix",
                plot: td4,
                desc: "The correlation graph above shows the relationship between different features and how they are correlated. If the value is close to 1, it means they are highly correlated, and vice versa.",
            },
        ]
    ];

    const selectedList = theme ? listd : list;
    const [currentIndex, setCurrentIndex] = useState(0);
    const selectedListIndex = selectedList[id]
    const selectedListItem = selectedListIndex[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedListIndex.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedListIndex.length) % selectedListIndex.length);
      };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" padding={2}>
            <Typography variant="h3" gutterBottom>
                {selectedListItem.title}
            </Typography>
            <ImageContainer>
                <LeftButton onClick={handlePrev}>
                {'<'}
                </LeftButton>
                <StyledImage src={selectedListItem.plot} alt={selectedListItem.title} />
                <RightButton onClick={handleNext}>
                {'>'}
                </RightButton>
            </ImageContainer>
            <Typography variant="body1" mt={2}>
                {selectedListItem.desc}
            </Typography>
        </Box>
    );
};
export default GraphsPlots;