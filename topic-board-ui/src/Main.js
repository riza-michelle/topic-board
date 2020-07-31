import React, { Component } from 'react';
import UserContainer from './components/UserContainer';
import TopicContainer from './components/TopicContainer';
import credentials from './credentials';
import userRequests from './requests/user';

export class MainContainer extends Component {
    state = {
        currentPage: null,
        credential: null
    }
    componentDidMount() {
        this.changeContainer();
    }
    changeContainer(container){
        if (!container){
            const credential = credentials.get();
            if (credential) {
                this.setState({ credential });
                this.goToTopics();
            }else
                this.goToLogin();
        }else
            this.setState({currentPage: container});
    }
    goToTopics = (state) => {
        if (state)
            this.setState(state);
        this.changeContainer(<TopicContainer logoutUser={this.logoutUser.bind(this)} changeContainer={this.changeContainer.bind(this)}/>);
    }
    goToLogin = () => {
        this.changeContainer(<UserContainer goToNext={this.goToTopics} />);
    }
    logoutUser() {
        userRequests.logoutUserRequest(this.state.credential, (err, response) => {
                if (err)
                    alert(err);
                else {
                    this.setState({credential: null});
                    credentials.remove();
                    alert('You have successfully logged out.');
                    this.goToLogin();
                }
            });
    }
    render() {
        return (
            <div className="app-container">
            { this.state.currentPage }
            </div>
        );
    }
}

export default MainContainer;
