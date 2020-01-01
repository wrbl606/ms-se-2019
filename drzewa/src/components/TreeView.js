import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
}))


export default function TreeView() {
  const classes = useStyles();

  return (
    <main className = {
      classes.content
    }>
      <div className = {
        classes.toolbar
      }/> 
      <Typography paragraph id="drzewo">
        Tu będzie drzewo!!!!
      </Typography> 
    </main> 
  );
}