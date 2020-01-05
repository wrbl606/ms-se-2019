export const Actions = {
  SET_TREE: 'SET_TREE',
  SET_FUNCTIONS: 'SET_FUNCTIONS',
  SET_CURRENT_FUNCTION: 'SET_CURRENT_FUNCTION',
  SET_LEVEL_SELECT_VALUE: 'SET_LEVEL_SELECT_VALUE',
}
export const FunctionSelectionState = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  MARKED: 'MARKED',
}
export const NO_FUNCTION_SELECTED = -100;
const appState = {
  tree: [2,[1,2]],
  levelsCount: 5,
  verticesCount: 3,
  functions: [
    {
      label: '1',
      levels: {
        0: [1,2,3],
      },
      selectionState: FunctionSelectionState.MARKED,
    },
    {
      label: '2',
      levels: {
        0: [1,2,3],
        1: [3,2,1],
      },
      selectionState: FunctionSelectionState.ENABLED,
    },
    {
      label: '3',
      levels: {
        0: [1,2,3],
        1: [3,2,1],
      },
      selectionState: FunctionSelectionState.DISABLED,
    },
  ],
  currentFunctionIndex: NO_FUNCTION_SELECTED,
  levelSelectValue: '0',
};

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 */
export default function appReducer (state = appState, action) {
  switch (action.type) {
    case Actions.SET_TREE:
      return {
        ...state,
        tree: action.tree,
      };
    case Actions.SET_FUNCTIONS:
      return {
        ...state,
        functions: action.functions
      };
    case Actions.SET_CURRENT_FUNCTION:
      return {
        ...state,
        currentFunctionIndex: action.currentFunctionIndex
      };
    case Actions.SET_LEVEL_SELECT_VALUE:
      return {
        ...state,
        levelSelectValue: action.levelSelectValue
      };
    default:
      return state
  }
}
