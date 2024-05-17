const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Query {
    exampleField: String
    getItems: [Item]
    getItem(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!, description: String!): Item
    updateItem(id: ID!, name: String, description: String): Item
    deleteItem(id: ID!): Item
  }

  type Item {
    id: ID!
    name: String!
    description: String!
  }
`;

module.exports = typeDefs;
