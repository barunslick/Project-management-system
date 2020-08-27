const bookshelf = require('../db');

const ProjectUser = bookshelf.model('ProjectUser', {
  tableName: 'project_users',
});

module.exports = ProjectUser;
