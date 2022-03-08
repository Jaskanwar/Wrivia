const express = require("express");
const router = express.Router();
const gameData = require("../Models/gameData");
const pusher = require("../config/pusher");

router.post("/save", async (req, res) => {
    const { id, name, score } = req.body;
    const where = { lobbyId: id, "player.name": name };
    try {
      const lobby = await gameData.findOneAndUpdate(
        where,
        { $set: { "player.$.score": score } },
        {
          new: true,
        }
      );
      res.status(200).send({ lobby });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  });
  
  router.post("/score", async (req, res) => {
    const { id } = req.body;
    const where = { lobbyId: id };
    try {
      const scores = await gameData.findOne(where);
      res.status(200).send({ scores });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  });
  
  module.exports = router;