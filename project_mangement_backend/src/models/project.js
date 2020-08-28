const bookshelf = require('../db');

require('./user');
require('./task');
require('./projectUser');

const Project = bookshelf.model('Project', {
  tableName: 'projects',
  users() {
    return this.belongsToMany('User', 'project_users', 'project_id', 'user_id');
  },
  tasks() {
    return this.hasMany('Task', 'id', 'project_id');
  },
  manager() {
    return this.belongsTo('User', 'project_manager_id', 'id');
  },
});

module.exports = Project;
