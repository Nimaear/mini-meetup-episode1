import { combineReducers } from 'redux';
import app from './app.reducer';
import country from './country.reducer';

const rootReducer = combineReducers({
  app,
  country,
});

export default rootReducer;
