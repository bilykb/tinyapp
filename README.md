# TinyApp Project
###### version 1.0.0
---
###### A [Lighthouse Labs](https://www.lighthouselabs.ca/) project by [Brett Bilyk](https://github.com/bilykb)
###### <span style="color:red">**Beware:  This code was created while studying Web Development at Lighthouse Labs and is _not_ intended for use outside of a learning scenario. Use at your own risk.**</span>

---
## What is Snek Client?
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
<img width="1432" alt="Login page" src="https://user-images.githubusercontent.com/18246168/132057274-64d47503-66fe-4c3a-8341-172a1157fa7f.png">

<img width="1436" alt="My URL page" src="https://user-images.githubusercontent.com/18246168/132057344-6c99c482-8d9c-4426-a51f-b4ab080f4ee8.png">


---
## Table of Contents: Helper Functions
---

| [verifyLinksWithId()](#helper) | [authenticator()](#helper) | [generateRandomString()](#helper) |

---
## Contents: Helper Functions
---

### <a name="helper">[verifyLinksWithId()](https://github.com/bilykb/tinyapp/blob/master/helper.js)</a>
 > Function checks to see if a ID exists within the database; Returns a list of short URLs associated with a user

 
### <a name="helper">[authenticator()](https://github.com/bilykb/tinyapp/blob/master/helper.js)</a>
> Function which authenticates user data, and returns the user.id if it exists


### <a name="helper">[input.js](https://github.com/bilykb/tinyapp/blob/master/helper.js)</a>
> generateRandomString() generates a random 6 digit string
