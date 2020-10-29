import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  user: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.loading = false;
        draft.token = null;
        draft.user = null;
        break;
      }
      case '@auth/CHANGE_VALUE': {
        draft.user.goal = action.payload.value;
        break;
      }
      default:
    }
  });
}
