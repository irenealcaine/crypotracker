import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext';
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/CoinInfo';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';

const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()

  const { currency, symbol } = CryptoState()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  // console.log(coin)

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems: 'center'
        },
        background: 'linear-gradient(150deg, transparent 15%, #06b6d422 50%, transparent 85%)'
      },
      sidebar: {
        width: '30%',
        [theme.breakpoints.down('md')]: {
          width: '100%'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        borderRight: '2px solid grey',
      },
      heading: {
        fontWeight: 'bold',
        fontFamily: 'Raleway',
      },
      marketData: {
        alignSelf: 'start',
        padding: 25,
        paddingTop: 10,
        width: '100%',
        [theme.breakpoints.down('md')]: {
          display: 'flex',
          justifyContent: 'space-around',
        },
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'start',
        },
      }
    };
  })

  const { classes } = useStyles();

  if (!coin) return <CircularProgress
    style={{ color: '#06b6d4' }}
    size={250}
    thickness={1}
  />

  const profit = coin?.market_data.price_change_percentage_24h > 0

  return (
    <div className={classes.container}>

      <div className={classes.sidebar}>
        <img src={coin?.image.large} alt={coin?.name} height='200' style={{ marginBottom: 20 }} />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h5' className={classes.heading}>Rango: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: 'Raleway' }}>{coin?.market_cap_rank} </Typography>
          </span>

          <span style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h5' className={classes.heading}>Precio: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: 'Raleway' }}>
              {coin?.market_data.current_price[currency.toLowerCase()]} {symbol}
            </Typography>
            &nbsp; &nbsp;

            <Typography variant='h6' style={{ fontFamily: 'Raleway', color: profit ? '#65a30d' : '#dc2626' }}>
              ({profit ? '+' : ''}{coin?.market_data.price_change_percentage_24h.toFixed(2)}%)
            </Typography>
          </span>

          <span style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h5' className={classes.heading}>Market cap: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: 'Raleway' }}>{coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)} M {symbol}</Typography>
          </span>

          <span style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h5' className={classes.heading}>Web: </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{ fontFamily: 'Raleway' }}><a href={coin?.links.homepage[0]} target='_blank' rel="noreferrer"> {coin?.name}</a></Typography>
          </span>

        </div>
        {console.log(coin)}
      </div>

      <CoinInfo coin={coin} />

    </div>
  )
}

export default CoinPage
