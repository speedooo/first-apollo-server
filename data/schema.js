import { merge } from 'lodash';
import {schema as authorSchema, resolvers as authorResolver} from './author'
import {schema as postSchema, resolvers as postResolver} from './posts'
import { resolvers as fortuneCookieResolver} from './fortuneCookie'

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import Connectors from './connectors';

// the schema allows the following two queries:
const Query =[`
    
    type Query {
        author(firstName: String, lastName: String): Author
        fortuneCookie: String
    }

`];


// this schema allows the following two mutations:

const Mutation =[`
    type Mutation {
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
`];


const typeDefinitions = [`

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`];

const logger = {
    log(e) {
        /* eslint-disable no-console */
        return console.log(e);
    }
};

export default makeExecutableSchema ({
    typeDefs: [...typeDefinitions, ...Query, ...Mutation, ...authorSchema,...postSchema],
    resolvers: merge(fortuneCookieResolver, authorResolver,postResolver),
    connectors: Connectors,
    logger ,
// allowUndefinedInResolve = false, //optional
//  resolverValidationOptions = {}, //optional
});
