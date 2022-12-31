import axios from 'axios';
import { SIGN_IN, SIGN_OUT, GET_CART } from './types';

export const signIn = user => {
  return {
    type: SIGN_IN,
    payload: user
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const getCart = () => async (dispatch, getState) => {
  const user = await getState().auth.user;
  if (!user) {
    dispatch({
      type: GET_CART,
      payload: []
    });
    return;
  }

  const res = await (await axios.get('/getCart', { params: { userId: user.id, userName: user.name } })).data.cart;

  dispatch({
    type: GET_CART,
    payload: res
  });
};
