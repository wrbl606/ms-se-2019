import React from 'react'
import {
  makeStyles
} from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from './components/NavBar'
import TreeView from './components/TreeView'
import SideBar from './components/SideBar'

const SidebarStyle = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}))

function AppContainer () {
  const classes = SidebarStyle()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <TreeView />
      <SideBar />
    </div>
  )
}

export default AppContainer
