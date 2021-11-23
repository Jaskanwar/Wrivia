const mongoose = require("mongoose");

const gameDataSchema = new mongoose.Schema({
    lobbyId: {
        type:String,
        required: true
    }
});
  
  const gameData = mongoose.model("Wrivia_Games", gameDataSchema);
  
  module.exports = gameData;