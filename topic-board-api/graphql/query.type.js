const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const TopicType = require('./topic.type.js');
const topicControllerCls = require('../controllers/topic');
const userCredential = require('../controllers/usercredential');

const topicController = new topicControllerCls();

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        topics: {
            type: GraphQLList(TopicType),
            args: {
                token: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                return new Promise((resolve, reject) => {
                    userCredential.verify(args.token, (err, userDetails) => {
                        if (!err)
                            topicController.retrieveAll((err, topics) => {
                                (err) ? reject(err) : resolve(topics);
                            });
                        else
                            reject(err);
                    });
                });
            }
        },
        topic: {
            type: TopicType,
            args: {
                token: { type: GraphQLNonNull(GraphQLString) },
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return new Promise((resolve, reject) => {
                    userCredential.verify(args.token, (err, userDetails) => {
                        if (!err)
                            topicController.retrieveByID(args.id, (err, topic) => {
                                (err) ? reject(err) : resolve(topic);
                            });
                        else
                            reject(err);
                    });
                });
            }
        }
    })
});

module.exports = QueryType;
