# Eat This!

v2 underway

## Up and Running Locally

### Setup MongoDB

You will first need an instance of MongoDB available for the backend api. The easiest way to accomplish that is to use Docker. You can run the following commands to run the latest version of MongoDB.

```
docker pull mongo
docker run -p 27017:27017 -d mongo
```

### Running the Projects

- Clone the repo
- In both the `frontend` and `backend` directories run `npm install`
- From the root of the project run `npm run start`
