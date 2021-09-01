const express = require('express');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authenticator, idChecker } = require('./authenticator');

app.set('view engine', 'ejs');

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

const users = { 
  "aJ48lW": {
    id: "aJ48lW", 
    email: "user@example.com", 
    password: "1",
    rememberMe: undefined
  },
 "b23456": {
    id: "b23456",
    email: "user2@example.com",
    password: "2",
    rememberMe: undefined
  }
};

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
  const verifyAccount = authenticator(users, emailEntered, passwordEntered);
  //verifyAccount returns the user's user_id
  if(verifyAccount) {
    res.cookie("user_id", verifyAccount);
    res.redirect("/urls");
  } else {
    res.status(403).send('Sorry, please verify your name and password!');
  }
});

app.post('/logout', (req, res) => {
    res.clearCookie('user_id', req.cookies.user_id)
  res.redirect("/login");
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
  const emailVerifyer = authenticator(users, newEmail, newPassword)


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
  const verifiedLinks = idChecker(userID, urlDatabase)
  const templateVars = { urls: urlDatabase, shortUrlArray: verifiedLinks, user: users[userID] };
  if(!userID) {
    return res.redirect("/login");
  }
  res.render('urls_index', templateVars);
});

app.post('/urls', (req, res) => {
  newRandomID = generateRandomString()
  urlDatabase[newRandomID] = { longURL: req.body.longURL, userID: req.cookies.user_id }
  res.redirect(`/urls/${newRandomID}`);
});

app.get('/urls/new', (req, res) => {
  const userID = req.cookies.user_id
  const templateVars = { user: users[userID] };
  if(!templateVars.user) {
    return res.redirect("/login")
  }
  res.render('urls_new', templateVars);
});


app.post('/urls/:shortURL', (req, res) => {
  const shortURLkey = req.params.shortURL
  urlDatabase[shortURLkey] = req.body.longURL
  res.redirect(`/urls/${shortURLkey}`);
});


app.get('/urls/:shortURL', (req, res) => {
  const userID = req.cookies.user_id
  const shortURLkey = req.params.shortURL
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[shortURLkey].longURL, user: users[userID] }
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
  const shortURLkey = req.params.shortURL
  const longURL = urlDatabase[shortURLkey].longURL
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