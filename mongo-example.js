"use-strict"

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (error, db) => {
  if (error) {
    console.error(`failed to connect: ${MONGODB_URI}`);
    throw error;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }


  getTweets((error, tweets) => {
    if (error) throw error;

    console.log("Logging each tweet: ");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  })

});
