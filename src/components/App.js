//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as appActions from 'actions/app.actions';

import css from './App.css';

type PropsType = {
  clicked: boolean,
  title: string,
  click: () => void,
  change: () => void,
};

const App = ({ title, click, change, clicked }: PropsType) => {
  return (
    <div className={css.root}>
      {title} {clicked ? 'yes' : 'no'}
      <button onClick={click}>Click me!</button><br />
      <button onClick={() => change(true)}>Unchange me!</button><br />
      <button onClick={() => change(false)}>change me!</button><br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  clicked: state.app.clicked,
  title: state.app.title,
});

const mapDispatchToProps = {
  click: appActions.click,
  change: appActions.change,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
