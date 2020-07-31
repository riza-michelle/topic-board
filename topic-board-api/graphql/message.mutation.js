const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');
const MessageType = require('./message.type');
const messageControllerCls = require('../controllers/message');
const userCredential = require('../controllers/usercredential');

const messageController = new messageControllerCls();

const messageCreateMutation = {
	type: MessageType,
	args: {
        token: { type: GraphQLNonNull(GraphQLString) },
        topic_id: { type: GraphQLNonNull(GraphQLID) },
        message: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
    	return new Promise((resolve, reject) => {
    		userCredential.verify(args.token, (err, userDetails) => {
				if (!err)
					messageController.create(args.topic_id, args.message, userDetails.user_id, (err, doc) => {
						(err) ? reject(err) : resolve(doc);
					});
				else
					reject(err);
			});
    	});
    }
};

module.exports = { messageCreateMutation };
