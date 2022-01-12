const mongoose = require("mongoose");

const gameDataSchema = new mongoose.Schema({
    lobbyId: {
        type:String,
        required: true
    },
    startGame: {
        type: Boolean,
        default: false
    },
    player: [{
        name:{
            type:String,
        },
        question:{
            type:String,
            default: null
        },
        score:{
            type: Number,
            default: 0
        },
        host:{
            type: Boolean,
            default: false
        }
    }]
});
  
  const gameData = mongoose.model("Wrivia_Games", gameDataSchema);
  
  module.exports = gameData;