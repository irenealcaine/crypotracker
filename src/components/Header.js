import { AppBar, Select, Toolbar, Typography, Container, MenuItem, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles()(() => {
  return {
    title: {
      flex: 1,
      color: '#06b6d4',
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
  };
})

const Header = () => {

  const { classes } = useStyles();
  const navigate = useNavigate()

  const { currency, setCurrency } = CryptoState()
  // console.log(currency)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} className={classes.title} variant='h5'>
              Crypto Tracker
            </Typography>
            <Select variant='outlined' style={{ width: 100, height: 40, marginRight: 15 }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={'EUR'}>EUR</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
