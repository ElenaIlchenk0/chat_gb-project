export const SET_AUTH = '@@user/SET_AUTH';

export const setAuth = (authed, email) => ({
  type: SET_AUTH,
  authed,
  email,
});
