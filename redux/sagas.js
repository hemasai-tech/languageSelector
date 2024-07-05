import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getApiCallSuccess, getApiCallFailure } from './actions';
import { GET_API_CALL_REQUEST } from './actionTypes';

function* fetchApiData() {
  try {
    const response = yield call(axios.get, 'https://www.colourlovers.com/api/colors/new?format=json');
    yield put(getApiCallSuccess(response.data));
  } catch (error) {
    yield put(getApiCallFailure(error.message));
  }
}

function* watchGetApiCall() {
  yield takeLatest(GET_API_CALL_REQUEST, fetchApiData);
}

export default watchGetApiCall;
