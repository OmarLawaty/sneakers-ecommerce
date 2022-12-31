// import _ from 'lodash';

import { GET_CART } from '../actions/types';

// import { CREATE_STREAM, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAMS } from '../actions/types';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: action.payload };

    // case FETCH_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };

    // case CREATE_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };

    // case EDIT_STREAM:
    //   return { ...state, [action.payload.id]: action.payload };

    // case DELETE_STREAM:
    //   return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default reducers;