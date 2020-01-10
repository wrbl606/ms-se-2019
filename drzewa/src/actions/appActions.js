import { Actions, NO_FUNCTION_SELECTED, FunctionSelectionState } from '../reducers/appReducer'
import store from '../store';

export function setTree (tree = []) {
  return {
    type: Actions.SET_TREE,
    tree
  }
}

export function setVerticesCount(verticesCount) {
  return {
    type: Actions.SET_VERTICES_COUNT,
    verticesCount
  }
}

export function setLevelsCount(levelsCount) {
  return {
    type: Actions.SET_LEVELS_COUNT,
    levelsCount
  }
}

export function setFunctions (functions = []) {
  return {
    type: Actions.SET_FUNCTIONS,
    functions
  }
}

export function addFunction (fun) {
  const currentFunctions = [...store.getState().functions];
  currentFunctions.push(fun);
  return setFunctions(currentFunctions);
}

export function setFunction (funIndex, fun) {
  const currentFunctions = [...store.getState().functions];
  currentFunctions[funIndex] = fun;
  return setFunctions(currentFunctions);
}

export function createNewFunctionWithLevel (levelIndex, levelValue = []) {
  const newFunc = createNewFunction();
  return addFunction({
    ...newFunc,
    levels: {
      ...newFunc.levels,
      [levelIndex]: levelValue,
    }
  });
}

export function changeFunctionState(fun, functionIndex, newState) {
  const newFunc = {
    ...fun,
    selectionState: newState,
  };
  const currentFunctions = [...store.getState().functions];
  currentFunctions[functionIndex] = newFunc;
  return setFunctions(currentFunctions);
}

export function addLevelToFunction(fun, functionIndex, newLevelIndex) {
  const newFunc = {
    ...fun,
    levels: {
      ...fun.levels,
      [newLevelIndex]: []
    },
  };
  const currentFunctions = [...store.getState().functions];
  currentFunctions[functionIndex] = newFunc;
  return setFunctions(currentFunctions);
}

export function setCurrentFunctionIndex (currentFunctionIndex = NO_FUNCTION_SELECTED) {
  return {
    type: Actions.SET_CURRENT_FUNCTION,
    currentFunctionIndex
  }
}

export function setLevelSelectValue (levelSelectValue = '0') {
  return {
    type: Actions.SET_LEVEL_SELECT_VALUE,
    levelSelectValue: levelSelectValue.toString()
  }
}

function createNewFunction() {
  return {
    label: (store.getState().functions.length + 1).toString(),
    levels: {},
    selectionState: FunctionSelectionState.ENABLED,
  };
}
