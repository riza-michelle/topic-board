require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const QueryType = require('./graphql/query.type');
const MutationType = require('./graphql/mutation.type');
const { GraphQLSchema } = require('graphql');

const server_port = process.env.PORT;
const mongodb_uri = process.env.MONGODB_URI;
const app = new express();

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true } );
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
})

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  	res.setHeader('Accept', 'application/json');
  	res.setHeader('Content-Type', 'application/json');
  	next();
});

const schema = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType
});

app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}));

app.use('/user', require('./routes/user'));
app.use('/topic', require('./routes/topic'));
app.use('/topics', require('./routes/topics'));

app.listen(server_port, () => console.log(`Server started on port ${server_port}.`));
