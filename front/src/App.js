import React from 'react';

import {
  BrowserRouter, Switch, Route
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/search" component={Search} />
          <Route path="/" exact component={Home} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
