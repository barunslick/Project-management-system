const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const APIError = require('../helper/APIError');

const verifyToken = (req, res, next) => {
  let token;

  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    logger.info('No token found in request');

    return next(new APIError('No token found', httpStatus.UNAUTHORIZED, true));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      console.log(error);
      logger.info('Token verification error.');

      return next(
        new APIError('Token verification error', httpStatus.UNAUTHORIZED, true)
      );
    }
    try {
      const userResult = await db.getUserById(decoded.id);

      const user = db.parseQuery(userResult);

      req.user = { ...user, role: user.role.role };

      return next();
    } catch (err) {
      console.log(err);
      logger.error(`User removed from system`);

      return next(
        new APIError(
          err.message,
          err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
          true
        )
      );
    }
  });
};

const isAdmin = (req, res, next) => {
  db.fetchRoleFromId(req.user.role_id).then((result) => {
    if (!result) {
      logger.info(`User role is invalid`);

      return next(
        new APIError(
          'User role is invalid err:',
          httpStatus.INTERNAL_SERVER_ERROR,
          true
        )
      );
    }

    const userRole = db.parseQuery(result);
    if (userRole.role === 'admin') {
      next();
    } else {
      return next(
        new APIError(
          'You need to be a admin to add new user',
          httpStatus.UNAUTHORIZED,
          true
        )
      );
    }
  });
};

module.exports = {
  verifyToken,
  isAdmin,
};
