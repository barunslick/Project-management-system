const bookshelf = require('../db');

require('./project');

const Task = bookshelf.model('Task', {
  tableName: 'tasks',
  project() {
    return this.belongsTo('Project', 'project_id', 'id');
  },
});

module.exports = Task;
