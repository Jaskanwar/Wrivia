const express = require("express");
const router = express.Router();
const Crypto = require("crypto");
const gameData = require("../Models/gameData");
const pusher = require("../config/pusher");

router.post("/create", async (req, res) => {
  try {
    let lobbyId = Crypto.randomBytes(6).toString("hex").slice(0, 6);
    const lobby = await gameData.create({ lobbyId: lobbyId });
    res.status(200).send({ lobbyId: lobbyId });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/join", async (req, res) => {
  const { id, name, host } = req.body;
  const where = { lobbyId: id };
  try {
    const player = await gameData.findOne(
      { lobbyId: id, "player.name": name },
      { "player.$": 1 }
    );
    if (player) {
      console.log("Player alreadt exists");
      return res.status(500).send("Player name exists");
    }
    const lobby = await gameData.findOneAndUpdate(
      where,
      { $push: { player: { name: name, host: host } } },
      {
        new: true,
      }
    );
    pusher.trigger("Wrivia", id, {
      lobby,
    });
    res.status(200).send({ lobby: lobby });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/leave", async (req, res) => {
  const { id, name } = req.body;
  const where = { lobbyId: id };
  try {
    const lobby = await gameData.findOneAndUpdate(
      where,
      { $pull: { player: { name: name } } },
      { new: true }
    );
    pusher.trigger("Wrivia", id, {
      lobby,
    });
    res.status(200).send({ lobby: lobby });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/start", async (req, res) => {
  const { id, start } = req.body;
  const where = { lobbyId: id };
  try {
    const lobby = await gameData.findOneAndUpdate(
      where,
      { startGame: start },
      { new: true }
    );
    pusher.trigger("Wrivia", "startGame_" + id, lobby.startGame);
    res.status(200).send({ lobby: lobby.startGame });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/changeScreen", async (req, res) => {
  const { id, changeNum } = req.body;
  try {
    pusher.trigger("Wrivia", "change_"+id+changeNum, {change: true});
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
