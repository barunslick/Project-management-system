const router = require('express').Router({ mergeParams: true });
const { validate } = require('express-validation');

const taskRoute = require('../task/task.route');

const authMiddleware = require('../auth/auth.middleware');
const projectController = require('./project.controller');
const projectMiddleware = require('./project.middleware');
const paramValidation = require('../../config/paramValidation');

router
  .route('/')
  .get(authMiddleware.verifyToken, projectController.getAllProjects)
  .post(
    validate(
      paramValidation.createProject,
      { keyByField: true },
      { abortEarly: false }
    ),
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    projectController.createProject
  );

router
  .route('/:projectId')
  .get(
    authMiddleware.verifyToken,
    projectMiddleware.isAuthorizedInProject,
    projectController.getProjectById
  );

router
  .route('/:projectId/user')
  .get(
    authMiddleware.verifyToken,
    projectMiddleware.isAuthorizedInProject,
    projectController.getAllUserInProject
  )
  .post(
    validate(
      paramValidation.addUserToProject,
      { keyByField: true },
      { abortEarly: false }
    ),
    authMiddleware.verifyToken,
    projectMiddleware.isAuthorizedInProject,
    projectMiddleware.isAuthorizedToAddUser,
    projectController.addUserToProject
  );

router.use(
  '/:projectId/task',
  authMiddleware.verifyToken,
  projectMiddleware.isAuthorizedInProject,
  taskRoute
);

module.exports = router;
