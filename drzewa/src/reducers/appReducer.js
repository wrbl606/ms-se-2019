export const Actions = {
  EXAMPLE_ACTION: 'EXAMPLE_ACTION'
}
const appState = {
  iloscWezlow: 0
}

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
