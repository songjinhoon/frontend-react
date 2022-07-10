import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../module/loading';

export const createRequestActionTypes = (type) => {
  return [type, `${type}_SUCCESS`, `${type}_FAILURE`];
};

export default function requestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      if (type === 'auth/SIGNIN')
        try {
          localStorage.setItem('token', response.headers.authorization);
        } catch (e) {
          console.log(e);
        }
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
