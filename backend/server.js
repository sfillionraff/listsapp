"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { login } = require("./handlers");

// require("dotenv").config();
const PORT = 8000;

express()
  .use(cors())
  .use(morgan("tiny"))
  .use(express.urlencoded({ extended: false }))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
