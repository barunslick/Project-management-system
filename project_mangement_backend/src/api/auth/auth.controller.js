const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const encrypt = require('../helper/encrypt');
const decrypt = require('../helper/decrypt');
const APIError = require('../helper/APIError');

const createToken = (data) => jwt.sign(data, process.env.JWT_SECRET);

const login = (req, res, next) => {
  const results = {};

  db.getUserByEmail(req.body.email)
    .then((result) => {
      if (!result) {
        throw {
          message: 'No such user',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      results.userData = db.parseQuery(result);

      return decrypt(req.body.password, results.userData.password);
    })
    .then((result) => {
      const data = {
        id: results.userData.id,
        email: results.userData.email,
        firstName: results.userData.first_name,
        middleName: results.userData.middle_name,
        lastName: results.userData.last_name,
        role: results.userData.role.role,
      };

      const forToken = {
        id: results.userData.id,
        email: results.userData.email,
      };

      if (result) {
        const token = createToken(forToken);

        logger.info(`User logged on. email: ${req.body.email}`);

        res.json({
          user: data,
          token,
        });
      } else {
        throw {
          message: 'Invalied email or password',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }
    })
    .catch((err) => {
      logger.info(`Failed to login, error: ${err.message}`);

      return next(new APIError(err.message, err.statusCode, true));
    });
};

const register = (req, res, next) => {
  db.getUserByEmail(req.body.email)
    .then((result) => {
      if (result) {
        throw {
          message: 'User already exists',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }

      return db.fetchRole(req.body.role);
    })
    .then((roleId) => {
      if (!roleId) {
        throw {
          message: 'Bad role request',
          statusCode: httpStatus.BAD_REQUEST,
        };
      }
      const role = db.parseQuery(roleId);
      req.role = role.id;

      return encrypt(req.body.password);
    })
    .then((password) => {
      const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        middleName: req.body.middleName || null,
        lastName: req.body.lastName,
        password: password.hashedPassword,
        role_id: req.role,
      };

      return db.addUser(user);
    })
    .then((user) => {
      logger.info(`User ${db.parseQuery(user).email} added successfully`);
      res.json({
        message: 'User added succesfully',
      });
    })
    .catch((err) => {
      logger.info(`Failed to register, error: ${err.message}`);

      return next(new APIError(err.message, err.statusCode, true));
    });
};

const changePassword = async (req, res, next) => {
  try {
    const oldUserPasswordResult = await db.getUserPassword(req.user.id);

    const oldUserPassword = db.parseQuery(oldUserPasswordResult).password;
    const isNewPasswordSame = await decrypt(req.body.password, oldUserPassword);

    if (isNewPasswordSame) {
      throw {
        message: 'Old and new password cannot be same',
        statusCode: httpStatus.BAD_REQUEST,
      };
    }

    const newHashedPassword = await encrypt(req.body.password);

    await db.updateUserPassword(req.user.id, newHashedPassword.hashedPassword);

    res.json({
      message: 'Password successfully changed',
    });
  } catch (err) {
    console.error(err);
    logger.info(`Failed to create new user, error: ${err.message}`);

    return next(new APIError(err.message, err.statusCode, true));
  }
};

module.exports = {
  login,
  register,
  changePassword,
};
