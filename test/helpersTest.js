const { assert } = require('chai');
const { generateRandomString, authenticator, idChecker } = require('../helper');
const bcrypt = require('bcrypt');

const hashedPassword1 = bcrypt.hashSync("purple-monkey-dinosaur", 10);
const hashedPassword2 = bcrypt.hashSync("dishwasher-funk", 10);

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: hashedPassword1
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: hashedPassword2
  }
};

describe('authenticator', function() {
  it('should return true if a email exists in the database, and password is null', function() {
    const user = authenticator(testUsers, "user@example.com", null)
    const expectedOutput = "true";

    assert.isTrue(user, expectedOutput);
  });
  it('should return undefined if email does not exist in the data base, and password is null', function() {
    const user = authenticator(testUsers, "123@email.com", null);
    const expectedOutput = undefined;

    assert.isUndefined(user, expectedOutput);
  });
});