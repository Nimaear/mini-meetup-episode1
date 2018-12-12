//@flow
import { takeLatest, put, call } from 'redux-saga/effects';
import { CountryActions, CountryActionTypes } from 'actions';
import axios from 'axios';

const countries = `
{
  countries {
    code
    name
  }
}
`;

function* startRequest(): Generator<*, *, *> {
  try {
    const data = yield call(axios.post, 'https://countries.trevorblades.com/', { query: countries });
    yield put(CountryActions.requestDone(data.data));
  } catch (e) {
    yield put(CountryActions.failRequest());
  }
}

export default [takeLatest(CountryActionTypes.API_REQUEST_START, startRequest)];
