import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { CircularProgress, createTheme, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import { Container } from '@mui/system'
// import { Navigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { currency, symbol } = CryptoState()

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#06b6d4',
      },
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  const useStyles = makeStyles()(() => {
    return {
      row: {
        backgroundImage: '#06b6d407',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#131111'
        },
        fontFamily: 'Raleway'
      },
    };
  })

  const { classes } = useStyles();
  const navigate = useNavigate()

  return (


    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center', backgroundImage: 'linear-gradient(150deg, transparent 15%, #06b6d422 50%, transparent 85%)' }}>
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: 'Raleway' }}
        >
          Criptomonedas
        </Typography>
        <TextField
          label='Buscar...'
          varaint='outlined'
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {
            loading ? (
              <CircularProgress
                style={{ color: '#06b6d4' }}
                size={250}
                thickness={1}
              />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: '#06b6d4' }}>
                  <TableRow>
                    {['Moneda', 'Precio', 'Cambio en 24h', 'Market cap'].map((head) => (
                      <TableCell
                        style={{
                          color: 'black',
                          fontWeight: '700',
                          fontFamily: 'Raleway'
                        }}
                        key={head}
                        align={head === 'Moneda' ? '' : 'right'}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0
                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                          style={{ border: '1px solid transparent' }}
                        >
                          <TableCell component='th' scope='row' style={{ display: 'flex', gap: 15, border: '1px solid transparent' }}>
                            <img src={row.image} alt={row.name} height='50' style={{ marginBottom: 10 }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ textTransform: 'uppercase', fontSize: 22 }}>
                                {row.symbol}
                              </span>
                              <span style={{ color: 'darkgrey' }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            align='right'
                            style={{ border: '1px solid transparent' }}
                          >
                            {row.current_price.toFixed(2)}{symbol}
                          </TableCell>
                          <TableCell
                            align='right'
                            style={{ color: profit > 0 ? '#65a30d' : '#dc2626', fontWeight: '500', border: '1px solid transparent' }}
                          >
                            {profit && '+'}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            align='right'
                            style={{ border: '1px solid transparent' }}
                          >
                            {row.market_cap.toString().slice(0, -6)}M
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>

        <Pagination
          color='primary'
          style={{
            padding: 20, width: '100%', display: 'flex', justifyContent: 'center'
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch().length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0, 450)
          }}

        />
      </Container>
    </ThemeProvider >
  )
}

export default CoinsTable
