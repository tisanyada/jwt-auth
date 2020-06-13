# JWT-AUTH

## About
    This application is a simple json api bioler plate that uses the json web token (jwt) for
    authentication.
## How it works
    A user is required to create an account (register) and hence can now proceed to login. On
    if validation is passed a token is generated for the user which will be used for authenticating
    the user on protected routes.
## Routes
    /api/auth/signup -  user registration route
        Type: POST
        Requirements
            username: String,
            email: String,
            password: String

    /api/auth/login -   user login route
        Type: POST
        Requirements
            username: String,
            password: String

    Protected Routes
        /api/users -    returns current logged user's details
            Type: GET
            Requirements
                user token

        /api/profile -  get current user's profile if any
            Type: GET
            Requirements
                user token

        /api/profile -  create new profile for current user
            Type: POST
            Requirements
                user token
                user: current user's id
                fullname: String
                email: String
                phone: String
                address: String
                dateofbirth: Date
                nationality: String
                avatar: String(image path)
            Note: all fields are in this route

        /api/profile -  update current user's profile
            Type: POST
            Requirements
                fullname: String
                email: String
                phone: String
                address: String
                dateofbirth: Date
                nationality: String
                avatar: String(image path)
            Note: only fields required for update are to be filled in this route else old profile
            data will be maintained in this route

## How to Start this api
    Requirements
        Mongodb database 🗄
        nodejs
        postman
    Starting the application
        type `npm run server` in the terminal to start