const express = require("express");
const router = express.Router();
const gameData = require("../Models/gameData");
const pusher = require("../config/pusher");

router.post("/create", async (req, res) => {
  const { id, name, question } = req.body;
  const where = { lobbyId: id, "player.name": name };
  try {
    const lobby = await gameData.findOneAndUpdate(
      where,
      { $set: { "player.$.question": question } },
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

router.post("/question", async (req, res) => {
  const { id, name } = req.body;
  console.log(name);
  const where = { lobbyId: id, "player.name": name };
  try {
    const numPlayers = await gameData.findOneAndUpdate(
      { lobbyId: id },
      { $inc: { numPlayers: 1 } },
      { new: true }
    );
    const playersLen = await gameData.aggregate([
      { $match: { lobbyId: id } },
      { $project: { count: { $size: "$player" } } },
    ]);
    if (playersLen[0].count === numPlayers.numPlayers) {
      const player = await gameData.findOne(where, { "player.$": 1 });
      console.log(player);
      const resetNum = await gameData.findOneAndUpdate(
        { lobbyId: id },
        { numPlayers: 0 },
        { new: true }
      );
      pusher.trigger("Wrivia", "Question_" + id, player);
      return res.status(200).send({ player, next: true });
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/newQuestion", async (req, res) => {
  const { id, name } = req.body;
  const where = { lobbyId: id, "player.name": name };
  try {
    console.log(name)
    const player = await gameData.findOne(where, { "player.$": 1 });
    console.log(player)
    pusher.trigger("Wrivia", "newQuestion_" + id, player);
    return res.status(200).send({ player, next: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/answer", async (req, res) => {
  const { id, name, answer } = req.body;
  const where = { lobbyId: id, "player.name": name };
  try {
    const lobby = await gameData.findOneAndUpdate(
      where,
      { $set: { "player.$.answer": answer, "player.$.isCorrect":false } },
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

router.post("/numAnswered", async (req, res) => {
  const { id } = req.body;
  try {
    const numPlayers = await gameData.findOneAndUpdate(
      { lobbyId: id },
      { $inc: { numPlayers: 1 } },
      { new: true }
    );
    const playersLen = await gameData.aggregate([
      { $match: { lobbyId: id } },
      { $project: { count: { $size: "$player" } } },
    ]);
    if (playersLen[0].count === numPlayers.numPlayers) {
      const resetNum = await gameData.findOneAndUpdate(
        { lobbyId: id },
        { numPlayers: 0 },
        { new: true }
      );
      pusher.trigger("Wrivia", "Answered_" + id, { scoring: true });
      return res.status(200).send({ scoring: true });
    }
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

/*
db.students2.findOneAndUpdate(
   { _id : 1 },
   { $set: { "grades.$[elem].mean" : 100 } },
   { arrayFilters: [ { "elem.grade": { $gte: 85 } } ] }
)


const lobby = await gameData.findOneAndUpdate(
    where,
    { $set: { "player.$[elem].question": question } },
    {
    arrayFilters: [{ "elem.name": name }],
    new: true,
    }
);
*/
