import axios from 'axios';

const registerUserRequest = (email, password, name, callback) => {
	axios({
		method: 'post',
		url: process.env.REACT_APP_SERVER_URL + '/user/register',
		data: {
			email,
		 	password,
			name
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

const loginUserRequest = (email, password, callback) => {
	axios.post(process.env.REACT_APP_SERVER_URL + '/user/login',
		{
			email,
		 	password
		}).then((response) => {
			return callback(null, response);
		}).catch((err) => callback(err.response.data.message));
};

const logoutUserRequest = (token, callback) => {
	axios({
		method: 'post',
		url: process.env.REACT_APP_SERVER_URL + '/user/logout',
		headers: {
			token
		}
	}).then((response) => {
		callback(null, response);
	}).catch((err) => callback(err.response.data.message));
};

export default { registerUserRequest, loginUserRequest, logoutUserRequest };
