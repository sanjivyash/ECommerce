import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage.component.js';
import Products from './Products.component.js';
import About from './about.component.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DetailsComponent from "./Details.component.js";

function NotFound(props) {
    return (
        <h1>Page Not Found</h1>
    );
}

function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/products" />
            <Route exact path="/main" component={LandingPage} />
            <Route exact path="/products" component={Products} />
            <Route path="/details/:productId" component={DetailsComponent} />
            <Route exact path="/about" component={About} />
            <Route path="/" component={NotFound} />
        </Switch>
    );
}

export default Contents;