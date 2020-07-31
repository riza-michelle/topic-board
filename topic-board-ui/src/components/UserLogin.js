import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    Form, Button, Alert, Container
} from 'react-bootstrap';
import requests from '../requests/user';
import credentials from '../credentials';
import createAlert from './createAlert';

export class UserLogin extends Component {
    state = {
        email: null,
        password: null,
        loginAlert: null
    }
    changeField = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    loginUser = (e) => {
        if (e.target){
            e.preventDefault();
            e.target.reset();
            requests.loginUserRequest(this.state.email, this.state.password, (err, response) => {
                if (err)
                    this.setState({ loginAlert: createAlert('danger', err) });
                else {
                    this.setState({ loginAlert: createAlert('success', 'You have successfully logged in.') });
                    this.setState({ email: null, password: null });
                    credentials.save(response.data.token);
                    this.props.goToNext({credential: response.data.token});
                }
            });
        }
    }
    render() {
        return (
            <Container>
                { this.state.loginAlert }
                <Form className="user" onSubmit={this.loginUser}>
                    <Form.Group>
                        <Form.Control type="text" required 
                            className="form-control-user" name="email"
                            placeholder="Enter Email Address..."
                            onChange={this.changeField} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" required 
                            className="form-control-user" name="password"
                            placeholder="Password"
                            onChange={this.changeField} />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" variant="primary" className="btn-user btn-block">Login</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

UserLogin.propTypes = {
  goToNext: PropTypes.func.isRequired
};

export default UserLogin;
