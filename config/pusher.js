const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1327739",
  key: "218cec42316a7262014e",
  secret: "f90e03e61276a22cb68f",
  cluster: "us2",
  useTLS: true,
});

module.exports = pusher;