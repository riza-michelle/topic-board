import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    Nav, Container, Row, Col, Card
} from 'react-bootstrap';

import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

export class UserContainer extends Component {
    state = {
        currentTab: null
    }
    componentDidMount(){
        this.setState({ currentTab: <UserLogin goToNext={this.props.goToNext} /> });
    }
    changeContent = (e) => {
        if ( e.target.id == "registerNav" )
            this.setState({ currentTab: <UserRegister /> });
        else
            this.setState({ currentTab: <UserLogin goToNext={this.props.goToNext} /> });
    }
    render() {
        return (
          <div style={{ height: "inherit" }} className="bg-gradient-primary">
            <h1 className="h1 text-center text-white pt-3" style={{display:"block"}}>TOPIC BOARD</h1>
            <Row className="justify-content-center">
              <Col xl="7" lg="8" md="6">
                <Card className="o-hidden border-0 shadow-lg my-5">
                  <Card.Body className="p-0">
                    <Card>
                      <Card.Header className="pt-0 pl-0 pr-0" >
                        <Nav justify variant="tabs" defaultActiveKey="login">
                          <Nav.Item>
                            <Nav.Link id="loginNav" className="h6 text-gray-900 mb-0" 
                                eventKey="login" 
                                onClick={this.changeContent}>Login</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link id="registerNav" className="h6 text-gray-900 mb-0" 
                                eventKey="register" 
                                onClick={this.changeContent}>Register</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Card.Header>
                      <Card.Body>
                        <Container id="containerBody">
                          { this.state.currentTab }
                        </Container>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
}

UserContainer.propTypes = {
  goToNext: PropTypes.func.isRequired
};

export default UserContainer;
