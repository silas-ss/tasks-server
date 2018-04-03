const { makeExecutableSchema } = require('graphql-tools');
const worklogResolver = require('../resolver/worklogResolver');

const worklogDefs = `
  type Query {
    findAllWorklogs(taskId: String!): [Worklog]!
  }

  type Mutation {
    newWorklog(worklog: WorklogInput!): Worklog!
    deleteWorklog(id: String!): String!
    updateWorklog(worklog: WorklogInput): Worklog!
  }

  type Worklog {
    id: String!
    description: String!
    hours: Float!
    date: Date!
    taskId: String!
  }

  input WorklogInput {
    id: String
    description: String!
    hours: Float!
    date: Date!
    taskId: String!
  }

  scalar Date
`;

const worklogSchema = makeExecutableSchema({
  typeDefs: worklogDefs,
  resolvers: worklogResolver
});

module.exports = worklogSchema