const Pusher = require("pusher");
const dotenv = require('dotenv');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "us2",
  useTLS: true,
});

module.exports = pusher;