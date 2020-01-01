import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer'
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
import {
  FunctionSelectionState,
  NO_FUNCTION_SELECTED
} from '../reducers/appReducer'
import { makeStyles } from '@material-ui/core';
import { changeFunctionState, setCurrentFunctionIndex, setLevelSelectValue, addLevelToFunction, createNewFunctionWithLevel } from '../actions/appActions';
const Spacer = require('react-spacer')

const useStyles = makeStyles(theme => ({
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
const drawerWidth = 650

function SideBar(props) {
  const classes = useStyles();
  const {
    functions,
    currentFunction,
    currentFunctionIndex,
    levelsCount,
    verticesCount,
    levelSelectValue,
    onFunctionSelectionStateChange,
    onMarkFunctionAsCurrent,
    onLevelSelectValueChange,
    onAddLevelToFunction,
    onAddFunctionWithLevel,
  } = props

  function determineButtonColor(selectionState = FunctionSelectionState.DISABLED) {
    switch(selectionState) {
      case FunctionSelectionState.ENABLED: return 'secondary';
      case FunctionSelectionState.MARKED: return 'primary';
      default: return 'default';
    }
  }

  function changeFunctionState(fun, funIndex) {
    const isSelected = currentFunctionIndex === funIndex;

    if (!isSelected) {
      onMarkFunctionAsCurrent(funIndex);
      return;
    }

    const currentFunctionState = fun.selectionState;
    const stateCycle = [FunctionSelectionState.DISABLED, FunctionSelectionState.ENABLED, FunctionSelectionState.MARKED];
    const nextFunctionState = stateCycle[(stateCycle.findIndex((state) => state === currentFunctionState) + 1) % (stateCycle.length)]
    onFunctionSelectionStateChange(fun, funIndex, nextFunctionState);
  }

  function determineAllowedLevelsToAdd() {
    const allAvailableLevels = new Array(levelsCount).fill(0).map((_, index) => index.toString());
    allAvailableLevels.shift();
    const currentlyUsedLevels = currentFunction ? Object.keys(currentFunction.levels).map((l) => l.toString()) : [];
    const allowedLevels = [];
    for (const level in allAvailableLevels) {
      if (!currentlyUsedLevels.includes(level)) {
        allowedLevels.push(level);
      }
    }

    return allowedLevels;
  }

  function nodesCountOnLevel(levels, vertices) {
    const nodes = Math.pow(vertices, levels);
    return Number.isNaN(nodes) ? 0 : nodes;
  }

  function handleAddLevelToFunction() {
    if (!currentFunction) {
      const functionsCount = functions.length;
      onAddFunctionWithLevel(levelSelectValue, []);
      onMarkFunctionAsCurrent(functionsCount);
      return;
    }
    onAddLevelToFunction(currentFunction, currentFunctionIndex, levelSelectValue);
  }

  return (
    <Drawer className={classes.drawer}
      variant='permanent'
      classes={{paper: classes.drawerPaper}}
      anchor='right'>
      <div className={classes.toolbar}>
        <h2 align='center'>Edycja drzewa</h2> 
      </div> 
      <Divider/>
      <Spacer height='32px'/>
      <Grid container style={
        {
          paddingLeft: '5%',
          alignSelf: 'center'
        }
      }>
        <Grid item xs={6}>
        <FormControl className={
          classes.formControl
        }
        align='center'
        variant='outlined'>
          <InputLabel htmlFor='level-select'
          shrink>
          Poziom 
          </InputLabel> 
          <Select 
            onChange={(event) => onLevelSelectValueChange(event.target.value)}
            value={levelSelectValue}
            disabled={determineAllowedLevelsToAdd().length === 0}
            labelWidth={56}
            inputProps={
              {
                name: 'level-select',
                id: 'level-select'
              }
            }> 
            {
            determineAllowedLevelsToAdd().map((level) => (
                <MenuItem key={level}
                  value={level}
                  style={{textAlign: 'left'}}> 
                    { level } 
                </MenuItem>
              )
            )} 
            </Select> 
          </FormControl> 
        </Grid> 
        <Grid item xs={
          6
        }>
          <TextField id='standard-number'
          label='Ilość wezłów'
          disabled className={
            classes.textField
          }
          InputLabelProps={
            {
              shrink: true
            }
          }
          margin='normal'
          variant='outlined'
          value={`${nodesCountOnLevel(parseInt(levelSelectValue, 10), verticesCount)}`} />
        </Grid> 
      </Grid> 
      <Button variant='contained'
      color='secondary'
      onClick={handleAddLevelToFunction}
      disabled={determineAllowedLevelsToAdd().length === 0}
      className={
        classes.mainButton
      }>
        Dodaj 
      </Button> 
      <Grid container item xs={
        12
      }>
        <Grid item xs={
          6
        }
        className={
          classes.separatorRight
        }>
        <h3 style={
          {
            marginLeft: '5%'
          }
        }>
          Składniki funkcji 
        </h3>
        <List style={
          {
            width: '100%'
          }
        }>
        {
          currentFunctionIndex === NO_FUNCTION_SELECTED && ( 
            <Typography 
            align='center'
            variant='body2'> 
              Nie wybrano żadnej funkcji
            </Typography>
          )
        }
        {
          currentFunction && Object.keys(currentFunction.levels) === 0 && (
            <Typography 
            align='center'
            variant='body2'>
              Wybrana funkcja nie posiada przekształceń.
            </Typography>
          )
        }
        {
          currentFunction && Object.keys(currentFunction.levels).map((key) => ( 
            <ListItem key={
              `func-${currentFunction.label}-${key}`
            }>
              <TextField style={{width: '100%'}}
              label={`Poziom ${key}`}
              variant="outlined"
              value={currentFunction.levels[key]} />
            </ListItem>
          ))
        } 
        </List> 
        <Button variant='contained'
        className={classes.button}
        disabled={currentFunctionIndex === NO_FUNCTION_SELECTED}>
          Zastosuj
        </Button> 
      </Grid> 
        <Grid item xs={
          6
        }>
        <h3 style={
          {
            marginLeft: '5%'
          }
        }>
          Funkcje do złożenia 
        </h3> 
        <div> 
          {
            functions.map((fun, index) => ( 
              <Fab variant='round'
                color={determineButtonColor(fun.selectionState)}
                onClick={() => changeFunctionState(fun, index)}
                className={classes.fab}
                size={index === currentFunctionIndex ? 'medium' : 'small'}
                key={`fab-func-${index}`}> 
                { fun.label }
              </Fab>
            ))
          }
          <Fab variant='round'
            color='default'
            onClick={() => onMarkFunctionAsCurrent(NO_FUNCTION_SELECTED)}
            className={classes.fab}
            size={'small'}
            key={`fab-func-new`}> 
            +
          </Fab>
        </div> 
        <Button className={classes.button}
        disabled={functions.filter((f) => f.selectionState === FunctionSelectionState.MARKED).length < 2}
        variant='contained'>
          Złóż funkcje 
        </Button> 
        </Grid> 
      </Grid> 
    </Drawer>
  )
}

const mapStateToProps = (state) => {
  const currentFunction = state.functions[state.currentFunctionIndex] || null;
  return {
    functions: state.functions,
    currentFunctionIndex: state.currentFunctionIndex,
    currentFunction,
    levelsCount: state.levelsCount,
    verticesCount: state.verticesCount,
    levelSelectValue: state.levelSelectValue,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFunctionSelectionStateChange: (fun, functionIndex, newState) => {
      dispatch(changeFunctionState(fun, functionIndex, newState));
    },
    onMarkFunctionAsCurrent: (functionIndex) => {
      dispatch(setCurrentFunctionIndex(functionIndex));
    },
    onLevelSelectValueChange: (newSelectValue) => {
      dispatch(setLevelSelectValue(newSelectValue));
    },
    onAddLevelToFunction: (fun, functionIndex, levelIndex) => {
      dispatch(addLevelToFunction(fun, functionIndex, levelIndex));
    },
    onAddFunctionWithLevel: (levelIndex, levelValue) => {
      dispatch(createNewFunctionWithLevel(levelIndex, levelValue));
    }
  };
}

const SidebarWithState = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar)
export default SidebarWithState
