const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const methodOverride = require('method-override');
const expressValidation = require('express-validation');

require('./config');
const routes = require('./api');
const APIError = require('./api/helper/APIError');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(methodOverride());

app.use(helmet());

app.use(cors());

// health check
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]

    const error = new APIError(err.details[0], httpStatus.BAD_REQUEST, true);

    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);

    return next(apiError);
  }

  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);

  return next(err);
});

// error handler, send stacktrace only during development
app.use((
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: process.env.env === 'development' ? err.stack : {},
  })
);

module.exports = app;
