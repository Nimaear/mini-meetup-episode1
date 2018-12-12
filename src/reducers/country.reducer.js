// @flow
import CountryActions from 'actions/country.actions';
import createReducer from 'store/createReducer';

const initialState = {
  list: [],
  loading: false,
};

export default createReducer(initialState, {
  [CountryActions.API_REQUEST_FAIL]: (draft) => {
    draft.loading = false;
  },
  [CountryActions.API_REQUEST_START]: (draft) => {
    draft.loading = true;
  },
  [CountryActions.API_REQUEST_DONE]: (draft, { data }) => {
    draft.loading = false;
    // console.log(data);
    draft.list = data.data.countries;
  },
});
