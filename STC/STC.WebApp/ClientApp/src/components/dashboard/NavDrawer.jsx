import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

class NavDrawer extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);
      this.state = {
          routes: [
              {
                  path: '/eligibility-check',
                  title: 'Eligibility Check'
              },
              {
                  path: '/initial-medical',
                  title: 'Initial Medical'
              },
              {
                  path: '/final-medical',
                  title: 'Final Medical'
              }
          ]
      };
    }

    render() {
        return (
            <div className={"nav-drawer shadow d-flex flex-column"}>
                <h1 className={"text-center text-light h2 mb-4 border-bottom pb-3"}>STC Recruitment Portal</h1>
                <Nav tag={"div"} pills vertical className={"flex-grow-1"}>
                    {
                        this.state.routes.map(route => (
                            <NavItem tag={"div"} key={route.path}>
                                <NavLink tag={Link} to={route.path} active={this.props.location.pathname === route.path}>{route.title}</NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>
                <Nav tag={"div"} pills vertical>
                    <NavItem tag={"div"}>
                        <NavLink tag={Link} to={"/login"}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default NavDrawer;
