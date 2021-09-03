# TinyApp Project
###### version 1.0.0
---
###### A [Lighthouse Labs](https://www.lighthouselabs.ca/) project by [Brett Bilyk](https://github.com/bilykb)
###### <span style="color:red">**Beware:  This code was created while studying Web Development at Lighthouse Labs and is _not_ intended for use outside of a learning scenario. Use at your own risk.**</span>

---
## What is TinyApp?
---

>TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

---
## Summary
---

>This repository contains all the ejs and javascript files created over the course of the tinyApp project while studying at [Lighthouse Labs](https://www.lighthouselabs.ca/). 

---
## Dependencies
---

| Libraries |  |
|--- | --- |
| Node.js | Express |
| EJS | bcrypt |
| body-parser | cookie-session |

---
## Getting Started
---
> Install all dependencies (using the `npm install` command)
> Run the development web server using the `node express_server.js` command

---
## Final Product
---

#### Login Page
<img width="1432" alt="Login page" src="https://user-images.githubusercontent.com/18246168/132057274-64d47503-66fe-4c3a-8341-172a1157fa7f.png">

#### URL page
<img width="1436" alt="My URL page" src="https://user-images.githubusercontent.com/18246168/132057344-6c99c482-8d9c-4426-a51f-b4ab080f4ee8.png">


---
## Table of Contents
---
| Helper Functions | EJS Views | EJS Parials |
| --- | --- | --- |
| [verifyLinksWithId()](#links) | [login.ejs](#login) | [_emailAndPasswordForm.ejs](#form) |
| [authenticator()](#auth) | [register.ejs](#register) | [_header.ejs](#header) |
| [generateRandomString()](#random) | [urls_index.ejs](#index) |
| | [urls_new.ejs](#new) | |
| | [urls_show.ejs](#show) | |

---
## Contents
---

### Helper Functions

#### <a name="links">[verifyLinksWithId()](https://github.com/bilykb/tinyapp/blob/master/helper.js)</a>
 > Function checks to see if a ID exists within the database; Returns a list of short URLs associated with a user

 
#### <a name="auth">[authenticator()](https://github.com/bilykb/tinyapp/blob/master/helper.js)</a>
> Function which authenticates user data, and returns the user.id if it exists


#### <a name="random">[generateRandomString()](https://github.com/bilykb/tinyapp/blob/master/helper.js)</a>
> generateRandomString() generates a random 6 digit string

---
### EJS Views

#### <a name="login">[login.ejs](https://github.com/bilykb/tinyapp/blob/master/views/login.ejs)</a>
 > Login page for tinyApp

 
### <a name="register">[register.ejs](https://github.com/bilykb/tinyapp/blob/master/views/register.ejs)</a>
> Register page for tinyApp

### <a name="index">[urls_index.ejs](https://github.com/bilykb/tinyapp/blob/master/views/urls_index.ejs)</a>
> index page which lists all urls associated with a user

### <a name="new">[urls_new.ejs](https://github.com/bilykb/tinyapp/blob/master/views/urls_new.ejs)</a>
> new page where a new tinyURL is created

### <a name="show">[urls_show.ejs](https://github.com/bilykb/tinyapp/blob/master/views/urls_show.ejs)</a>
> Information and edit page for individual URLs

---
### EJS Partials

#### <a name="form">[_emailAndPasswordForm.ejs](https://github.com/bilykb/tinyapp/blob/master/views/partials/_emailAndPasswordForm.ejs)</a>
 > partial with an email and password form.  Used in register.ejs and login.ejs

 
#### <a name="header">[_header.ejs](https://github.com/bilykb/tinyapp/blob/master/views/partials/_header.ejs)</a>
> partial with header HTML.  Used in all views.
