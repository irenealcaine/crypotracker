import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { makeStyles } from 'tss-react/mui'
import { HistoricalChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data'
import SelectButton from './SelectButton'

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
  const { currency } = CryptoState()

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  console.log(coin)



  useEffect(() => {
    fetchHistoricData()
  }, [days])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down('md')]: {
          width: '100%',
          marginTop: 0,
          padding: 20,
          paddingTop: 0
        }
      },
    };
  })

  const { classes } = useStyles();



  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicData ? (
            <CircularProgress
              style={{ color: 'gold' }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = `${date.getHours()}:${date.getMinutes()}`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [{
                    data: historicData.map((coin) => coin[1]),
                    label: `Precio en los últimos ${days} días en ${currency}`,
                    borderColor: '#eebc1d'
                  }]
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1
                    }
                  }
                }}
              // style={{
              //   width: '70%'
              // }}
              />
              <div style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%'
              }}>
                {chartDays.map(day => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >{day.label}</SelectButton>
                ))}
              </div>
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo
