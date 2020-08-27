const router = require('express').Router();
const { validate } = require('express-validation');

const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');
const paramValidation = require('../../config/paramValidation');

router
  .route('/login')
  .post(
    validate(
      paramValidation.login,
      { keyByField: true },
      { abortEarly: false }
    ),
    authController.login
  );

router
  .route('/register')
  .post(
    validate(
      paramValidation.register,
      { keyByField: true },
      { abortEarly: false }
    ),
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    authController.register
  );

router
  .route('/password')
  .put(
    validate(
      paramValidation.changePassword,
      { keyByField: true },
      { abortEarly: false }
    ),
    authMiddleware.verifyToken,
    authController.changePassword
  );

module.exports = router;
