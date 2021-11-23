const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
dotenv.config();
const connectMongo = require("./config/config");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

connectMongo();

app.use(mongoSanitize());
app.use(hpp());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));