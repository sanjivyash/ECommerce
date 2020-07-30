import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage.component.js';
import Products from './components/Details.component.js';
import About from './components/about.component.js';

function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/main" />
      <Route path="/main" component={LandingPage} />
      <Route path="/products" component={Products} />
      <Route path="/about" component={About} />
    </Switch>
  );
}

export default App;
