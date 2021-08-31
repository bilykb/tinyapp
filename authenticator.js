
/**
 * Function checks to see if an email already exists within the userDatabase; Helper function for authenticator
 * @param {object} userData;
 * @param {req.body.email} reqEmail;
 * @returns boolean;
 */
const emailChecker = (userData, reqEmail) => {
  return userData["email"] === reqEmail
};

/**
 * Function checks to see if a password already exists within the userDatabase; Helper function for authenticator
 * @param {object} userData 
 * @param {req.body.password} reqPassword 
 * @returns {object} userData
 */
const passwordChecker = (userData, reqPassword) => {
  if(userData["password"] === reqPassword) {
    return userData.id
  }
};

/**
 * Function checks to see if a ID exists within the database; Helper function for authenticator
 * @param {object} userDatabase object where user data is stored
 * @param {object} shortUrlDatabase object where short URLs and associated user IDs are stored
 * @returns {boolean} boolean for whethere there is a match
 */
const idChecker = (userDatabase, shortUrlDatabase) => {
  for(let shortUrl in shortUrlDatabase) {
    if(userDatabase["userID"] === shortUrl["userID"]) {
      return shortUrl
    }
  }
};

/**
 * Function which authenticates various user data using three helper functions: emailChecker, passwordChecker, and idChecker
 * @param {object} userDatabase 
 * @param {req.body.${key}} comparisonValue 
 * @param {cbFuntion} authCb 
 * @returns 
 */

const authenticator = (userDatabase, comparisonValue, authCb) => {

  for(let userData in userDatabase) {
    const user = userDatabase[userData]
     if(authCb(user, comparisonValue)) {
       return authCb(user, comparisonValue)
     }
  }
  return false;
};


module.exports = { 
  authenticator,
  passwordChecker,
  emailChecker,
  idChecker
}