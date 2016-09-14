
This is heavily by spaired by apollo-server-tutorial

1. environment setup

nvm use 6.3.1
mkdir first-apollo-server & cd first-apollo-server
npm init
npm i -S apollo-server graphql graphql-tools express.....
npm i --save-dev casual babel-cli loadsh nodemon webpack ...

you need mongodb installed

2. how to

after clone the ocde from repo
npm install
npm start


3.test UI (http://localhost:8080/graphiql)

{
  author(id:3){
    firstName
    lastName
    posts{
      title
      views
    }
  }
}

{
  author(firstName:"Millie"){
    firstName
    lastName
    posts{
      title
      views
    }
  }
}

