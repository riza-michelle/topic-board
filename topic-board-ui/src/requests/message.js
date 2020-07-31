import axios from 'axios';

const retrieveMessagesRequest = (token, topic_id, limit, page, skip, callback) => {
	axios({
		method: 'get',
		url: process.env.REACT_APP_SERVER_URL + `/topic/${topic_id}/messages` + `?limit=${limit}&page=${page}&skip=${skip}`,
		headers: {
			token
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

const addMessageRequest = (token, topic_id, message, callback) => {
	axios({
		method: 'post',
		url: process.env.REACT_APP_SERVER_URL + `/topic/${topic_id}/message`,
		headers: {
			token
		},
		data: {
			topic_id,
			message
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

export default { retrieveMessagesRequest, addMessageRequest };
