//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as appActions from 'actions/app.actions';

import css from './App.css';

type PropsType = {
  clicked: boolean,
  title: string,
  countries: Array<{ code: string, name: string }>,
  click: () => void,
  change: () => void,
};

const App = ({ countries, title, click, change, clicked }: PropsType) => {
  return (
    <div className={css.root}>
      Countries
      {countries.map(({ code, name }) => (
        <div key={code}>{name}</div>
      ))}
      {title} {clicked ? 'yes' : 'no'}
      <button onClick={click}>Click me!</button>
      <br />
      <button onClick={() => change(true)}>Unchange me!</button>
      <br />
      <button onClick={() => change(false)}>change me!</button>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.app.countries,
  clicked: state.app.clicked,
  title: state.app.title,
});

const mapDispatchToProps = {
  click: appActions.click,
  change: appActions.change,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
