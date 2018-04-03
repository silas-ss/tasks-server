const Sequelize = require('sequelize');

const db = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const Project = db.define("project", {
  id: { type: Sequelize.UUID, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = {
  db,
  Project
};