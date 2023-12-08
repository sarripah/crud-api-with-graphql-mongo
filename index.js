const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

mongoose.connect('mongodb://localhost:27017/layanan_akademik');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
