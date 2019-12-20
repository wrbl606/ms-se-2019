export const Actions = {
  SET_TREE: 'SET_TREE',
  SET_FUNCTIONS: 'SET_FUNCTIONS',
  UPDATE_FUNCTION: 'UPDATE_FUNCTION',
  ADD_FUNCTION: 'ADD_FUNCTION',
}
export const FunctionSelectionState = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  MARKED: 'MARKED',
}
export const NO_FUNCTION_SELECTED = -100;
const appState = {
  tree: [2,[1,2]],
  functions: [
    {
      label: '1',
      levels: {
        0: [1,2,3],
        1: [3,2,1]
      },
      selectionState: FunctionSelectionState.ENABLED,
    },
    {
      label: '2',
      levels: {
        0: [1,2,3],
        1: [3,2,1]
      },
      selectionState: FunctionSelectionState.DISABLED,
    },
  ],
  currentFunctionIndex: NO_FUNCTION_SELECTED,
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
    default:
      return state
  }
}
