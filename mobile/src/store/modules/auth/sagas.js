import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, `authenticate`, { email, password });
    const { token, user } = response.data;
    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert('SignIn', err.response.data.error);
    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'register', { username: name, email, password });
    Alert.alert('Cadastro', 'Sucesso ao cadastrar.');
  } catch (err) {
    Alert.alert('Cadastro', 'Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
