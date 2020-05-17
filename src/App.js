import React from 'react';
import 'rodal/lib/rodal.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from './pages/Search';

export const RafaTube = () => {
  return (
    <Router>
      <div style={{height: '100%', width: '100%'}}>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
