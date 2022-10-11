import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import Carousel from './Carousel';


const useStyles = makeStyles()(() => {
  return {
    banner: {
      backgroundImage: 'url(./banner.jpg)'
    },
    bannerContent: {
      height: 420,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 25,
      justifyContent: 'space-around'
    },
    tagLine: {
      display: 'flex',
      height: '40%',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center'
    }
  };
})

const Banner = () => {

  const { classes } = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Raleway'
            }}>
            Crypto Tracker
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              fontFamily: 'Raleway',
              backgroundColor: '#18181baa',
              borderRadius: 10,
              padding: 10,
              border: '2px solid #06b6d4',
              width: '80%'
            }}>
            Consigue la información de tus criptomonedas favoritas
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
