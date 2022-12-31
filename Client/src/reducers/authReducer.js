import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  user: null
};

const reducers = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};

export default reducers;
