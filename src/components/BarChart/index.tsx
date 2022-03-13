import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { HeaderTextWrapper, ProgressLoaderWrapper } from './styles';
import { ChartProps } from './types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Policy Report',
      },
    },
};

const BarChart = ({ selectedRange, showResult }: ChartProps) => {
    const [ chartData, setChartData ] = useState<any>({});
    const [ chartLoader, setChartLoader ] = useState<boolean>(false);

    const data = {
        labels: chartData && Object.keys(chartData).length > 0 && Object.keys(chartData).map((item) => item),
        datasets: [
          {
            label: 'Monthly Policy Reports',
            data: chartData && Object.keys(chartData).length > 0 && Object.values(chartData).map((item) => item),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };

    const fetchBarChartData = async() => {
        setChartLoader(true);
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/reports/monthly`, {
                params: {
                    startMonth: selectedRange.selectedStartMonth,
                    endMonth: selectedRange.selectedEndMonth
                }
            });
            if(response.status === 200){
                const { data } = response.data;
                setChartData(data);
            }
        } catch(err){
            console.log(err);
        }
        setChartLoader(false);
    }

    useEffect(() => {
        if(showResult){
            fetchBarChartData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRange]);

    return(
        <div>
            {!showResult && (
                <HeaderTextWrapper>
                    <Typography variant='h5' className='time-message-header'> Select Time Range </Typography>
                </HeaderTextWrapper>
            )}
            {chartLoader && (
                <ProgressLoaderWrapper>
                    <Grid container justifyContent='center' className='progress-loader'>
                        <CircularProgress />
                    </Grid>
                </ProgressLoaderWrapper>
            )
            }
            {!chartLoader && showResult && (
                <Container maxWidth="lg">
                    <Bar data={data} options={options} />
                </Container>
            )}
        </div>
    );
}

export default BarChart;