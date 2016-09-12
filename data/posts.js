import Author from './author';
const Post = `
  type Book {
    id: Int!
    tags: [String]
    title: String
    text: String
    views: Int
    author: Author
  }
`;
export default () => [Post, Author];
