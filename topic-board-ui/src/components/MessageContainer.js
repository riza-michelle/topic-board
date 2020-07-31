import React, { Component } from 'react';
import {
    Navbar, Nav, Container, Row, Col, Card, Button, Table
} from 'react-bootstrap';
import requests from '../requests/message';
import requestsTopic from '../requests/topic';
import credentials from '../credentials';
import MessageAdd from './MessageAdd';
import PropTypes from "prop-types";

export class MessageContainer extends Component {
	state = {
		mainForm: null,
		messages: [],
		topic: {}
	}
	limit = 5
	topic = {}
	componentDidMount(){
		this.setAddMainForm();
		this.getMessages(true);
		this.getTopic();
	}
	setAddMainForm = (e) => {
		this.setState({mainForm: <MessageAdd topic_id={this.props.topic_id} getMessages={this.getMessages.bind(this)} />});
	}
	getMessages(add = false) {
		let limit = this.limit;
		let skip = 0;
		let pageNumber = 1;
		if (add === false && this.state.messages.length > this.limit)
			limit = this.state.messages.length;
		if (add === true){
			skip = this.state.messages.length;
		}
		requests.retrieveMessagesRequest(credentials.get(), this.props.topic_id, limit, pageNumber, skip,
			(err, response) => {
				if (add === false)
					this.setState({ messages: response.data });
				else
					if (response.data.length !== 0){
						this.setState({ messages: this.state.messages.concat(response.data) });
					}
			});
	}
	getTopic(){
		requestsTopic.retrieveTopicRequest(credentials.get(), this.props.topic_id, 
			(err, response) => {
				const topic = {
					subject: response.data.subject,
					description: response.data.description
				};
				this.setState({ topic: topic });
	     	}
	    );
	}
	getMessagesTable() {
		return this.state.messages.length > 0 ? this.state.messages.map(message => {
			return (
				<tr key={message.id}>
					<td>{message.message}</td>
					<td>{message.created_at}</td>
				</tr>
			);
	    }) : (<tr><td colSpan="3" className="text-center">No message in database.</td></tr>);
	}
	render() {
		return (
			<Container fluid="true">
				<Navbar expand="lg" bg="dark" className="navbar-dark justify-content-between">
					<Navbar.Brand>Messages</Navbar.Brand>
					<Nav>
						<Nav.Link onClick={(e) => { e.preventDefault(); this.props.logoutUser(); }}>Logout</Nav.Link>
					</Nav>
				</Navbar>
				<Container className="mt-sm-4">
					<a href="" onClick={(e) => { e.preventDefault(); this.props.changeContainer(); }} >
						&#8592; Back to Topics</a>
					<Row className="justify-content-center mt-sm-4">
						<Col xl="6" lg="6" md="6">
							<Card>
			              		<Card.Header className="text-gray-900 justify-content-between">Topic
			              		</Card.Header>
			              		<Card.Body>
			              			<h4>{this.state.topic.subject}</h4>
			              			<p>{this.state.topic.description}</p>
			              		</Card.Body>
			              	</Card>
			            </Col>
						{ this.state.mainForm }
			        </Row>
					<Row className="justify-content-center mt-sm-4 mb-5">
						<Col xl="12" lg="12" md="12">
							<Card>
	                      		<Card.Header className="text-gray-900">Messages</Card.Header>
	                      		<Card.Body>
	                      			<Table striped bordered hover>
	                      				<thead>
	                      					<tr>
	                      						<th width="60%">Message</th>
	                      						<th width="40%">Created at</th>
	                      					</tr>
	                      				</thead>
	                      				<tbody>
	                      					{ this.getMessagesTable() }
	                      				</tbody>
	                      			</Table>
	                      			<Row className="justify-content-center">
	                      			<Button className="rounded-circle border-0" 
	                      				onClick={(e) => this.getMessages(true)}
	                      				id="paginator"></Button> 
	                      			</Row>
	                      		</Card.Body>
	                      	</Card>
						</Col>
					</Row>
				</Container>
			</Container>
		);
	}
}

MessageContainer.propTypes = {
	topic_id: PropTypes.string.isRequired,
	changeContainer: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default MessageContainer;
