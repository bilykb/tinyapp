const express = require('express');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const generateRandomString = () => {
// returns six random numbers in base 36, converted to a string representation of their number
return Math.random().toString(36).substr(2, 6);
}

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new')
});

app.post('/urls', (req, res) => {
  newSixDigits = generateRandomString()
  urlDatabase[newSixDigits] = req.body.longURL
  res.redirect('/urls');
});

app.get('/urls/:shortURL', (req, res) => {
  const shortURLkey = req.params.shortURL
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[shortURLkey]  }
  res.render('urls_show', templateVars)
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});