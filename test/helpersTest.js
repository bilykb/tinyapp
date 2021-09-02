const { assert, expect } = require('chai');
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

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "userRandomID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "userRandomID" }
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
  it('it should return the user.id if the login email and password match the user in the database', function() {
    const user = authenticator(testUsers, "user@example.com", "purple-monkey-dinosaur");
    const expectedOutput = "userRandomID";

    assert.equal(user, expectedOutput);
  });
  it('should return undefined if the login email and password dont match the user in the database', function() {
    const user = authenticator(testUsers, "user@example.com", "red-monkey-dinosaur");
    const expectedOutput = undefined;

    assert.isUndefined(user, expectedOutput);
  });
  it('should return undefined when logging in the email of one user, and password of another user', function() {
    const user = authenticator(testUsers, "user@example.com", "dishwasher-funk");
    const expectedOutput = undefined;

    assert.isUndefined(user, expectedOutput);
  });
  it('should return the user-id of the user despite additional white space', function() {
    const user = authenticator(testUsers, "   user2@example.com   ", "   dishwasher-funk   ");
    const expectedOutput = "user2RandomID";

    assert.equal(user, expectedOutput);
  });
  it('should return undefined when logging-in if email is an empty string', function() {
    const user = authenticator(testUsers, "", "   dishwasher-funk   ");
    const expectedOutput = undefined;

    assert.isUndefined(user, expectedOutput)
  });
  it('should return undefined when logging in if password is an empty string', function() {
    const user = authenticator(testUsers, "   user2@example.com   ", "");
    const expectedOutput = undefined;

    assert.isUndefined(user, expectedOutput);
  });
  it('should return undefined if both email and password are empty strings', function() {
    const user = authenticator(testUsers, "", "");
    const expectedOutput = undefined;

    assert.isUndefined(user, expectedOutput);
  });
});

describe('generateRandomString', function() {
  it('should generate string', function() {
    const randomString = generateRandomString();
    const expectedOutput = "string";

    assert.typeOf(randomString, expectedOutput, "is a string")
  });
  it('should generate a string with a length of six', function() {
    const randomString = generateRandomString();
    const expectedOutput = 6

    assert.equal(randomString.length, expectedOutput);
  });
  it('should generate a random distinct string each time', function() {
    const randomString1 = generateRandomString();
    const randomString2 = generateRandomString();
    const randomString3 = generateRandomString();

    assert.notEqual(randomString1, randomString2);
    assert.notEqual(randomString2, randomString3);
  });
});

describe('idChecker', function() {
  it('should return an empty array if a cookie has not been set with cookie-session', function() {
    const verifiedLinks = idChecker(undefined, urlDatabase);
    const expectedOutput = [];

    assert.deepEqual(verifiedLinks, expectedOutput);
  });
  it('should return an empty array if a user has not assigned any shortURLs to their account', function() {
    const verifiedLinks = idChecker("user2RandomID", urlDatabase);
    const expectedOutput = [];

    assert.deepEqual(verifiedLinks, expectedOutput);
  });
  it('should return an array of two urls associated with a specific user', function() {
    const verifiedLinks = idChecker("userRandomID", urlDatabase);
    const expectedOutput = ["b6UTxQ", "i3BoGr"];

    assert.deepEqual(verifiedLinks, expectedOutput);
  });
});