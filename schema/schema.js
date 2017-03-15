const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  {
    id: '23',
    firstName: 'Omar',
    age: 27
  },
  {
    id: '24',
    firstName: 'Ale',
    age: 87
  }
]

// This objects tells GraphQL what properties is suppossed to have
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return _.find(users, {id: args.id})
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

