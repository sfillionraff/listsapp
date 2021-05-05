const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const testFunction = async () => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Lists");
  console.log("connected!");
  client.close();
  console.log("disconnected!");
};

testFunction();
