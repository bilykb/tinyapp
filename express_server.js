const express = require('express');
const app = express();
const PORT = 8080; // default port 8080

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt')
const { authenticator, idChecker, generateRandomString } = require('./helper');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession( {
  name: "session",
  keys: ["lighthouse", "labs"],
  maxAge: 24 * 60 * 60 * 7000
}));

const urlDatabase = {
  
};

const users = { 
  
};

app.get('/login', (req, res) => {
  const userID = req.session.user_id;
  const templateVars = { user: users[userID] }
  if(req.session.user_id) {
    res.redirect('/urls')
  }
  res.render('login', templateVars);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const verifyAccount = authenticator(users, email, password);
  //verifyAccount returns the user's user_id
  
  if(verifyAccount) {
    req.session.user_id = verifyAccount;
    res.redirect("/urls");
  } else {
    res.status(403).send('Sorry, please verify your name and password!');
  }
});

app.post('/logout', (req, res) => {
req.session = null  
res.redirect("/login");
});

app.get('/register', (req, res) => {
  const userID = req.session.user_id;
  const templateVars = { user: users[userID] };
  res.render('register', templateVars)
});

app.post('/register', (req, res) => {
  const { email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const emailVerifyer = authenticator(users, email, null)
  
  if(!email.length || !password.length) {
    return res.status(400).send("Error code: 400\nPOST failed");
  } else if (emailVerifyer){
    return res.status(400).send("Error code: 400\nThis email already exists");
  };
  
  req.session.user_id = generateRandomString();
  const newRandomID = req.session.user_id;
  users[newRandomID] = {
    id: newRandomID,
    email: email,
    password: hashedPassword,
    rememberMe: undefined
  }
  res.redirect('/urls');
});

app.get('/urls', (req, res) => {
  const userID = req.session.user_id;
  const verifiedLinks = idChecker(userID, urlDatabase)
  const templateVars = { urls: urlDatabase, shortUrlArray: verifiedLinks, user: users[userID] };
  if(!userID) {
    return res.redirect("/login");
  }
  res.render('urls_index', templateVars);
});

app.post('/urls', (req, res) => {
  const newRandomID = generateRandomString();
  urlDatabase[newRandomID] = { longURL: req.body.longURL, userID: req.session.user_id }
  res.redirect(`/urls/${newRandomID}`);
});

app.get('/urls/new', (req, res) => {
  const userID = req.session.user_id;
  const templateVars = { user: users[userID] };
  if(!templateVars.user) {
    return res.redirect("/login");
  }
  res.render('urls_new', templateVars);
});


app.post('/urls/:shortURL', (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = req.params.shortURL;
  const userId = req.session.user_id;
  const verifiedLinks = idChecker(userId, urlDatabase);
  if(verifiedLinks.includes(shortURL)) {
    urlDatabase[shortURL] = { longURL: longURL, userID: userId }
  }
  res.redirect(`/urls`);
});


app.get('/urls/:shortURL', (req, res) => {
  const userId = req.session.user_id;
  const shortURLkey = req.params.shortURL;
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[shortURLkey].longURL, user: users[userId] };

  res.render('urls_show', templateVars);
});

app.post('/urls/:shortURL/delete', (req, res) => {
  const userId = req.session.user_id;
  const verifiedLinks = idChecker(userId, urlDatabase);
  if(verifiedLinks.includes(req.params.shortURL)) {
    delete urlDatabase[req.params.shortURL];
  }
  res.redirect("/urls");        
});

          app.get('/u/:shortURL', (req, res) => {
  const shortURLkey = req.params.shortURL;
  const longURL = urlDatabase[shortURLkey].longURL;
  if (!longURL) {
    return res.send("Error, please check your shortened URL");
 }
res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});