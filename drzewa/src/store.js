import { createStore, compose } from 'redux'
import appReducer from './reducers/appReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  appReducer,
  composeEnhancers()
)
export default store
