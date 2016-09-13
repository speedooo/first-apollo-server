import Post from './posts';
import { Author } from './connectors';

export const schema = [`
  type Author {
    id: Int! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
`];


export const resolvers = {
    Query: {
        author(_, args) {
            return Author.find({ where: args });
        },
        authors() {
            return Author.findAll({})
        }
    },
    Author: {
        posts(author){
            return author.getPosts();
        },
    },
    Mutation: {
        createAuthor: (root, args) => { return Author.create(args); },

    }
};