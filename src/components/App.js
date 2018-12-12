//@flow
import * as React from 'react';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import CountryList from 'components/Country/CountryList';

const NotFound = () => <div>404: Route not found</div>;
const Home = () => (
  <div>
    Home
    <Link to="/country">Countries please</Link>
  </div>
);

const App = () => {
  return (
    <Switch>
      Home
      <Route exact path="/" component={Home} />
      <Route exact path="/country" component={CountryList} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default compose(withRouter)(App);
