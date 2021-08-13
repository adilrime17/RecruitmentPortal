import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {Nav, Navbar, NavbarText, NavItem, NavLink} from "reactstrap";
import NavDrawer from "./NavDrawer";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EligibilityCheck from "../eligibility-check/EligibilityCheck";

class Dashboard extends Component {
    static propTypes = {};

    render() {
        return (
            <div className={"dashboard-container"}>
                <NavDrawer
                    {...this.props}
                />
                <div className={"content-container"}>
                    <div className={"content border m-3"}>
                        <Route
                            path="/eligibility-check" m
                            render={(props) => (
                                <EligibilityCheck

                                />
                            )}
                        />
                        <Route
                            path="/initial-medical"
                            render={(props) => (
                                <p>Hello1</p>
                            )}
                        />
                        <Route
                            path="/"
                            render={(props) => (
                                <Redirect to={"/eligibility-check"} />
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
