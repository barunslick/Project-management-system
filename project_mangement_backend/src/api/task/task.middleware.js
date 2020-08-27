const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const APIError = require('../helper/APIError');

const isAuthorizedToManageTask = async (req, res, next) => {
  try {
    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'project_manager' &&
      req.user.role !== 'team_lead'
    ) {
      throw {
        message: 'User unauthorized to manage task',
        statusCode: httpStatus.UNAUTHORIZED,
      };
    }
    return next();
  } catch (err) {
    logger.info(`Failed to perform opeartion on task, error: ${err.message}`);

    return next(
      new APIError(
        err.message,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const verifyTask = async (req, res, next) => {
  try {
    const taskResult = await db.fetchTask(
      req.params.projectId,
      req.params.taskId
    );

    if (!taskResult) {
      throw {
        message: 'Task doesnt exist in project',
        statusCode: httpStatus.NOT_FOUND,
      };
    }
    const task = db.parseQuery(taskResult);

    req.task = task;
    return next();
  } catch (err) {
    logger.info(
      `Failed to get task with ${req.params.taskId} in project ${req.params.projectId}, error:  ${err.message}`
    );

    return next(
      new APIError(
        `Failed to get task with ${req.params.taskId} in project ${req.params.projectId}`,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const isUserAssingable = async (req, res, next) => {
  try {
    let assignee = {};
    if (req.body.assigneeEmail) {
      const assigneeResult = await db.getUser(req.body.assigneeEmail);

      if (!assigneeResult) {
        throw {
          message: 'No assigne with such email',
          statusCode: httpStatus.NOT_FOUND,
        };
      }

      assignee = db.parseQuery(assigneeResult);

      const assigneeRole = assignee.role.role;

      if (assigneeRole === 'admin' || assigneeRole === 'project_manager') {
        throw {
          message: 'Cannot set admin or project manager assignee',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      const checkUserInProject = await db.fetchUserFromProject(
        req.params.projectId,
        assignee.id
      );

      if (!checkUserInProject) {
        throw {
          message: 'User not involved in project',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }
      if (!req.task) {
        req.task = {};
      }
      req.task.newAssignee = assignee;
    }
    return next();
  } catch (err) {
    logger.info(
      `Given user isnt assignable to task in this project, err: ${err}`
    );

    return next(
      new APIError(
        `Given user isnt assignable to task in this project`,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

module.exports = { isAuthorizedToManageTask, verifyTask, isUserAssingable };
