const Joi = require('joi');

module.exports = {
  // POST /api/auth/register
  register: {
    body: Joi.object({
      firstName: Joi.string().required(),
      middleName: Joi.string().allow('').optional(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5),
      role: Joi.string().required(),
    }),
  },

  // POST /api/auth/login
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },

  addUserToProject: {
    body: {
      userEmail: Joi.string().email().required(),
    },
  },

  changePassword: {
    body: Joi.object({
      password: Joi.string().required().min(5),
    }),
  },

  createProject: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow('').optional(),
      projectManagerEmail: Joi.string().email().required(),
    }),
  },

  createTask: {
    body: Joi.object({
      title: Joi.string().required().max(99),
      assigneeEmail: Joi.string().email().optional(),
      deadline: Joi.date().iso().optional(),
      description: Joi.string().max(999),
    }),
  },
};
