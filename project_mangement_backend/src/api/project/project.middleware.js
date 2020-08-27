const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const APIError = require('../helper/APIError');

const isAuthorizedInProject = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role === 'project_manager') {
      const projectResult = await db.fetchProjectById(req.params.projectId);

      if (!projectResult) {
        throw {
          message: 'Project not found',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      const project = db.parseQuery(projectResult);

      if (project.project_manager_id !== req.user.id) {
        throw {
          message: 'You are unauthorized in this project',
          statusCode: httpStatus.UNAUTHORIZED,
        };
      }

      return next();
    }

    const projectInUser = await db.fetchUserFromProject(
      req.params.projectId,
      req.user.id
    );

    if (!projectInUser) {
      throw {
        message: 'You are unauthorized in this project',
        statusCode: httpStatus.UNAUTHORIZED,
      };
    }

    return next();
  } catch (err) {
    logger.error(`You are unauthorized in this project : err: ${err}`);

    return next(
      new APIError(
        `You are unauthorized in this project`,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const isAuthorizedToAddUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'project_manager') {
      throw {
        message: 'Unauthorized to add user to project',
        statusCode: httpStatus.UNAUTHORIZED,
      };
    }
    return next();
  } catch (err) {
    logger.error(`Unauthorized to add user to project : err: ${err}`);

    return next(
      new APIError(
        err.message,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

module.exports = { isAuthorizedToAddUser, isAuthorizedInProject };
