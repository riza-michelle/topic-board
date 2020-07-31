import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    Form, Button, Alert, Card, Row, Col, Container
} from 'react-bootstrap';
import requests from '../requests/topic';
import credentials from '../credentials';
import createAlert from './createAlert';

export class TopicUpdate extends Component {
	state = {
		subject: '',
		description: '',
		alert: null
	}
	changeField = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
	topicUpdate = (e) => {
		e.preventDefault();
		requests.updateTopicRequest(credentials.get(), this.props.topic_id, this.state.subject, this.state.description,
			(err, response) => {
				if (err)
	                this.setState({ alert: createAlert('danger', err) });
	            else {
	                this.setState({ alert: createAlert('success', 'You have successfully updated topic.') });
	                this.props.getTopics();
	            }
	     	}
	    )
	}
    getTopic() {
		requests.retrieveTopicRequest(credentials.get(), this.props.topic_id, 
			(err, response) => {
				if (err)
	                this.setState({ alert: createAlert('danger', err) });
	            else {
	                this.setState({ subject: response.data.subject, description: response.data.description });
	            }
	     	}
	    );
	}
    componentDidMount() {
    	this.getTopic();
    }
	render() {
		return (
			<Row className="justify-content-center mt-sm-4" onSubmit={this.topicUpdate}>
				<Col xl="12" lg="12" md="12">
					{ this.state.alert }
					<Card>
	              		<Card.Header className="text-gray-900 justify-content-between">Update Topic
	              		</Card.Header>
	              		<Card.Body>
	              			<Form onSubmit={this.addTopic}>
				                <Form.Group>
				                	<Form.Label>Subject: </Form.Label>
				                    <Form.Control type="text" required name="subject"
				                        onChange={this.changeField} value={this.state.subject}/>
				                </Form.Group>
				                <Form.Group>
				                	<Form.Label>Description: </Form.Label>
				                    <Form.Control name="description" as="textarea"
				                        onChange={this.changeField} value={this.state.description || ''}/>
				                </Form.Group>
				                <Form.Group>
				                    <Button sm="2" type="submit" variant="primary">Submit</Button>
				                </Form.Group>
				            </Form>
	              		</Card.Body>
	              	</Card>
				</Col>
			</Row>
		);
	}
}

TopicUpdate.propTypes = {
	topic_id: PropTypes.string.isRequired, 
	getTopics: PropTypes.func.isRequired
};

export default TopicUpdate;
