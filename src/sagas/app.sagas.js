//@flow
import { takeLatest, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { AppActions, AppActionTypes } from 'actions';
import axios from 'axios';

const countries = `
{
  countries {
    code
    name
  }
}
`;

function* click(): Generator<*, *, *> {
  yield delay(500);
  const data = yield call(axios.post, 'https://countries.trevorblades.com/', { query: countries });
  yield put(AppActions.response(data.data));
}

export default [takeLatest(AppActionTypes.CLICK, click)];
