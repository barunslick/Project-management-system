const router = require('express').Router();

/* const userMiddleware = require('./user.middleware'); */
const userController = require('./user.controller');
const authMiddleware = require('../auth/auth.middleware');

router
  .route('/:userId')
  .get(authMiddleware.verifyToken, userController.getUserDetails);

module.exports = router;
