const bcrypt = require('bcrypt');

const encryptionUtil = {
	encryptPassword(password, callback){
		bcrypt.genSalt(10, (err, salt) => {
			if (err)
				return callback(err);
			bcrypt.hash(password, salt, (err, encryptedPassword) => {
				return callback(err, encryptedPassword);
			});
		});
	},
	comparePassword(password, encryptedPassword, callback){
		bcrypt.compare(password, encryptedPassword, (err, isMatch) => {
			if (err)
				return callback(err);
			callback(err, isMatch);
		});
	}
};

module.exports = encryptionUtil;
