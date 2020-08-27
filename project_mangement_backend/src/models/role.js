const bookshelf = require('../db');

require('./user');

const Role = bookshelf.model('Role', {
  tableName: 'roles',
  users() {
    return this.hasMany('User', 'id', 'role_id');
  },
});

module.exports = Role;
