const bookshelf = require('../db');

require('./role');
require('./project');

const User = bookshelf.model('User', {
  tableName: 'users',
  role() {
    return this.belongsTo('Role', 'role_id', 'id');
  },
  projects() {
    return this.belongsToMany(
      'Project',
      'project_users',
      'user_id',
      'project_id'
    );
  },
});

module.exports = User;
