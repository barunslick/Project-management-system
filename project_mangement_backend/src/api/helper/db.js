const Task = require('../../models/task');
const User = require('../../models/user');
const Role = require('../../models/role');
const Project = require('../../models/project');
const ProjectUser = require('../../models/projectUser');

const parseQuery = (results) => JSON.parse(JSON.stringify(results));

// User based operations
const getUserByEmail = (email) =>
  User.where({ email: email }).fetch({
    columns: [
      'id',
      'email',
      'first_name',
      'middle_name',
      'last_name',
      'password',
      'role_id',
    ],
    withRelated: ['role'],
    require: false,
  });

const addUser = ({
  email,
  firstName,
  middleName = null,
  lastName,
  password,
  role_id,
}) =>
  User.forge({
    email: email,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    password: password,
    role_id: role_id,
  }).save();

const fetchRole = (role) =>
  Role.where({ role: role }).fetch({
    require: false,
  });

const fetchRoleFromId = (roleId) =>
  Role.where({ id: roleId }).fetch({
    require: false,
  });

// Project operations
const createNewProject = ({ name, description, project_manager_id }) =>
  Project.forge({
    name,
    description,
    project_manager_id,
  }).save();

const addUserToProject = (projectId, userId) =>
  ProjectUser.forge({
    project_id: projectId,
    user_id: userId,
  }).save();

const fetchAllProjects = () =>
  Project.fetchAll({
    require: false,
  });

const fetchProjectById = (projectId) =>
  Project.where({ id: projectId }).fetch({
    require: false,
  });

const fetchUserFromProject = (projectId, userId) => {
  return ProjectUser.where({ project_id: projectId, user_id: userId }).fetch({
    require: false,
  });
};

const fetchAllUsersFromProject = (projectId) =>
  ProjectUser.where({ project_id: projectId }).fetchAll({
    require: false,
  });

const fetchAllProjectsForUser = (userId) =>
  User.forge({ id: userId }).fetch({ withRelated: ['projects'] });

const getUser = (email) =>
  User.where({ email: email }).fetch({
    withRelated: ['role'],
    require: false,
  });

const getUserById = (id) =>
  User.where({ id: id }).fetch({
    columns: [
      'id',
      'email',
      'first_name',
      'middle_name',
      'last_name',
      'role_id',
    ],
    withRelated: ['role'],
    require: false,
  });

const addTask = ({ title, projectId, assigneeId, deadline, description }) =>
  Task.forge({
    title,
    project_id: projectId,
    assignee_id: assigneeId || null,
    deadline,
    description,
  }).save();

const fetchAllTasksFromProject = (projectId) =>
  Project.where({ id: projectId }).fetchAll({
    withRelated: ['tasks'],
    require: false,
  });

const fetchTask = (projectId, taskId) =>
  Task.where({ id: taskId, project_id: projectId }).fetch({
    require: false,
  });

const deleteTask = (projectId, taskId) =>
  Task.where({ id: taskId, project_id: projectId }).destroy();

const reassignTask = (taskId, newTaskDetails) =>
  Task.where({ id: taskId }).save(
    {
      assignee_id: newTaskDetails.assigneeId,
      previous_assigned_to: newTaskDetails.previousAssigneeId,
    },
    { patch: true }
  );

const getUserPassword = (userId) =>
  User.where({ id: userId }).fetch({
    columns: ['password'],
    require: false,
  });

const updateUserPassword = (userId, password) =>
  User.where({ id: userId }).save({ password: password }, { patch: true });

module.exports = {
  parseQuery,
  getUserByEmail,
  addUser,
  createNewProject,
  fetchRole,
  fetchRoleFromId,
  addUserToProject,
  fetchAllProjects,
  fetchProjectById,
  fetchAllProjectsForUser,
  fetchAllUsersFromProject,
  fetchUserFromProject,
  getUser,
  addTask,
  fetchTask,
  deleteTask,
  reassignTask,
  getUserById,
  getUserPassword,
  updateUserPassword,
  fetchAllTasksFromProject,
};
