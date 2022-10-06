import { AppBar, Select, Toolbar, Typography, Container, MenuItem } from '@mui/material'
import React from 'react'


const Header = () => {
  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography>
            CryptoTracker
          </Typography>
          <Select variant='outlined' style={{ width: 100, height: 40, marginLeft: 15 }}>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
