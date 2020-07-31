const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql')
const UserType = require('./user.type');
const userControllerCls = require('../controllers/user');

const userController = new userControllerCls();

const userGetByID = (id, callback) => {
    userController.retrieveByID(id, callback);
};
const userCreatedByResolver = (message) => {
    return new Promise((resolve, reject) => {
        userGetByID(message.created_by, (err, userDetails) => {
            (err) ? reject(err) : resolve(userDetails);
        });
    });
};
const userUpdatedByResolver = (message) => {
    return new Promise((resolve, reject) => {
        userGetByID(message.updated_by, (err, userDetails) => {
            (err) ? reject(err) : resolve(userDetails);
        });
    });
};

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        message: { type: GraphQLString },
        created_by: { 
            type: UserType,
            resolve: userCreatedByResolver
        },
        updated_by: { 
            type: UserType,
            resolve: userUpdatedByResolver
        },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
});

module.exports = MessageType;
