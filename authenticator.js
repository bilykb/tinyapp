
/**
 * Function checks to see if an email already exists within the userDatabase; Helper function for authenticator
 * @param {object} userData;
 * @param {req.body.email} reqEmail;
 * @returns boolean;
 */
const emailChecker = (userData, reqEmail) => {
  return userData["email"] === reqEmail;
};

/**
 * Function checks to see if a password already exists within the userDatabase; Helper function for authenticator
 * @param {object} userData 
 * @param {req.body.password} reqPassword 
 * @returns {object} userData
 */
const passwordChecker = (userData, reqPassword) => {
  return userData["password"] === reqPassword
};

/**
 * Function which authenticates a user using two helper functions: emailChecker or passwordChecker
 * @param {object} userDatabase 
 * @param {req.body.${key}} userValue 
 * @param {cbFuntion} authCb 
 * @returns 
 */
const authenticator = (userDatabase, userValue, authCb) => {

  for(let userData in userDatabase) {
    const user = userDatabase[userData]
     if(authCb(user, userValue)) {
       return user.id
     }
  }
  return false;
};


module.exports = { 
  authenticator,
  passwordChecker,
  emailChecker
}