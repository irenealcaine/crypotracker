import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext';
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/CoinInfo';
import { CircularProgress, Typography, Container } from '@mui/material';
import parse from 'html-react-parser';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(coin)

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
          alignItems: 'center'
        },
        background: 'linear-gradient(150deg, transparent 15%, #06b6d422 50%, transparent 85%)'
      },
      sidebar: {
        width: '100%',
        display: 'flex',
        alignItems: 'end',
        paddingLeft: 30,
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          paddingLeft: 0
        },
        marginTop: 25,
        paddingBottom: 25,
        borderBottom: '2px solid grey',
        gap: 36
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
      },
      footer: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse',
          alignItems: 'center',
        },
      },
      footer1: {
        width: '70%',
        paddingRight: 40,
        paddingTop: 0,
        [theme.breakpoints.down('md')]: {
          width: '100%',
          paddingRight: 0,
          paddingTop: 20
        },
        textAlign: 'justify'
      },
      footer2: {
        width: '30%',
        [theme.breakpoints.down('md')]: {
          width: '100%'
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


  return (
    <div className={classes.container}>

      <div className={classes.sidebar}>
        <img src={coin?.image.large} alt={coin?.name} height='70' />
        <Typography variant='h4' className={classes.heading}>
          <a href={coin?.links.homepage[0]} target='_blank' rel="noreferrer"> {coin?.name}</a>
        </Typography>
        <Typography variant='h3' style={{ fontFamily: 'Raleway', fontWeight: 'bold' }}>
          {coin?.market_data.current_price[currency.toLowerCase()]} {symbol}
        </Typography>
        {/* {console.log(coin)} */}
      </div>

      <CoinInfo coin={coin} />

      <Container className={classes.footer}>
        <Typography style={{}} className={classes.footer1}>
          {parse(coin.description.en)}
        </Typography>
        <div style={{}} className={classes.footer2}>
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
      </Container>
    </div>
  )
}

export default CoinPage
