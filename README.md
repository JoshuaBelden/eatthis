# Eat This!

Eat This! is a social recipe application that focuses on sharing recipes with friends and streamlining the grocery shopping process.

## Getting Started

### Install Mongo

```
docker pull mongo
docker run -p 27017:27017 -d mongo
```

Note: If you need a visual Mongo client, try Compass: https://docs.mongodb.com/compass/master/install/.

### Start Environment

Start the back-end by opening a terminal in the `/src/server` directory.

```
npm start
```

Start the front-ebd by opening a terminal in the `/src/client` directory.

```
npm start
```

Then open a browser to http://localhost:4200.

### Initial Data

Because account behavior is still in development, you can find membership related postman scripts in the `src/tools/postman-scripts` directory.

There you can create a new user and some initial recipes.

## Development

Eat This! is built using an Angular front-end, Node back-end, and a Mongo database.

### Client


### Server

The server handles all requests for documents and handles maintaining integrity of the business rules.

#### Routes

Routes define endpoints, logically grouped by document type. Routes provide the following behavior:

- Endpoint definitions and their parameters
- User authentication and token handling via middleware
- Model binding
- Exception handling and appropriate http responses

#### Controllers

Controllers are called by routes to handle requests for behavior such as document creation, updates, and deletes. Controllers provide the following behavior:

- Monitor invalid user access to documents and other data.
- Manipulation of documents based on business rules and the type of request.

#### Repositories

Repositories are dedicated to updating documents and provide the following behavior:

- Repositories are currently hiding the fact that we use mongo.
- Record identifiers are always generated at this level.

Child operations on documents should be handled at the controller level and simply update documents.