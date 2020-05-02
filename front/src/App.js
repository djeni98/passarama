import React from 'react';

import {
  BrowserRouter, Switch, Route
} from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
