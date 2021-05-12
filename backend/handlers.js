const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const key = require("./auth.configuration.js");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// make const client = await MongoClient(MONGO_URI, options); a global variable?

const createToken = (req, res) => {
  const payload = req.body;
  console.log(payload);
  const token = jwt.sign(payload, key.secret, { expiresIn: "30s" });
  console.log(token);
  res.status(200).send({ access_token: token });
};

const checkDuplicates = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Lists");
  const usernameToFind = req.body.username;
  const emailToFind = req.body.email;
  try {
    await db
      .collection("users")
      .findOne({ username: usernameToFind })
      .then((result) => {
        res.status(400).json({
          status: 400,
          data: usernameToFind,
          message: "Username already exists!",
        });
      });
    await db
      .collection("users")
      .findOne({ email: emailToFind })
      .then((result) => {
        res.status(400).json({
          status: 400,
          data: emailToFind,
          message: "Email already in use!",
        });
      });
  } catch (error) {
    res.status(400).json({
      status: 400,
      data: error,
    });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const verifyToken = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      status: 403,
      message: "Token not provided!",
    });
  }
  jwt.verify(token, key.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized!",
      });
    } else {
      return (req.id = decoded.id);
    }
  });
};

const signUp = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Lists");
  console.log("connected!");
  const newUserId = uuidv4();
  const newUser = {
    _id: newUserId,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  try {
    await db
      .collection("users")
      .insertOne(newUser)
      .then((result) => {
        res.status(200).json({
          status: 200,
          data: newUser,
          message: "New user added successfully!",
        });
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: newUser,
      message: "Unable to add new user",
    });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const signIn = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Lists");
  console.log("connected!");
  const userToFind = req.body.username;
  let signInIsValid;
  let token;
  try {
    await db
      .collection("users")
      .findOne(userToFind)
      .then((result) => {
        if (result.user) {
          const pwIsValid = bcrypt.compareSync(
            req.body.password,
            result.user.password
          );
          if (pwIsValid) {
            signInIsValid = true;
            token = jwt.sign({ id: result._id }, key.secret, {
              expiresIn: 86400,
              // 24 hours
            });
            // not sure what to do here
          } else {
            signInIsValid = false;
          }
        }
      })
      .then((result) => {
        res.status(200).json({
          status: 200,
          data: userToFind,
          token,
          message: "User found!",
        });
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: userToFind,
      message: "Unable to find user",
    });
  }
};

module.exports = {
  checkDuplicates,
  verifyToken,
  signUp,
  signIn,
};
