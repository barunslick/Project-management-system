const router = require('express').Router({ mergeParams: true });
const { validate } = require('express-validation');

const taskController = require('./task.controller');
const taskMiddleware = require('./task.middleware');
const paramValidation = require('../../config/paramValidation');

router.route('/').get(taskController.getAllTasksInProject);

router
  .route('/')
  .post(
    validate(
      paramValidation.createTask,
      { keyByField: true },
      { abortEarly: false }
    ),
    taskMiddleware.isAuthorizedToManageTask,
    taskMiddleware.isUserAssingable,
    taskController.createTask
  );

router
  .route('/:taskId')
  .delete(
    taskMiddleware.isAuthorizedToManageTask,
    taskMiddleware.verifyTask,
    taskController.deleteTask
  );

router
  .route('/:taskId/reassign')
  .put(
    taskMiddleware.isAuthorizedToManageTask,
    taskMiddleware.verifyTask,
    taskMiddleware.isUserAssingable,
    taskController.reassignTask
  );

module.exports = router;
