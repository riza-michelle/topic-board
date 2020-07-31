const {
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const UserType = require('./user.type');
const userControllerCls = require('../controllers/user');
const userCredential = require('../controllers/usercredential');

const userController = new userControllerCls();

const userRegisterMutation = {
    type: UserType,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
        return new Promise((resolve, reject) => {
            userController.register(args.email, args.password, args.name, (err, userDetails) => {
                (err) ? reject(err) : resolve(userDetails);
            });
        });
    }
};

const userLoginMutation = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
        return new Promise((resolve, reject) => {
            userController.login(args.email, args.password, (err, doc) => {
                if (!err)
                    userCredential.sign(doc.id, doc.email, (err, token) => {
                        (err) ? reject(err) : resolve(token);
                    });
                else
                    reject(err);
            });
        });
    }
};

module.exports = { userRegisterMutation, userLoginMutation };
