// NEXT TIME: work on setting up database and file with MONGO_URI > make sure to create a gitignore file

"use strict";

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: "http://localhost:8000",
};

const {
  checkDuplicates,
  verifyToken,
  signUp,
  signIn,
  createToken,
} = require("./handlers");

express()
  .use(cors(corsOptions))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  // POST request to authenticate
  .post("/auth", createToken)
  // POST request for new account
  // .post("/auth/new", {
  //   checkDuplicates,
  //   verifyToken,
  //   signUp,
  // })

  // POST request for existing account
  // .post("/auth/signin", {
  //   checkDuplicates,
  //   verifyToken,
  //   signIn,
  // })

  // GET request
  .get("/", (req, res) => {
    res.json({ message: "Welcome to listsapp" });
  })

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
  });
