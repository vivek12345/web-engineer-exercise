- [Building a developer portal](#building-a-developer-portal)
  - [Missing features](#missing-features)
  - [Minimum requirements](#minimum-requirements)
  - [Running the app](#running-the-app)
- [API](#api)
  - [Authentication](#authentication)
  - [Obtaining an access token](#obtaining-an-access-token)
  - [Apps and their users](#apps-and-their-users)
  - [Example calls and data model](#example-calls-and-data-model)

# Building a developer portal

Your task is to prioritise and resolve [the list of missing features](#missing-features) that are required to finish off the Developer portal application.

The unfinished application has been built with the same technologies that we use at Monzo to build our internal tooling. We are using [React](https://reactjs.org/) to build our components and [Redux](https://redux.js.org/) for the state management. The code is bundled using [Webpack](https://webpack.js.org) and transformed using [Babel](https://babeljs.io/).

We will use the exercise as a basis to discuss some aspects of web frontend development in more detail once it has been submitted.

Please capture any features that you don’t have time to implement and / or any ways you would improve the app given more time.

## Missing features

- Redirecting logged out users to the sign in form when they try to navigate to one of the routes
- Style up the application
- Error messaging on the form when submitted with incorrect data
- Paginate the list of users
- Build the app editing functionality
- Make sure all functionality is covered by an E2E test and those tests pass
- Make the app more performant
- Convert the components into re-usable components
- Implement coding standards e.g. ESLint, Prettier
- Add type safety to the application e.g. Flow / Typescript
- Web accessibility best practices
- Update any out-of-date packages
- Appropriate metadata for each route e.g. page title, page metadata

## Minimum requirements:

- The user can log into the portal using email and password
- The user should go through the authentication process again when the token has expired
- The user can list and update their “apps”
- The user can paginate through a list of “users” associated with an “app”

# Running the app

**Clone the repository**

`git clone {REPOSITORY}`

**Install the required NPM packages**:

`npm install`

**Start the application**:

`npm start`

**Test the application**:

You will need to start the application first, then run `npm test` in a new terminal tab. This is because [Puppeteer](https://pptr.dev/) needs a running application to test against.

When running the tests, you should get one failing test, one passing test and a test that needs to written.

![Failing tests](./failing-test-output.png)

# API

We've put up a mock API server at https://guarded-thicket-22918.herokuapp.com/.

## Authentication

All API requests (except for logins) are authenticated by passing an access token in via the `"Authorization"` HTTP header. If the token is missing, invalid or expired the API returns `401 Unauthorized`.

Access tokens expire after a default time of 30m. You can override this during login.

You can check whether or not an access token is valid and not expired by hitting `GET /` with the `Authorization` header set.

## Obtaining an access token

You obtain an access token by making an `application/JSON` POST request to `/login` with the following properties in the body:

- `email`: You can put whatever you want here. Each email gets its own little database of mock data.
- `password`: If the password is `hunter2`, the login will succeed. Otherwise it will fail with status 401.
- `expiry`: Optionally, you can pass in an expiration timespan in rauchg/ms format (e.g. `60s`, `10h`, etc). This is useful for testing your re-authentication code.

For example:

```
# Obtain an access token
curl -H "Content-Type: application/json" -X POST -d '{"email":"mondo@example.com","password":"hunter2"}' https://guarded-thicket-22918.herokuapp.com/login
# Status: 200
# {
#   "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1vbmRvQGV4YW1wbGUuY29tIiwiaWF0IjoxNDU0NTMzMDc4LCJleH# AiOjE0NTQ1MzQ4Nzh9.9nnNyJaR-oZeOjlGFUrimSuLzRUJ3kfzuxbQwTuODBg"
# }

# Test your access token
curl -H "Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1vbmRvQGV4YW1wbGUuY29tIiwiaWF0IjoxNDU0NTMzMDc4LCJleHAiOjE0NTQ1MzQ4Nzh9.9nnNyJaR-oZeOjlGFUrimSuLzRUJ3kfzuxbQwTuODBg" https://guarded-thicket-22918.herokuapp.com/
# Status: 401
# {
#   "message": "The API is alive and your access token is valid :)",
#   "token": {
#     "email": "mondo@example.com",
#     "iat": 1454533078,
#     "exp": 1454534878
#   }
# }

# Login failure
curl -H "Content-Type: application/json" -X POST -d '{"email":"mondo@example.com","password":"not hunter2"}' https://guarded-thicket-22918.herokuapp.com/login
# Status: 200
# {
#   "error": "Cannot log in with the given email and password."
# }

# Get a short-lived access token to test re-authentication
curl -H "Content-Type: application/json" -X POST -d '{"email":"mondo@example.com","password":"hunter2","expiry":"10s"}' https://guarded-thicket-22918.herokuapp.com/login
```

## Apps and their users

The developer portal deals with two domain models: `apps` and their `users`. The API has three endpoints:

```
GET /apps returns a list of all apps. This list doesn't include the apps' users.
PUT /apps/$appId updates an app and returns the updated app. You can change the name and logo properties.
GET /apps/$appId/users?limit=25&offset=0 returns a list of users for a given app. This list can be quite long so you'll need to implement paging using the limit and offset parameters. The API doesn't support returning more than 25 results at once.
```

## Example calls and data model:

```
# List all apps (after obtaining an access token as described above)
curl -H "Authorization: $token" https://guarded-thicket-22918.herokuapp.com/apps
# {
#   "apps": [
#     {
#       "id": "ebdb9723-39ba-4157-9d36-aa483581aa13",
#       "name": "Intelligent Steel Car",
#       "created": "2016-01-25T03:57:53.873Z",
#       "logo": "http://lorempixel.com/400/400/animals"
#     },
#     // and so on...
#   ]
# }

# Update an app
curl -H "Content-Type: application/json" -H "Authorization: $token" -X PUT -d '{"name":"New Name"}' https://guarded-thicket-22918.herokuapp.com/apps/ebdb9723-39ba-4157-9d36-aa483581aa13
# {
#   "app": {
#     "id": "ebdb9723-39ba-4157-9d36-aa483581aa13",
#     "name": "New Name",
#     "created": "2016-01-25T03:57:53.873Z",
#     "logo": "http://lorempixel.com/400/400/animals"
#   }
# }

# List users of an app (first page of 25 users)
curl -H "Authorization: $token" https://guarded-thicket-22918.herokuapp.com/apps/ebdb9723-39ba-4157-9d36-aa483581aa13/users
# {
#   "users": [
#     {
#       "id": "6b09a204-0653-4303-9370-222b06c478a8",
#       "name": "Madeline Runte",
#       "email": "Viviane.Beatty58@yahoo.com",
#       "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/chrisstumph/128.jpg"
#     }
#     // and so on...
#   ]
# }

# List users of an app (second page of 25 users)
curl -H "Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1vbmRvQGV4YW1wbGUuY29tIiwiaWF0IjoxNDU0NTM1MDg4LCJleHAiOjE0NTQ1MzY4ODh9.7ehzJgS_OojT37j076I05l1ZNKc62AKOpL-aeqR0GkM" https://guarded-thicket-22918.herokuapp.com/apps/ebdb9723-39ba-4157-9d36-aa483581aa13/users?offset=25
```
