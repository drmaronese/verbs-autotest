# Verbs-autotest

Github repository of a little web application for self learning of english irregular verbs.

This web application views a page with a grid of english irregular verbs in which the user insert the forms of verbs missed. By pressing the "Check" button all inserted verbs are checked and corrected if wrong, and a score is showed.

# Application description

The application is composed of a client part (front-end) and a server part (back-end).<br/>
The front-end is accessible through a browser and makes use of two REST APIs of the back-end.<br/>
Either front-end and back-end are made with Node.js but without the use of docker images.

The back-end read irregular verbs from a MySQL database table.<br/>
For application local execution in this project is present a dockerized MySQL database.<br/>
When launching the docker container, the database and table are automatically created and the irregular verbs are imported in the table from the CSV file [verbs-autotest/server/docker/irregular-verbs.csv](https://github.com/drmaronese/verbs-autotest/blob/main/server/docker/irregular-verbs.csv).

## Techonologies

### Server

- NodeJS
- Typescript
- Express
- Docker
- MySQL

### Client

- NodeJS
- Javascript
- React

# Build and run locally

For local execution run both backend server and frontend client:

```
# SERVER
cd verbs-autotest/server
npm run db-local-docker
npn run build
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

# CSV file containing the irregular verbs imported on MySQL container startup

[verbs-autotest/server/docker/irregular-verbs.csv](https://github.com/drmaronese/verbs-autotest/blob/main/server/docker/irregular-verbs.csv)
