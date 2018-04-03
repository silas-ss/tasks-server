const { makeExecutableSchema } = require('graphql-tools');
const projectResolver = require('../resolver/projectResolver');

const projectDefs = `
  type Query {
    findAllProjects: [Project]!
    project(id: String!): Project!
    countProjects: Int!
  }

  type Mutation {
    newProject(name: String!): Project!
    deleteProject(id: String!): String!
    updateProject(project: ProjectInput!): Project!
  }

  type Project @cacheControl(maxAge: 100) {
    id: String!
    name: String!
  }

  input ProjectInput {
    id: String!
    name: String!
  }
`;

const projectSchema = makeExecutableSchema({
  typeDefs: projectDefs,
  resolvers: projectResolver
});

module.exports = projectSchema