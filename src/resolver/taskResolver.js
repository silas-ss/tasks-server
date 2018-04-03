const { Task } = require('../model/task');
const uuid = require('uuid-v4');

const taskResolver = {
  Query: {
    findAllTasks (_, { projectId }) {
      return Task.findAll({ where: { projectId }});
    }
  },
  Mutation: {
    newTask (_, { task }) {
      task.id = uuid()
      const newTask = Task.create(task);
      return newTask;
    },
    deleteTask (_, { id }) {
      Task.destroy({ where: { id }});
      return id;
    },
    updateTask (_, { task }) {
      Task.update(task, { where: { id: task.id } });
      return task;
    }
  }
};

module.exports = taskResolver