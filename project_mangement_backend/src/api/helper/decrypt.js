const bcrypt = require('bcrypt');

module.exports = (plainTextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, hash, (error, result) => {
      if (error) {
        reject({
          msg: error,
        });
      } else {
        resolve(result);
      }
    });
  });
};
