import { combineReducers } from 'redux'
import auth from './auth'
import load from './load'
import display from './display'
import newMatch from './newMatch'

export const rootReducer = combineReducers({
  auth,
  load,
  display,
  newMatch
})

export default rootReducer
