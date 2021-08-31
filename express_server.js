const express = require('express');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authenticator, passwordChecker, emailChecker } = require('./authenticator');

app.set('view engine', 'ejs');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur",
    rememberMe: undefined
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
    rememberMe: undefined
  }
};
console.log(users)

const generateRandomString = () => {
// returns six random numbers in base 36, converted to a string representation of their number
return Math.random().toString(36).substr(2, 6);
};

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/login', (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = { user: users[userID] }
  res.render('login', templateVars)
});

app.post('/login', (req, res) => {
  const emailEntered = req.body.email;
  const passwordEntered = req.body.password;
  const verifiedEmail = authenticator(users, emailEntered, emailChecker);
  const verifiedPassword = authenticator(users, passwordEntered, passwordChecker);

  if(verifiedEmail && verifiedPassword) {
    res.cookie("user_id", verifiedEmail);
    res.redirect("/urls");
  } else {
    res.status(403).send('Sorry, please verify your name and password!');
  }
});

app.post('/logout', (req, res) => {
    res.clearCookie('user_id', req.cookies.user_id)
  res.redirect("/urls");
});

app.get('/register', (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = { user: users[userID] };
  res.render('register', templateVars)
});

app.post('/register', (req, res) => {
  const newRandomID = generateRandomString()
  const newEmail = req.body.email;
  const newPassword = req.body.password
  const emailVerifyer = authenticator(users, newEmail, emailChecker)


  if(!newEmail.length || !newPassword.length) {
    return res.status(400).send("Error code: 400\nPOST failed")
  } else if (emailVerifyer){
    return res.status(400).send("Error code: 400\nThis email already exists")
  }
  users[newRandomID] = {
    id: newRandomID,
    email: newEmail,
    password: newPassword,
    rememberMe: undefined
  }
  res.cookie("user_id", newRandomID)
  res.redirect('/urls');
});

app.get('/urls', (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = { urls: urlDatabase, user: users[userID] };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = { user: users[userID] };
  res.render('urls_new', templateVars);
});

app.post('/urls', (req, res) => {
  newRandomID = generateRandomString()
  urlDatabase[newRandomID] = req.body.longURL
  res.redirect(`/urls/${newRandomID}`);
});

app.post('/urls/:shortURL', (req, res) => {
  const shortURLkey = req.params.shortURL
  urlDatabase[shortURLkey] = req.body.longURL
  res.redirect(`/urls/${shortURLkey}`);
});


app.get('/urls/:shortURL', (req, res) => {
  const userID = req.cookies.user_id
  const shortURLkey = req.params.shortURL
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[shortURLkey], user: users[userID] }
  if(!urlDatabase[req.params.shortURL]) {
    return res.send("Error, please check your shorted URL");
  }
  res.render('urls_show', templateVars);
});

app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls")
});

app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  if (!longURL) {
    return res.send("Error, please check your shortened URL");
 }
res.redirect(longURL);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});