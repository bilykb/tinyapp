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
//   const newRandomSixValues = []
//   const lettersAndNumbers = {
//     0: "1234567890",
//     1: "abcdefghijklmnopqrstuvwxyz"
//   }
//   for (let i = 0; i < 6; i++) {
//     let letterOrNumberkey = Math.round(Math.random()).toString();
//     let randomCharacterInKey = Math.round(Math.random() * (lettersAndNumbers[letterOrNumberkey].length - 1))
//     // Math.random() used to generate a random key value, as well as a random index number, which is pushed to newRandomSixValues to generate a random 6 character string
//     newRandomSixValues.push(lettersAndNumbers[letterOrNumberkey][randomCharacterInKey])
//   }
// return newRandomSixValues.join("");
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
  console.log(req.body);
  res.send('Ok');
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