import { Record } from 'immutable'
import {
  ANONYMOUS,
  ATTEMPTING_LOGIN,
  AUTH_POPUP_CLOSED,
  SIGNED_IN,
  SIGNED_OUT
} from '../constants'

const initialState = Record({
  authStatus: ANONYMOUS,
  currentUser: null
})

const defaultState = new initialState()

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case ATTEMPTING_LOGIN:
      return state.set(`authStatus`, ATTEMPTING_LOGIN)
    case AUTH_POPUP_CLOSED:
      return state.set(`authStatus`, ANONYMOUS)
    case SIGNED_IN:
      return state
        .set(`authStatus`, SIGNED_IN)
        .set(`currentUser`, action.payload)
    case SIGNED_OUT:
      return state.set(`authStatus`, ANONYMOUS).set(`currentUser`, null)
    default:
      return state
  }
}
