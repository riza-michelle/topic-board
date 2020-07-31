const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');
const UserType = require('./user.type');
const MessageType = require('./message.type');
const messageControllerCls = require('../controllers/message');
const userControllerCls = require('../controllers/user');

const messageController = new messageControllerCls();
const userController = new userControllerCls();

const userGetByID = (id, callback) => {
    userController.retrieveByID(id, callback);
};
const userCreatedByResolver = (topic) => {
    return new Promise((resolve, reject) => {
        userGetByID(topic.created_by, (err, userDetails) => {
            (err) ? reject(err) : resolve(userDetails);
        });
    });
};
const userUpdatedByResolver = (topic) => {
    return new Promise((resolve, reject) => {
        userGetByID(topic.updated_by, (err, userDetails) => {
            (err) ? reject(err) : resolve(userDetails);
        });
    });
};
const messageResolver = (topic) => {
    return new Promise((resolve, reject) => {
        messageController.retrieveFromTopic(topic.id, (err, messages) => {
            (err) ? reject(err) : resolve(messages);
        });
    });
};

const TopicType = new GraphQLObjectType({
    name: 'Topic',
    fields: () => ({
        id: { type: GraphQLID },
        subject: { type: GraphQLString },
        description: { type: GraphQLString },
        created_by: { 
            type: UserType,
            resolve: userCreatedByResolver
        },
        updated_by: { 
            type: UserType,
            resolve: userUpdatedByResolver
        },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
        messages: {
            type: GraphQLList(MessageType),
            resolve: messageResolver
        }
    })
});

module.exports = TopicType;
