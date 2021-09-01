

/**
 * Function checks to see if a ID exists within the database; Helper function for authenticator
 * @param {string} userId userId information
 * @param {object} shortUrlDatabase object where short URLs and associated user IDs are stored
 * @returns {boolean} boolean for whethere there is a match
 */

const idChecker = (userId, shortUrlDatabase) => {
  const verifiedLinks = [];
  for(let shortUrl in shortUrlDatabase) {
    if(userId === shortUrlDatabase[shortUrl].userID) {
      verifiedLinks.push(shortUrl);
    }
  }
  return verifiedLinks
};

/**
 * Function which authenticates various user data using three helper functions: emailChecker, passwordChecker, and idChecker
 * @param {object} userDatabase 
 * @param {req.body.${key}} reqEmail 
 * @param {string} reqPassword 
 * @returns 
 */

const authenticator = (userDatabase, reqEmail, reqPassword) => {
  
  for(let userData in userDatabase) {
    const user = userDatabase[userData];
    const userInfo = userDatabase[user.id];

    if(user.email === reqEmail) {
      if(userInfo.email === reqEmail && userInfo.password === reqPassword) {
        return user.id;
      }
    }
  }
};

module.exports = { 
  authenticator,
  idChecker
}