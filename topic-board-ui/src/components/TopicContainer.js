import React, { Component } from 'react';
import {
    Navbar, Nav, Container, Row, Col, Card, Button, Table
} from 'react-bootstrap';
import requests from '../requests/topic';
import credentials from '../credentials';
import TopicAdd from './TopicAdd';
import TopicUpdate from './TopicUpdate';
import MessageContainer from './MessageContainer';
import PropTypes from "prop-types";

export class TopicContainer extends Component {
    state = {
        mainForm: null,
        topics: [],
        currentPage: 0
    }
    limit = 5
    componentDidMount(){
        this.setAddMainForm();
        this.getTopics(true);
    }
    setAddMainForm = (e) => {
        this.setState({mainForm: <TopicAdd getTopics={this.getTopics.bind(this)} />});
    }
    setUpdateMainForm = (topic_id) => {
        this.setState({mainForm: <TopicUpdate key={topic_id} getTopics={this.getTopics.bind(this)} topic_id={topic_id} />});
        window.scrollTo(0,0);
    }
    showDeleteForm = (topic_id) => {
        const res = window.confirm("Are you sure you want to delete topic?");
        if (res)
            this.topicDelete(topic_id);
    }
    changeToMessages = (topic_id) => {
        this.props.changeContainer(<MessageContainer key={topic_id} topic_id={topic_id} 
            logoutUser={this.props.logoutUser}
            changeContainer={this.props.changeContainer}/>);
    }
    topicDelete(topic_id) {
        requests.deleteTopicRequest(credentials.get(), topic_id, 
            (err, response) => {
                if (err)
                    alert(err);
                else {
                    alert('Successfully deleted topic!');
                    this.getTopics();
                }
            }
        );
    }

    getTopics(add = false) {
        let limit = this.limit;
        let skip = 0;
        let pageNumber = 1;
        if (add === false && this.state.topics.length > this.limit)
            limit = this.state.topics.length;
        if (add === true){
            skip = this.state.topics.length;
        }
        requests.retrieveTopicsRequest(credentials.get(), limit, pageNumber, skip,
            (err, response) => {
                if (add === false)
                    this.setState({ topics: response.data });
                else
                    if (response.data.length !== 0)
                        this.setState({ topics: this.state.topics.concat(response.data) });
            });
    }
    getTopicsTable() {
        return this.state.topics.length > 0 ? this.state.topics.map(topic => {
            return (
                <tr key={topic.id}>
                    <td>{topic.subject}</td>
                    <td>{topic.description}</td>
                    <td>{topic.created_at}</td>
                    <td><a href="" className="text-s"
                            onClick={(e) => {
                                e.preventDefault();
                                this.changeToMessages(topic.id)}}>View Messages</a><br/>
                        <a href="" className="text-s mr-1" 
                            onClick={(e) => {
                                e.preventDefault();
                                this.setUpdateMainForm(topic.id)}}>Update</a>|
                        <a href="" className="ml-1 text-s" 
                            onClick={(e) => {
                                e.preventDefault();
                                this.showDeleteForm(topic.id)}}>Delete</a>
                    </td>
                </tr>
            );
        }) : (<tr><td colSpan="4" className="text-center">No topic in database.</td></tr>);
    }

    render() {
        return (
            <Container fluid="true">
                <Navbar expand="lg" bg="dark" className="navbar-dark justify-content-between">
                    <Navbar.Brand>Topics</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={(e) => { e.preventDefault(); this.props.logoutUser(); }}>Logout</Nav.Link>
                    </Nav>
                </Navbar>
                <Container className="mt-sm-4">
                    { this.state.mainForm }
                    <Row className="justify-content-center mt-sm-4 mb-5">
                        <Col xl="12" lg="12" md="12">
                            <Card>
                                <Card.Header className="text-gray-900">Topics</Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th width="25%">Subject</th>
                                                <th width="30%">Description</th>
                                                <th width="30%">Created at</th>
                                                <th width="15%">Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.getTopicsTable() }
                                        </tbody>
                                    </Table>
                                    <Row className="justify-content-center">
                                    <Button className="rounded-circle border-0" 
                                        onClick={(e) => this.getTopics(true)}
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

TopicContainer.propTypes = {
    changeContainer: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
};

export default TopicContainer;
