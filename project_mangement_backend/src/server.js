const app = require('./app');
const logger = require('./logger');

app.listen(process.env.SERVER_PORT, () => {
  logger.info('listening on port http://localhost:' + process.env.SERVER_PORT);
});
