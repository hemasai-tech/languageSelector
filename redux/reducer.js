// src/redux/reducer.js
import { GET_API_CALL_REQUEST, GET_API_CALL_SUCCESS, GET_API_CALL_FAILURE } from './actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_CALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_API_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: '',
      };
    case GET_API_CALL_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default apiReducer;
