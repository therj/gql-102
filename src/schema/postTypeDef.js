const { gql } = require('apollo-server');

const postTypeDefs = gql`

  type Post {
    id: ID
    title: String
    body: String
    userId: ID
  }

  type Query {
    posts: [Post]
    post(id: ID): Post
  }
`;

module.exports = { postTypeDefs };
