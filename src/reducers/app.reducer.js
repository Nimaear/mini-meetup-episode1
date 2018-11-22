// @flow
import AppActions from 'actions/app.actions';
import createReducer from 'store/createReducer';

const initialState = {
  title: 'afsdlkjasdflas',
  clicked: false,
  countries: [],
};

export default createReducer(initialState, {
  [AppActions.CLICK]: (draft) => {
    draft.clicked = true;
    draft.title = 'Oi';
  },
  [AppActions.CHANGE]: (draft, { to }) => {
    draft.clicked = to;
  },
  [AppActions.API_RESPONSE]: (draft, { data }) => {
    draft.countries = data.data.countries;
  },
});
