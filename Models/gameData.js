const mongoose = require("mongoose");

const gameDataSchema = new mongoose.Schema({
    lobbyId: {
        type:String,
        required: true
    },
    player: [{
        name:{
            type:String,
            required:true,
            unique: true
        },
        question:{
            type:String,
            default: null
        },
        score:{
            type: Number,
            default: 0
        }
    }]
});
  
  const gameData = mongoose.model("Wrivia_Games", gameDataSchema);
  
  module.exports = gameData;