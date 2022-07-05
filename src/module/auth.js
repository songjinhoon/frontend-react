import { createAction, handleActions } from 'redux-actions';
import produce from '../../node_modules/immer/';
import createReuqestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form) => form,
);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const register = createAction(
  REGISTER,
  ({ username, password }) => ({
    username,
    password,
  }),
);
export const login = createAction(
  LOGIN,
  ({ username, password }) => ({
    username,
    password,
  }),
);

const signupSaga = createReuqestSaga(REGISTER, authAPI.signup);
const signinSaga = createReuqestSaga(LOGIN, authAPI.signin);
export function* authSaga() {
  yield takeLatest(REGISTER, signupSaga);
  yield takeLatest(LOGIN, signinSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
