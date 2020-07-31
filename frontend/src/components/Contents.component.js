import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage.component.js';
import Products from './Details.component.js';
import About from './about.component.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/main" />
            <Route path="/main" component={LandingPage} />
            <Route path="/products" component={Products} />
            <Route path="/about" component={About} />
        </Switch>
    );
}

export default Contents;