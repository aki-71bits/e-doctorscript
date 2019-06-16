import {
  SNACKBAR_OPEN,
  SNACKBAR_CLOSED,
} from './constants';

const initialState = {
  snackBarOpen: false,
  message: '',
  snackBarVariant:''
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return {
        ...state,
        snackBarOpen: true,
        message: action.payload.message,
        snackBarVariant: action.payload.variant,
      };
    case SNACKBAR_CLOSED:
      return {
        ...state,
        snackBarOpen: false,
        message: ''
      };
    default:
      return state;
  }
}
