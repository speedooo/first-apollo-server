import { merge } from 'lodash';
import Author from './author'

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
//import AuthorResolver from './authorResolver'
import Resolvers from './resolvers';
import Connectors from './connectors';

// the schema allows the following two queries:
const RootQuery =`
    
    type RootQuery {
        author(firstName: String, lastName: String): Author
        fortuneCookie: String
    }

`;




const typeDefinitions = `

# this schema allows the following two mutations:
type RootMutation {
  createAuthor(
    firstName: String!
    lastName: String!
  ): Author

  createPost(
    tags: [String!]!
    title: String!
    text: String!
    authorId: Int!
  ): Post
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default makeExecutableSchema ({
    typeDefs: [typeDefinitions, RootQuery, Author],
    resolvers: Resolvers,
    connectors: Connectors,
//  logger = { log: (e) => console.log(e) },
// allowUndefinedInResolve = false, //optional
//  resolverValidationOptions = {}, //optional
});
