const { Project } = require('../model/project');
const uuid = require('uuid-v4');

const projectResolver = {
  Query: {
    findAllProjects () {
      return Project.findAll();
    },
    project (_, { id }) {
      return Project.find({ where: { id } })
    },
    countProjects () {
      return Project.count();
    }
  },
  Mutation: {
    newProject (_, { name }) {
      const project = Project.create({ id: uuid(), name: name });
      return project;
    },
    deleteProject (_, { id }) {
      Project.destroy({ where: { id } });
      return id;
    },
    updateProject (_, { project }) {
      Project.update(project, { where: { id: project.id } });
      return project;
    }
  }
};

module.exports = projectResolver