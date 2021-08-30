/**
 * Function checks to see if an email already exists within the userDatabase
 * @param {req.body.email} reqEmail 
 * @param {object} userDatabase 
 * @returns boolean
 */
const emailChecker = (reqEmail, userDatabase) => {
  for(const userData of Object.values(userDatabase)) {
    if(userData["email"] === reqEmail) return true
  }
};

module.exports = emailChecker;