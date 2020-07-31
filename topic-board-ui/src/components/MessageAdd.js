import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    Form, Button, Alert, Card, Row, Col, Container
} from 'react-bootstrap';
import requests from '../requests/message';
import credentials from '../credentials';
import createAlert from './createAlert';

export class MessageAdd extends Component {
	state = {
		message: null,
		alert: null
	}
	messageAdd = (e) => {
		e.preventDefault();
		e.target.reset();
		requests.addMessageRequest(credentials.get(), this.props.topic_id, this.state.message,
			(err, response) => {
				if (err)
	                this.setState({ alert: createAlert('danger', err) });
	            else {
	                this.setState({ alert: createAlert('success', 'You have successfully created message.') });
	                this.setState({ message: null });
	                this.props.getMessages();
	            }
	     	}
	    );
	}
	changeField = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
	render() {
		return (
			<Col xl="6" lg="6" md="6">
				{ this.state.alert }
				<Card>
              		<Card.Header className="text-gray-900 justify-content-between">Add New Message
              		</Card.Header>
              		<Card.Body>
              			<Form onSubmit={this.messageAdd}>
			                <Form.Group>
			                	<Form.Label>Message: </Form.Label>
			                    <Form.Control name="message" as="textarea" required
			                        onChange={this.changeField} />
			                </Form.Group>
			                <Form.Group>
			                    <Button sm="2" type="submit" variant="primary">Submit</Button>
			                </Form.Group>
			            </Form>
              		</Card.Body>
              	</Card>
			</Col>
		);
	}
}

MessageAdd.propTypes = {
	topic_id: PropTypes.string.isRequired,
	getMessages: PropTypes.func.isRequired
};

export default MessageAdd;
