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
  const where = { lobbyId: id, "player.name": name };
  try {
    const numPlayers = await gameData.findOneAndUpdate({lobbyID: id}, {$inc: {numPlayers: 1}}, {new: true})
    const playersLen = await gameData.aggregate([{$project: { count: { $size:"$player" }}}])
    console.log(playersLen[0].count, )
    if(playersLen[0].count === numPlayers.numPlayers){
      const player = await gameData.findOne(where, { "player.$": 1 });
      pusher.trigger("Wrivia", "Question_"+id, player);
      return res.status(200).send({ player })
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
