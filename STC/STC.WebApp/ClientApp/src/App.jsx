import './custom.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/authentication/Login";
import PropTypes from 'prop-types';
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
    static propTypes = {}

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" render={(props) => (
                        <Login
                            {...props}
                        />
                    )}
                    />
                    <Route
                        path="/"
                        render={(props) => (
                            <Dashboard
                                {...props}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
