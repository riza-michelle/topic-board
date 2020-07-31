require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

const jwt = {
	sign(user, callback){
		jsonwebtoken.sign(user, process.env.JWT_SECRET_KEY, callback);
	},
	verify(token, callback){
		jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, callback);
	},
	decode(token, callback){
		jsonwebtoken.decode(token, process.env.JWT_SECRET_KEY, callback);
	}
};

module.exports = jwt;
