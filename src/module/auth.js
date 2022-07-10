import { createAction, handleActions } from 'redux-actions';
import produce from '../../node_modules/immer/';
import createReuqestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('auth/SIGNUP');
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] = createRequestActionTypes('auth/SIGNIN');
const AUTH_INIT = 'auth/AUTH_INIT';

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}));
export const signUp = createAction(SIGNUP, ({ id, pwd, pwdConfirm, nm }) => ({
  id,
  pwd,
  pwdConfirm,
  nm,
}));
export const signIn = createAction(SIGNIN, ({ id, pwd }) => ({
  id,
  pwd,
}));
export const authInit = createAction(AUTH_INIT);

const signupSaga = createReuqestSaga(SIGNUP, authAPI.signup);
const signinSaga = createReuqestSaga(SIGNIN, authAPI.signin);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(SIGNIN, signinSaga);
}

const initialState = {
  signUp: {
    id: '',
    pwd: '',
    pwdConfirm: '',
    nm: '',
  },
  signIn: {
    id: '',
    pwd: '',
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
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [AUTH_INIT]: (state) => ({
      ...state,
      auth: null,
      authError: null,
    }),
  },
  initialState,
);

export default auth;
