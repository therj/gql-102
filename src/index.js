const { ApolloServer, gql } = require('apollo-server');
const { PostAPI } = require('./datasources/post-api');
const typeDefs = require('./schema');

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    // parent, args, context, info
    book: (parent, args, context, info) => {
      console.log(args);
      currentBook = books.find((el) => `${el.id}` === args.id);
      return currentBook;
    },
    posts: async (_, __, {dataSources})=>{
      const posts = await dataSources.postAPI.getPosts()
      return posts
    },
    post: async (parent, {id}, {dataSources}, info)=>{
      const post = await dataSources.postAPI.getPostById(id)
      return post
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: () => {
    return {
      postAPI: new PostAPI(),
    };
  },
  introspection: process.env.NODE_ENV === 'production' ? false : true,
});

server.listen().then((data) => {
  console.log(`Listening on ${data.url}`);
});
