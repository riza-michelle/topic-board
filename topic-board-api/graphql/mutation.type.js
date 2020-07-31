const { GraphQLObjectType } = require('graphql');
const { userRegisterMutation, userLoginMutation } = require('./user.mutation');
const { 
    topicCreateMutation,
    topicUpdateMutation,
    topicDeleteMutation
} = require('./topic.mutation');
const { messageCreateMutation } = require('./message.mutation');

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        user_register: userRegisterMutation,
        user_login: userLoginMutation,
        topic_create: topicCreateMutation,
        topic_update: topicUpdateMutation,
        topic_delete: topicDeleteMutation,
        message_create: messageCreateMutation
    })
});

module.exports = MutationType;
