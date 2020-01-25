import React from 'react'
import {
  makeStyles, createMuiTheme
} from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import NavBar from './components/NavBar'
import TreeView from './components/TreeView'
import SideBar from './components/SideBar'

const useStyles = makeStyles({
  root: {
    display: 'flex'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {main: '#455A64'},
    secondary: {main: '#FFC107'}
  }
})

function AppContainer () {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <TreeView />
        <SideBar />
      </div>
    </ThemeProvider>
  )
}

export default AppContainer
