const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
  }

  input BookInput {
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

  type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }
`;

module.exports = typeDefs;
