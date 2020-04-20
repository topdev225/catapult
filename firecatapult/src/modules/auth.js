import { createAction, handleActions } from 'redux-actions'
import { createSelector } from 'reselect';
import { LOGIN, LOAD_USER, UPDATE_USER, UPLOAD_LOGO, CHANGE_PASSWORD } from './actions';
import { request } from '../helpers/http';
import { fulfilled } from '../helpers';

// ==================================
// Selectors
// ==================================
export const userSelector = createSelector(
  state => state.auth,
  auth => auth.user
);

export const userSessionSelector = createSelector(
  state => state.auth,
  auth => ({
    uid: auth.uid,
    jwt: auth.jwt
  })
);

// ==================================
// Action Handlers
// ==================================
export const signIn = createAction(LOGIN, (credential) => {
  return request({
    url: '/api-token-auth/',
    method: 'post',
    body: credential
  })
})

export const loadUser = createAction(LOAD_USER, () => (_, getState) => {
  const uid = getState().auth.uid;

  return request({
    url: `/api/v1/users/${uid}/`,
  });
});

export const updateUser = createAction(UPDATE_USER, user => (_, getState) => {
  const uid = getState().auth.uid;

  return request({
    url: `/api/v1/users/${uid}/`,
    method: 'put',
    body: user
  })
});

export const changePassword = createAction(CHANGE_PASSWORD, (oldPassword, newPassword) => (_, getState) => {
  const uid = getState().auth.uid;

  return request({
    url: `/api/v1/users/${uid}/change-password/`,
    method: 'post',
    body: {
      old_password: oldPassword,
      new_password: newPassword
    }
  })
});

export const uploadAsset = createAction(UPLOAD_LOGO, (key, file) => (_, getState) => {
  const uid = getState().auth.uid;
  const formData = new FormData();
  formData.append(key, file);
  return request({
    url: `/api/v1/users/${uid}/`,
    method: 'patch',
    formData
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(signIn)]: (state, action) => {
    const { token, id } = action.payload.data

    localStorage.setItem('jwt', token)
    localStorage.setItem('uid', id)
    return {
      ...state,
      jwt: token,
      uid: id
    }
  },
  [fulfilled(loadUser)]: (state, action) => ({
    ...state,
    user: action.payload.data
  }),
  [fulfilled(updateUser)]: (state, action) => ({
    ...state,
    user: action.payload.data
  }),
  [fulfilled(uploadAsset)]: (state, action) => ({
    ...state,
    user: action.payload.data
  })
}

// ==================================
// Reducer
// ==================================
const initialState = {
  jwt: '',
  id: '',
  user: {}
};

export default handleActions(ACTION_HANDLERS, initialState);
