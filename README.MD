This repository was forked from "https://github.com/john-smilga/node-express-course"

Youtube link is "https://www.youtube.com/watch?v=qwfE7fSVaZM&t=10550s"

This repo is just for educational purposes - node.js/express.js

To install npm packages, open the terminal in project folder and type the command "npm install"

If packages are outdated or broken, you can delete the existing dependencies section in package.json and install them one by one like this: "npm install ", example: "npm install express"

!!! Do not forget to set up the .env file !!!

In the .env file, you need to keep your secrets which is db_connection_string, jwt_secret, jwt_lifetime and port. Example in following line:

MONGO_URI=connection_string

JWT_SECRET=your_secret

JWT_LIFETIME=your_jwt_lifetime // exp: 10d is equal to 10 days.

PORT=3000 // in development


/**************************************************************************************************************************/


#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
