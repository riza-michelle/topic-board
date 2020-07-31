import axios from 'axios';

const retrieveTopicsRequest = (token, limit, page, skip, callback) => {
	axios({
		method: 'get',
		url: process.env.REACT_APP_SERVER_URL + '/topics' + `?limit=${limit}&page=${page}&skip=${skip}`,
		headers: {
			token
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

const retrieveTopicRequest = (token, id, callback) => {
	axios({
		method: 'get',
		url: process.env.REACT_APP_SERVER_URL + '/topic/' + id,
		headers: {
			token
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

const addTopicRequest = (token, subject, description, callback) => {
	axios({
		method: 'post',
		url: process.env.REACT_APP_SERVER_URL + '/topic',
		headers: {
			token
		},
		data: {
			subject,
			description
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

const updateTopicRequest = (token, id, subject, description, callback) => {
	axios({
		method: 'patch',
		url: process.env.REACT_APP_SERVER_URL + '/topic/' + id,
		headers: {
			token
		},
		data: {
			subject,
			description
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

const deleteTopicRequest = (token, id, callback) => {
	axios({
		method: 'delete',
		url: process.env.REACT_APP_SERVER_URL + '/topic/' + id,
		headers: {
			token
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

export default { retrieveTopicsRequest, addTopicRequest, retrieveTopicRequest, updateTopicRequest, deleteTopicRequest };
