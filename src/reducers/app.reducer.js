// @flow
import AppActions from 'actions/app.actions';
import createReducer from 'store/createReducer';

const initialState = {
  title: 'afsdlkjasdflas',
  clicked: false,
};

export default createReducer(initialState, {
  [AppActions.CLICK]: (draft) => {
    draft.clicked = true;
    draft.title = 'Oi';
  },
  [AppActions.CHANGE]: (draft, { to }) => {
    draft.clicked = to;
  },
});
