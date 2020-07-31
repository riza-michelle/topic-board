import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    Form, Button, Card, Row, Col, Container
} from 'react-bootstrap';
import requests from '../requests/topic';
import credentials from '../credentials';
import createAlert from './createAlert';

export class TopicAdd extends Component {
    state = {
        subject: null,
        description: null,
        alert: null
    }
    topicAdd = (e) => {
        e.preventDefault();
        e.target.reset();
        requests.addTopicRequest(credentials.get(), this.state.subject, this.state.description, 
            (err, response) => {
                if (err)
                    this.setState({ alert: createAlert('danger', err) });
                else {
                    this.setState({ alert: createAlert('success', 'You have successfully created topic.') });
                    this.setState({ subject: null, description: null });
                    this.props.getTopics();
                }
            }
        );
    }
    changeField = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <Row className="justify-content-center mt-sm-4" onSubmit={this.topicAdd}>
                <Col xl="12" lg="12" md="12">
                    { this.state.alert }
                    <Card>
                        <Card.Header className="text-gray-900 justify-content-between">Add New Topic
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.addTopic}>
                                <Form.Group>
                                    <Form.Label>Subject: </Form.Label>
                                    <Form.Control type="text" required name="subject"
                                        onChange={this.changeField} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control name="description" as="textarea"
                                        onChange={this.changeField} />
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

TopicAdd.propTypes = {
    getTopics: PropTypes.func.isRequired
};

export default TopicAdd;
