const bcrypt = require('bcrypt');

/**
 * Function checks to see if a ID exists within the database; Returns a list of short URLs associated with a user
 * @param {string} userId user.session.id - session cookie
 * @param {object} shortUrlDatabase object where short URLs and associated user IDs are stored
 * @returns {array} Array of verified shortURL links
 */

const verifyLinksWithId = (userId, shortUrlDatabase) => {
  const verifiedLinks = [];
  for (let shortUrl in shortUrlDatabase) {
    if (userId === shortUrlDatabase[shortUrl].userID) {
      verifiedLinks.push(shortUrl);
    }
  }
  return verifiedLinks;
};

/**
 * Function which authenticates user data, and returns the user.id if it exists
 * @param {object} userDatabase
 * @param {sting} reqEmail req.body.${key}
 * @param {string}} reqPassword req.body.${key
 * @returns user.id
 */

const authenticator = (userDatabase, reqEmail, reqPassword) => {

  for (let userData in userDatabase) {
    const user = userDatabase[userData];
    const userInfo = userDatabase[user.id];

    if (user.email === reqEmail.trim() && reqPassword === null) {
      return true;
    } else if (userInfo.email === reqEmail.trim() && bcrypt.compareSync(reqPassword.trim(), user.password)) {
      return user.id;
    }
  }
};


/**
 * generateRandomString() generates a random 6 digit string
 * @returns random string of numbers and letters
 */

const generateRandomString = () => {
  // returns six random numbers in base 36, converted to a string representation of their number
  return Math.random().toString(36).substr(2, 6);
};

module.exports = {
  generateRandomString,
  authenticator,
  verifyLinksWithId
};