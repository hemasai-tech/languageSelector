import { GET_API_CALL_REQUEST, GET_API_CALL_SUCCESS, GET_API_CALL_FAILURE } from './actionTypes';

export const getApiCallRequest = () => ({
  type: GET_API_CALL_REQUEST,
});

export const getApiCallSuccess = (data) => ({
  type: GET_API_CALL_SUCCESS,
  payload: data,
});

export const getApiCallFailure = (error) => ({
  type: GET_API_CALL_FAILURE,
  payload: error,
});
