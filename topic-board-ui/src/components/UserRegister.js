import React, { Component } from 'react';
import {
    Form, Button, Alert, Container
} from 'react-bootstrap';
import requests from '../requests/user';
import createAlert from './createAlert';

export class UserRegister extends Component {
    state = {
        email: null,
        password: null,
        name: null,
        registrationAlert: null
    }
    changeField = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    registerUser = (e) => {
        e.preventDefault();
        e.target.reset();
        requests.registerUserRequest(this.state.email, this.state.password, this.state.name, (err, response) => {
            if (err)
                this.setState({ registrationAlert: createAlert('danger', err) });
            else {
                this.setState({ registrationAlert: createAlert('success', 'You have successfully registered.') });
                this.setState({ email: null, password: null, name: null });
            }
        });
    }
    render() {
        return ( 
            <Container>
                { this.state.registrationAlert }
                <Form onSubmit={this.registerUser} className="user">
                    <Form.Group>
                        <Form.Control type="text" required className="form-control-user" 
                            placeholder="Enter Name..." name="name"
                            onChange={this.changeField} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" required className="form-control-user" 
                            placeholder="Enter Email Address..." name="email"
                            onChange={this.changeField} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" required className="form-control-user" 
                            placeholder="Enter Password..." name="password"
                            onChange={this.changeField} />
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" variant="primary" className="btn-user btn-block">Register</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default UserRegister;
