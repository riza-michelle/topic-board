const userControllerCls = require('./user');
const jwt = require('../utils/jwt');
const APIError = require('../utils/apierror');

const userController = new userControllerCls();

const userCredential = {
    sign: (user_id, email, callback) => {
        jwt.sign({ user_id, email }, (err, token) => {
            if (err)
                return callback(new APIError(500, 'Server Error', err));
            userController.updateCredential(user_id, token, (err, result) => {
                callback(err, token);
            });
        });
    },
    verify: (token, callback) => {
        jwt.verify(token, (err, userDetails) => {
            if (err)
                return callback(new APIError(401, 'Unauthorized Token', err));
            userController.getCredential(userDetails.user_id, (err, credential) => {
                if (err)
                    callback(new APIError(500, 'Server Error', err));
                if (credential != token) 
                    callback(new APIError(401, 'Token is invalid/expired!', {}));
                else
                    callback(err, userDetails);
            });
        });
    },
    invalidate: (token, callback) => {
        jwt.verify(token, (err, userDetails) => {
            if (err)
                return callback(new APIError(500, 'Server Error', err));
            userController.updateCredential(userDetails.user_id, null, callback);
        });
    }
};

module.exports = userCredential;
