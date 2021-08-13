import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row, Spinner} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import API from "../../util/api";
import {Redirect} from "react-router-dom";

class Login extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          username: "",
          password: "",
          redirect: false
      };
    }

    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true
        }, () => {
            API.Login(this.state.username, this.state.password)
                .then((response) => {
                    this.setState({
                        isLoading: false,
                        redirect: true
                    });
                });
        })
    }

    render() {
        if(this.state.redirect) {
            return (
                <Redirect to={"/eligibility-check"} />
            );
        }
        return (
            <div className={"login-container d-flex flex-column"}>
                <Container className={"pt-4"}>
                    <Row>
                        <Col className={"text-center text-light"}>
                            <h1>STC Recruitment Portal</h1>
                        </Col>
                    </Row>
                </Container>
                <div className={"flex-grow-1 d-flex flex-column justify-content-center align-items-center"}>
                    <Container fluid>
                        <Row>
                            <Col className={"text-center pt-3 pb-3 bg-light border"} lg={{ size: 4, offset: 4 }}>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input
                                            type="text"
                                            name="username"
                                            id={"username"}
                                            className={"text-center"}
                                            placeholder="Enter Username"
                                            value={this.state.username}
                                            onChange={this.onChangeInput}
                                            required={true}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={"text-center"}
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            onChange={this.onChangeInput}
                                            required={true}
                                        />
                                    </FormGroup>
                                    {
                                        this.state.isLoading ?
                                            (
                                                <Spinner className={"ml-2"} size="sm" color="primary" />
                                            ):
                                            (
                                                <Button color={"primary"}>
                                                    <FontAwesomeIcon className={"mr-2"} icon={faSignInAlt} />
                                                    Login
                                                </Button>
                                            )
                                    }
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Login;
