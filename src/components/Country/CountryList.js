//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { CountryActions } from 'actions';

import css from './Country.css';

type PropsType = {
  countries: Array<{ code: string, name: string }>,
};

const CountryList = ({ countries }: PropsType) => {
  return (
    <div className={css.list}>
      <h1>Countries</h1>
      {countries.map(({ code, name }) => (
        <div className={css.listElement} key={code}>
          {name}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.country.list,
});

const mapDispatchToProps = {
  startFetch: CountryActions.startRequest,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      this.props.startFetch();
    },
  })
)(CountryList);
