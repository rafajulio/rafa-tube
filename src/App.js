import React from 'react';
import 'rodal/lib/rodal.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {theme} from './util/material-ui-helper';
import Search from './pages/Search';

export const RafaTube = () => {
  return (
    <Router>
      <div style={{height: '100%', width: '100%'}}>
        <ThemeProvider theme={theme}>
          <AppBar position="sticky" style={{background: 'rgb(40,40,40)'}}>
            <Toolbar variant="dense">RafaTube (fazer LOGO)</Toolbar>
          </AppBar>
        </ThemeProvider>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
