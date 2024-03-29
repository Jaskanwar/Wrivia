const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
dotenv.config();
const connectMongo = require("./config/config");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

connectMongo();
app.use(express.json());

app.use(mongoSanitize());
app.use(hpp());

app.use('/api/lobby', require('./Routes/lobby'));
app.use('/api/question', require('./Routes/question'));
app.use('/api/score', require('./Routes/score'));
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));