import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';


const Spacer = require('react-spacer')
const SidebarStyle = makeStyles(theme => ({
  formControl:
  {
    width: '300px',
    alignSelf: 'center',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
const drawerWidth = 400;

export function  ControlledOpenSelect() {
  const classes = SidebarStyle();




  return (
    <div>

    </div>
  );
}

export default function PermanentDrawer() {
  const [ilosc, wezlyUpdate] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const classes = SidebarStyle();
  const handleChange = event => {
    wezlyUpdate(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
          <Button color="inherit" style={{alignSelf: 'right'}}>Otwórz</Button>
          <Button color="inherit" style={{alignSelf: 'right'}}>Zapisz</Button>

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
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right">
          <div className={classes.toolbar} >
          <h2 align="center"> Edycja Drzewa </h2>
          </div>
          <Divider />
          <Spacer height='32px' />

            <FormControl className={classes.formControl, "block-example border border-primary"} width="200px" align="center">
              <InputLabel id="open-select-label">Poziom</InputLabel>
              <Select
                labelId="open-select-label"
                id="open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={ilosc}
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={10}>Pierwszy</MenuItem>
                <MenuItem value={20}>Drugi</MenuItem>
                <MenuItem value={30}>Trzeci</MenuItem>
                <MenuItem value={40}>...</MenuItem>
              </Select>
              <Spacer height='20px' />
              <TextField id="standard-number" label="Ilość wezłów na poziomie" type="number" className={classes.textField} InputLabelProps={{ shrink: true,   }} margin="normal"/>
              <TextField id="standard" label="Funkcja zamiany" type="text" className={classes.textField} InputLabelProps={{ shrink: true,   }} margin="normal"/>
              <Spacer height='60px'/>
              <Container>
              <Button>Edytuj</Button>
              <Button>Reset</Button>
              </Container>
              <Spacer height='60px'/>
              <h3>
              Historia Zamiany
              </h3>
              <FormGroup aria-label="position" row>
              <List alignContent="center">
              <ListItem>
              <FormControlLabel value="start" control={<Checkbox color="primary" />}
          label="2.3 Poziom 1"
          labelPlacement="end"
        />
        </ListItem><ListItem>

        <FormControlLabel
        value="middle"
      control={<Checkbox color="primary" />}
      label="2.3 Poziom 1"
      labelPlacement="end"
      />        </ListItem><ListItem>
      <FormControlLabel
      value="end"
      control={<Checkbox color="primary" />}
      label="2.3 Poziom 1"
      labelPlacement="end"
      />        </ListItem>
      </List>


              </FormGroup>
              <Button>Reset</Button>
            </FormControl>
        </Drawer>
      </div>
    );
  }
