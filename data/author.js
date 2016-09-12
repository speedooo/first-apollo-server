import Post from './posts';

const Author = `
  type Author {
    id: Int! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
`;
// we export have to export Author and all types it depends on in order to make it reusable
export default () => [Author, Post];
