import { ATTEMPTING_LOGIN, SIGNED_IN, SIGNED_OUT } from '../constants';

export function attemptingLogin() {
  return {
    type: ATTEMPTING_LOGIN
  };
}

export function signedIn(payload) {
  return {
    type: SIGNED_IN,
    payload
  };
}

export function signedOut() {
  return {
    type: SIGNED_OUT
  };
}
