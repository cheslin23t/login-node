const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb://auth:rrNljpYm1hEbhj9C@node-auth-shard-00-00.pmnab.mongodb.net:27017,node-auth-shard-00-01.pmnab.mongodb.net:27017,node-auth-shard-00-02.pmnab.mongodb.net:27017/auth?replicaSet=atlas-n59m92-shard-0&ssl=true&authSource=admin";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;