import React from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import { textAlign } from '@material-ui/system'

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
  }
}))
const drawerWidth = 400

export function ControlledOpenSelect () {
  const classes = SidebarStyle()

  return (
    <div />
  )
}

export default function PermanentDrawer () {
  const [ilosc, wezlyUpdate] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const classes = SidebarStyle()
  const handleChange = event => {
    wezlyUpdate(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
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
          <h2 align='center'>Edycja Drzewa</h2>
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
                onChange={() => handleChange('age')}
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

        <TextField
          id='standard'
          label='Funkcja zamiany'
          type='text'
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
          margin='normal'
          variant='outlined'
        />
        <Spacer height='60px' />
        <Container>
          <Button>Edytuj</Button>
          <Button>Wyczyść</Button>
        </Container>
        <Spacer height='60px' />
        <h3 style={{ marginLeft: '5%' }}>
          Historia zamiany
        </h3>
        <FormGroup aria-label='position' row>
          <List>
            <ListItem>
              <FormControlLabel value='start' control={<Checkbox />}
                label='2.3 Poziom 1'
                labelPlacement='end'
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                value='middle'
                control={<Checkbox />}
                label='2.3 Poziom 1'
                labelPlacement='end'
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                value='end'
                control={<Checkbox />}
                label='2.3 Poziom 1'
                labelPlacement='end'
              />
            </ListItem>
          </List>

        </FormGroup>
        <Button>Wyczyść</Button>
      </Drawer>
    </div>
  )
}
