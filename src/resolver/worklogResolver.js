const { Worklog } = require('../model/worklog');
const uuid = require('uuid-v4');

const worklogResolver = {
  Query: {
    findAllWorklogs (_, { taskId }) {
      return Worklog.find({ taskId });
    }
  },
  Mutation: {
    newWorklog (_, { worklog }) {
      worklog.id = uuid()
      const newWorklog = Worklog.create(worklog);
      return newWorklog;
    },
    deleteWorklog (_, { id }) {
      Worklog.remove({ id });
      return id;
    },
    updateWorklog (_, { worklog }) {
      Worklog.update({ id: worklog.id }, worklog, { upsert: true });
      return worklog;
    }
  }
};

module.exports = worklogResolver