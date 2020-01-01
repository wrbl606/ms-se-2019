import React from 'react'
import {
  makeStyles
} from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from './components/NavBar'
import TreeView from './components/TreeView'
import SideBar from './components/SideBar';

const SidebarStyle = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    width: '90%',
    alignSelf: 'center'
  },
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '90%',
    alignSelf: 'center'
  },
  separatorRight: {
    borderRight: '1px solid #eee'
  },
  fab: {
    margin: theme.spacing(1.5),
    marginBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2)
  },
  mainButton: {
    margin: `${theme.spacing(1)}px 5%`,
  }
}))
export const drawerWidth = 650

function AppContainer() {
  const classes = SidebarStyle()

  return ( 
    <div className = {classes.root}>
      <CssBaseline />
      <NavBar />
      <TreeView />
      <SideBar />
    </div>
  )
}

export default AppContainer;