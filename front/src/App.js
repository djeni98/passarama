import React from 'react';

import {
  BrowserRouter, Switch, Route
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/search" component={Search} />
          <Route path="/" exact component={Home} />
          <Route path="/" component={NotFound} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
