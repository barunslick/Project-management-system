const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const roles = require('../../constants/roles');
const APIError = require('../helper/APIError');
const Project = require('../../models/project');

const checkUserInProject = (projectUsers = [], userId) => {
  const check = projectUsers.map((user) => {
    if (user.user_id === userId) {
      return true;
    }

    return false;
  });
  return check;
};

const createProject = (req, res, next) => {
  // First check if project manager of given user email exits.
  db.getUserByEmail(req.body.projectManagerEmail)
    .then((result) => {
      req.newProject = {
        name: req.body.name,
        description: req.body.description,
      };

      if (!result) {
        throw {
          message: 'No project manager with such email found',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }
      req.returnedUser = db.parseQuery(result);

      return db.fetchRoleFromId(req.returnedUser.role_id);
    })
    .then((data) => {
      const returnedRole = db.parseQuery(data);

      if (returnedRole.role !== roles.PROJECT_MANAGER) {
        throw {
          message: 'Given user is not a project manager',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      req.newProject.project_manager_id = req.returnedUser.id;

      return Project.where({ name: req.body.name }).fetch({
        require: false,
      });
    })
    .then((result) => {
      console.log(result);
      if (result) {
        throw {
          message: 'project already exists',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      return db.createNewProject(req.newProject);
    })
    .then((data) => {
      const addedProject = db.parseQuery(data);

      console.log(addedProject);

      res.json({
        msg: 'Project added successfully',
        project: addedProject,
      });
    })
    .catch((err) => {
      logger.info(`Failed to create new project, error: ${err.message}`);

      return next(new APIError(err.message, err.statusCode, true));
    });
};

const addUserToProject = (req, res, next) => {
  const results = {};
  db.getUserByEmail(req.body.userEmail)
    .then((result) => {
      if (!result) {
        throw {
          message: 'No user found with such email',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }
      results.user = db.parseQuery(result);

      return db.fetchRoleFromId(results.user.role_id);
    })
    .then((role) => {
      if (role === roles.ADMIN || role === roles.PROJECT_MANAGER) {
        throw {
          message: 'You cant add admin or project manager to project',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      return db.fetchAllUsersFromProject(req.params.projectId);
    })
    .then((result) => {
      const parsedResult = db.parseQuery(result);

      if (parsedResult.length === 0) {
        return db.addUserToProject(req.params.projectId, results.user.id);
      }

      const userAlreadyInProject = checkUserInProject(
        parsedResult,
        results.user.id
      );

      if (userAlreadyInProject) {
        throw {
          message: 'User already exists in project',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }
      return db.addUserToProject(req.params.projectId, results.user.id);
    })
    .then(() => {
      res.json({
        message: 'User succesfully added to project',
      });
    })
    .catch((err) => {
      logger.info(
        `Failed to add user ${req.body.userEmail} to project, error: ${err.message}`
      );

      return next(
        new APIError(
          err.message,
          err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
          true
        )
      );
    });
};

const getAllProjects = async (req, res, next) => {
  try {
    switch (req.user.role) {
      case roles.ADMIN:
      case roles.PROJECT_MANAGER: {
        const projectstResult = await db.fetchAllProjects();

        const projects = projectstResult ? db.parseQuery(projectstResult) : [];

        res.json({
          projects,
        });

        break;
      }
      case roles.TEAM_LEAD:
      case roles.ENGINEER: {
        const projectstResult = await db.fetchAllProjectsForUser(req.user.id);

        const userWithProjects = projectstResult
          ? db.parseQuery(projectstResult)
          : [];

        res.json({
          projects: userWithProjects.projects,
        });
        break;
      }
      default:
        return next(new APIError('Invalid Role', httpStatus.BAD_REQUEST, true));
    }
  } catch (err) {
    logger.info(`Failed to get all projects, error: ${err.message}`);

    return next(
      new APIError(
        err.message,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const getAllUserInProject = async (req, res, next) => {
  try {
    const usersResult = await db.fetchAllUsersDetailsFromProject(
      req.params.projectId
    );

    const parseresult = db.parseQuery(usersResult);

    const users = parseresult[0].users;

    res.json({
      users,
    });
  } catch (err) {
    logger.info(`Failed to get users from this project, error: ${err.message}`);

    return next(
      new APIError(
        err.message,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const projectResult = await db.fetchProjectByIdWithManager(
      req.params.projectId
    );

    const project = projectResult ? db.parseQuery(projectResult) : {};
    res.json({
      project,
    });
  } catch (err) {
    logger.info(`Failed to get project, error: ${err.message}`);

    return next(
      new APIError(
        err.message,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

module.exports = {
  createProject,
  addUserToProject,
  getAllProjects,
  getAllUserInProject,
  getProjectById,
};
