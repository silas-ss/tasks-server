const { makeExecutableSchema } = require('graphql-tools');
const taskResolver = require('../resolver/taskResolver');

const taskDefs = `
  type Query {
    findAllTasks(projectId: String!): [Task]!
  }

  type Mutation {
    newTask(task: TaskInput!): Task!
    deleteTask(id: String!): String!
    updateTask(task: TaskInput): Task!
  }

  type Task {
    id: String!
    title: String!
    description: String!
    projectId: String!
  }

  input TaskInput {
    id: String
    title: String!
    description: String!
    projectId: String!
  }
`;

const taskSchema = makeExecutableSchema({
  typeDefs: taskDefs,
  resolvers: taskResolver
});

module.exports = taskSchema