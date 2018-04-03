const { mergeSchemas } = require('graphql-tools');
const projectSchema = require('../schema/projectSchema');
const taskSchema = require('../schema/taskSchema');
const worklogSchema = require('../schema/worklogSchema');

const linkSchemas = `
  extend type Project {
    tasks: [Task]! @cacheControl(maxAge: 50)
  }

  extend type Task {
    worklogs: [Worklog]!
    project: Project!
  }
`;

const schemasMerged = mergeSchemas({
  schemas: [projectSchema, taskSchema, worklogSchema, linkSchemas],
  resolvers: (mergeInfo) => ({
    Project: {
      tasks: {
        fragment: `fragment ProjectFragment on Project { id }`,
        resolve(parent, args, context, info) {
          const projectId = parent.id;
          return mergeInfo.delegate('query', 'findAllTasks', { projectId }, context, info);
        }
      }
    },
    Task: {
      worklogs: {
        fragment: `fragment TaskFragment on Task { id }`,
        resolve(parent, args, context, info) {
          const taskId = parent.id;
          return mergeInfo.delegate('query', 'findAllWorklogs', { taskId }, context, info);
        }
      },
      project: {
        fragment: `fragment TaskFragment on Task { projectId }`,
        resolve(parent, args, context, info) {
          const projectId = parent.projectId
          return mergeInfo.delegate('query', 'project', { id: projectId }, context, info);
        }
      }
    }
  })
});

module.exports = schemasMerged