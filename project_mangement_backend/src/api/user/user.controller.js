const httpStatus = require('http-status');

const db = require('../helper/db');
const logger = require('../../logger');
const APIError = require('../helper/APIError');

const getUserDetails = async (req, res, next) => {
  try {
    const userResult = await db.getUserById(req.params.userId);

    if (!userResult) {
      throw {
        message: `User with id ${req.params.userId} doesnt exist`,
        statusCode: httpStatus.NOT_FOUND,
      };
    }

    const user = db.parseQuery(userResult);

    const returnUser = { ...user, role: user.role.role };

    res.json({
      user: returnUser,
    });
  } catch (err) {
    logger.info(`Failed to get user details, error: ${err.message}`);

    return next(
      new APIError(
        `User with id ${req.params.userId} doesnt exist`,
        err.statusCode,
        true
      )
    );
  }
};

module.exports = {
  getUserDetails,
};
