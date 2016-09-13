import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import casual from 'casual';
import rp from 'request-promise';
import _ from 'lodash';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
});

const AuthorModel = db.define('author', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

const PostModel = db.define('post', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  tags: {
    type: Sequelize.STRING,
  }
});


const mongo = Mongoose.connect('mongodb://localhost/views', (err) => {
  if(err){
    console.error('Could not connect to MongoDB on port 27017');
  }
});

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
})

const View = Mongoose.model('views', ViewSchema);
// Relations
AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

casual.seed(123);
db.sync({ force: true })
  .then(()=> {
     let id=0;
  _.times(10, ()=> {
    return AuthorModel.create({
      id: id++,
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then(author => {
      return author.createPost({
        id : 1000+id++,
        title: `A post by ${author.firstName} ${author.lastName}`,
        text: casual.sentences(3),
        tags: casual.words(3).split(' ').join(','),
      }).then( (post) => {
        return View.update({ postId: post.id }, { views: casual.integer(0,100)}, { upsert: true })
        .then( (res) => console.log(res))
        .catch( (err) => console.log(err));
      });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;

const FortuneCookie = {
  getOne(){
    return rp('http://fortunecookieapi.com/v1/cookie')
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res[0].fortune.message;
      });
  },
};

export { Author, Post, View, FortuneCookie };
