import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(() => {
  return {
    banner: {
      backgroundImage: 'url(./banner.jpg)'
    },
    bannerContent: {
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 25,
      justifyContent: 'space-arround'
    },
    tagLine: {

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
              fontFamily: 'Montserrat'
            }}>
            CryptoTracker
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              fontFamily: 'Montserrat'
            }}>
            Consigue la información de todas tus criptomonedas favoritas
          </Typography>
        </div>
      </Container>
    </div>
  )
}

export default Banner
