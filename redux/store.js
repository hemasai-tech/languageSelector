// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import apiReducer from './reducer';
import watchGetApiCall from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleWare = applyMiddleware(sagaMiddleware);
const store = createStore(apiReducer, middleWare);

sagaMiddleware.run(watchGetApiCall);

export default store;
