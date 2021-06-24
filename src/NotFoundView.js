import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function NotFoundView() {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p>404: Page Not Found</p>
      <Link to='/'>Go to Home</Link>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    '& p': {
      fontSize: '24px'
    }
  }
})



