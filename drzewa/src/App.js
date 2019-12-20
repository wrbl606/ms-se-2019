import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { FunctionSelectionState, NO_FUNCTION_SELECTED } from './reducers/appReducer'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import ListItem from '@material-ui/core/ListItem'

const Spacer = require('react-spacer')
const SidebarStyle = makeStyles(theme => ({
  formControl:
  {
    marginTop: theme.spacing(2),
    width: '90%',
    alignSelf: 'center'
  },
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
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
const drawerWidth = 650

export function ControlledOpenSelect () {
  const classes = SidebarStyle()

  return (
    <div />
  )
}

function AppContainer (props) {
  const { functions, currentFunction, currentFunctionIndex } = props
  const classes = SidebarStyle()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} elevation={0}>
        <Toolbar>
          <Button color='inherit' style={{ alignSelf: 'right' }}>Otwórz</Button>
          <Button color='inherit' style={{ alignSelf: 'right' }}>Zapisz</Button>

        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
            Tu będzie drzewo!!!!
        </Typography>
      </main>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='right'>
        <div className={classes.toolbar} >
          <h2 align='center'>Edycja drzewa</h2>
        </div>
        <Divider />
        <Spacer height='32px' />

        <Grid container style={{ paddingLeft: '5%', alignSelf: 'center' }}>
          <Grid item xs={6}>
            <FormControl
              className={classes.formControl}
              align='center'
              variant='outlined'>
              <InputLabel
                htmlFor='level-select'
                shrink
              >
          Poziom
              </InputLabel>
              <Select
                onChange={() => {}}
                value={3}
                labelWidth={56}
                inputProps={{
                  name: 'level-select',
                  id: 'level-select'
                }}
              >
                { [1, 2, 3, 4, 5, 6].map((level) => <MenuItem key={level} value={level} style={{ textAlign: 'left' }}>{level}</MenuItem>) }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='standard-number'
              label='Ilość wezłów'
              disabled
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
              margin='normal'
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Button 
          variant='contained'
          color='secondary' 
          className={classes.mainButton}>
            Zastosuj
        </Button>
        <Grid container item xs={12}>
          <Grid item xs={6} className={classes.separatorRight}>
            <h3 style={{ marginLeft: '5%' }}>
              Składniki funkcji
            </h3>
            <List style={{width: '100%'}}>
              {
                !!currentFunctionIndex && (
                  <Typography align='center' variant='body2'>No level functions found</Typography>
                )
              }
              {
                currentFunction && Object.keys(currentFunction.levels).map((key) => (
                  <ListItem key={`func-${key}`} >
                    <TextField style={{width: '100%'}} label={`Poziom ${key}`} variant="outlined" />
                  </ListItem>
                ))
              }
            </List>
            <Button variant='contained' className={classes.button} disabled={currentFunctionIndex === NO_FUNCTION_SELECTED}>
              Zastosuj
            </Button>
          </Grid>
          <Grid item xs={6}>
            <h3 style={{ marginLeft: '5%' }}>
              Funkcje do złożenia
            </h3>
            <div>
              {
                functions.map((fun, index) => (
                  <Fab
                    variant='round'
                    color={fun.selectionState === FunctionSelectionState.ENABLED ? 'secondary' : 'default'}
                    className={classes.fab}
                    size={index === currentFunctionIndex ? 'medium' : 'small'}
                    key={`fab-func-${index}`}>
                    {fun.label}
                  </Fab>
                ))
              }
            </div>
            <Button
              className={classes.button}
              variant='contained'>
                Złóż funkcje
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentFunction = state.functions[state.currentFunctionIndex] || null;
  return {
    functions: state.functions,
    currentFunctionIndex: state.currentFunctionIndex,
    currentFunction,
  }
}

const AppContainerWithState = connect(
  mapStateToProps
)(AppContainer)
export default AppContainerWithState
