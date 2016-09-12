import express from 'express';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';
import Connectors from './data/connectors';
// NEW or changed imports:
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';


const GRAPHQL_PORT = 8080;
const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  connectors: Connectors,
//  logger:
// allowUndefinedInResolve = false, //optional
//  resolverValidationOptions = {}, //optional
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: true,
});

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {}, //at least(!) an empty object
}));
graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
