const mongoose = require("mongoose");
//const config = require("config");

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || "27017";
const uri = `mongodb://${host}:${port}/eatthis?retry-writes=true`;

const connectDB = async () => {
  try {
    console.log(`Attempting mongo connection at ${uri}`);

    mongoose.set('toJSON', {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      }
    });

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connection to MongoDB has been established.");
  } catch (error) {
    console.error('Error connecting to mongo.', error.message)

    // If there are errors connecting to Mongo, then shut the entire
    //  api down. There's no sense in limping along.
    process.exit(1);
  }
};

module.exports = connectDB;
