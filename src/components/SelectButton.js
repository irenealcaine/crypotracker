import React from 'react'
import { makeStyles } from 'tss-react/mui'


const SelectButton = ({ children, selected, onClick }) => {

  const useStyles = makeStyles()((theme) => {
    return {
      selectbutton: {
        border: "1px solid #06b6d4",
        borderRadius: 5,
        padding: 10,
        fontFamily: "Raleway",
        textAlign: 'center',
        cursor: "pointer",
        backgroundColor: selected ? "#06b6d4" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "#06b6d4",
          color: "black",
        },
        width: "14%",
        margin: 5,
        [theme.breakpoints.down('md')]: {
          margin: 2,
          padding: 5
        }
      }
    };
  })

  const { classes } = useStyles();

  return (
    <span
      onClick={onClick}
      className={classes.selectbutton}
    >{children}</span>
  )
}

export default SelectButton
