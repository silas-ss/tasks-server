const Sequelize = require('sequelize');

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const Task = db.define("task", {
  id: { type: Sequelize.UUID, primaryKey: true },
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: true },
  projectId: { type: Sequelize.UUID, allowNull: false }
});

module.exports = {
  db,
  Task
};