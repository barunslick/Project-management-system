const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const APIError = require('../helper/APIError');

const createTask = async (req, res, next) => {
  try {
    const task = {
      title: req.body.title,
      projectId: req.params.projectId,
      assigneeId: req.task.newAssignee.id || null,
      deadline: req.body.deadline,
      description: req.body.description,
    };

    const insertTask = await db.addTask(task);

    res.json({
      message: 'Task successfully added',
      task: db.parseQuery(insertTask),
    });
  } catch (err) {
    logger.info(`Failed to add new task, error: ${err.message}`);

    return next(
      new APIError(
        err.message || 'Failed to add new task',
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const getAllTasksInProject = async (req, res, next) => {
  try {
    const tasksResult = await db.fetchAllTasksFromProject(req.params.projectId);
    const tasks = tasksResult ? db.parseQuery(tasksResult) : [];
    res.json({
      tasks,
    });
  } catch (err) {
    logger.info(`Failed to get all tasks, error: ${err.message}`);

    return next(
      new APIError(
        err.message || 'Failed to get all tasks',
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await db.deleteTask(req.params.projectId, req.params.taskId);

    res.json({
      message: 'Task deleted',
    });
  } catch (err) {
    logger.info(
      `Failed to delete task with taskId ${req.params.taskId}, error: ${err.message}`
    );

    return next(
      new APIError(
        `Failed to delete task with taskId ${req.params.taskId}`,
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        true
      )
    );
  }
};

const reassignTask = async (req, res, next) => {
  try {
    let previousAssigneeId = null;

    if (req.task.assignee_id) {
      if (req.task.assignee_id === req.task.newAssignee.id) {
        throw {
          message: `Task cannot be reassigned to current assignee`,
          statusCode: httpStatus.BAD_GATEWAY,
        };
      }
      previousAssigneeId = req.task.assignee_id;
    }

    const newTaskDetails = {
      assigneeId: req.task.newAssignee.id,
      previousAssigneeId,
    };

    const updateResult = await db.reassignTask(req.task.id, newTaskDetails);

    const newTask = db.parseQuery(updateResult);

    logger.info(`New user assigned to task ${req.task.id}`);
    res.json({
      message: 'Task updated',
      task: newTask,
    });
  } catch (err) {
    logger.error(
      `Failed to assign user for taskId ${req.params.taskId}, error: ${err.message}`
    );

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
  createTask,
  getAllTasksInProject,
  deleteTask,
  reassignTask,
};
