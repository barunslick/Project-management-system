const bcrypt = require('bcrypt');

module.exports = (plainTextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(
      plainTextPassword,
      Number(process.env.ENCYRPT_SALT_ROUNDS),
      (error, hash) => {
        if (error) {
          reject({
            msg: error,
          });
        } else {
          resolve({
            hashedPassword: hash,
          });
        }
      }
    );
  });
};
