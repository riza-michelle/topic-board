const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');
const TopicType = require('./topic.type');
const topicControllerCls = require('../controllers/topic');
const userCredential = require('../controllers/usercredential');

const topicController = new topicControllerCls();

const topicCreateMutation = {
	type: TopicType,
	args: {
        token: { type: GraphQLNonNull(GraphQLString) },
        subject: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString }
    },
    resolve: (parent, args) => {
    	return new Promise((resolve, reject) => {
    		userCredential.verify(args.token, (err, userDetails) => {
				if (!err)
					topicController.create(args.subject, args.description, userDetails.user_id, (err, doc) => {
						(err) ? reject(err) : resolve(doc);
					});
				else
					reject(err);
			});
    	});
    }
};

const topicUpdateMutation = {
	type: TopicType,
	args: {
        token: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLID) },
        subject: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString }
    },
    resolve: (parent, args) => {
    	return new Promise((resolve, reject) => {
    		userCredential.verify(args.token, (err, userDetails) => {
				if (!err)
					topicController.update(args.id, args.subject, args.description, userDetails.user_id, (err, doc) => {
						(err) ? reject(err) : resolve(doc);
					});
				else
					reject(err);
			});
    	});
    }
};

const topicDeleteMutation = {
	type: GraphQLBoolean,
	args: {
        token: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: (parent, args) => {
    	return new Promise((resolve, reject) => {
    		userCredential.verify(args.token, (err, userDetails) => {
				if (!err)
					topicController.delete(args.id, userDetails.user_id, (err, result) => {
						(err) ? reject(err) : resolve(result);
					});
				else
					reject(err);
			});
    	});
    }
};

module.exports = { topicCreateMutation, topicUpdateMutation, topicDeleteMutation };
