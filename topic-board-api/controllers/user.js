const userModel = require('../models/user');
const encryptionUtil = require('../utils/encryption');
const APIError = require('../utils/apierror');

class userController {
	login(email, password, callback){
		userModel.findOne({ email }).exec((err, userDoc) => {
			if (err)
				return callback(new APIError(500, 'Server Error', err));
			if (userDoc == null)
				return callback(new APIError(401, 'Invalid Username or Password!', {}));
			encryptionUtil.comparePassword(password, userDoc.password, (err, isMatch) => {
				if (err){
					return callback(new APIError(500, 'Server Error', err))
				}
				if (isMatch == true)
					return callback(err, userDoc);
				callback(new APIError(401, 'Invalid Username or Password!', {}));
			});
		});
	}
	register(email, password, name, callback){
		encryptionUtil.encryptPassword(password, (err, encryptedPassword) => {
			userModel.create({
				email,
				name,
				password: encryptedPassword
			}, callback);
		});
	}
	retrieveByID(id, callback){
		userModel.findOne({ _id: id}).exec(callback);
	}
	updateCredential(id, token, callback){
		userModel.updateOne({ _id: id }, { $set: { credential: token }}, callback);
	}
	getCredential(id, callback){
		userModel.findOne({ _id: id }, 'credential', (err, doc) => {
			callback(err, (doc) ? doc.credential: null);
		});
	}
}

module.exports = userController;
