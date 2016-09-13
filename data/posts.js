import Author from './author';
import { Post, View } from './connectors';

export const schema = [`
  type Post {
    id: Int!
    tags: [String]
    title: String
    text: String
    views: Int
    author: Author
  }
`];


export const resolvers = {
    Query: {

    },
    Post: {
        author(post){
            return post.getAuthor();
        },
        tags(post){
            return post.tags.split(',');
        },
        views(post){
            return new Promise((resolve, reject) => {
                setTimeout( () => reject('MongoDB timeout when fetching field views (timeout is 500ms)'), 500);
                View.findOne({ postId: post.id }).then( (res) => resolve(res.views) );
            })
        }

    },
    Mutation: {
        createPost: (root, { authorId, tags, title, text }) => {
            return Author.findOne({ where: { id: authorId } }).then( (author) => {
                console.log('found', author);
                return author.createPost( { tags: tags.join(','), title, text });
            });
        },

    }
};
