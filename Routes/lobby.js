const express = require("express");
const router = express.Router();
const Crypto = require('crypto');
const gameData = require('../Models/gameData');


router.post('/create', async(req, res)=>{
    try {
        let lobbyId = Crypto.randomBytes(6).toString('hex').slice(0, 6);
        const lobby = await gameData.create({lobbyId: lobbyId});
        res.status(200).send({"lobbyId": lobbyId});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
})

module.exports = router;