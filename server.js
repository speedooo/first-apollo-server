import express from 'express';
import mySchema from './data/schema';
import Mocks from './data/mocks';

// NEW or changed imports:
import { apolloExpress, graphiqlExpress } from 'apollo-server';

import bodyParser from 'body-parser';


const GRAPHQL_PORT = 8080;
const graphQLServer = express();



// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

// `context` must be an object and can't be undefined when using connectors
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: mySchema,
  context: {}, //at least(!) an empty object
}));
graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
