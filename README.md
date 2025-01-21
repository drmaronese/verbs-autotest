# Verbs-autotest

Github repository of a little web application for learning of english irregular verbs.

This web application view a grid of english irregular verbs in which the user insert the forms of verbs missed. By pressing the "Check" button all inserted verbs are checked and corrected if wrong.

Currently the verbs are archived in a MySQL database on the cloud and in this project isn't present a dockerized MySQL.

## Techonologies

### Server

- NodeJS
- Typescript
- Express
- MySQL

### Client

- NodeJS
- Javascript
- React

# Build and run

For local execution run both backend server and frontend client:

```
# SERVER
cd verbs-autotest/server
npm start
```

```
# CLIENT
cd verbs-autotest/client
npm start
```

The client `npm start` automatically open the default browser on the application home page. If that don't happen open this link:

http://localhost:3000/

# Server test

To launch server unit test:

```
cd verbs-autotest/server
npm test
```

# Postman collection to call server REST APIs

It is possibile import this collection in postman that have 3 requests to direct call the 3 server REST APIs

[verbs-autotest/server/test/postman/Verbs-autotest.postman_collection.json](https://github.com/drmaronese/verbs-autotest/blob/main/server/test/postman/Verbs-autotest.postman_collection.json)

# Server properties file

[verbs-autotest/server/config/application.properties](https://github.com/drmaronese/verbs-autotest/blob/main/server/config/application.properties)
