const bookshelf = require('../db');

require('./user');
require('./task');
require('./projectUser');

const Project = bookshelf.model('Project', {
  tableName: 'projects',
  users() {
    return this.belongsToMany('User', 'project_user', 'project_id', 'user_id');
  },
  tasks() {
    return this.hasMany('Task', 'id', 'project_id');
  },
});

module.exports = Project;
