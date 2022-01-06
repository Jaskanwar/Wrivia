const express = require("express");
const router = express.Router();
const Crypto = require('crypto');
const gameData = require('../Models/gameData');
const pusher = require('../config/pusher')


router.post('/create', async(req, res)=>{
    try {
        let lobbyId = Crypto.randomBytes(6).toString('hex').slice(0, 6);
        const lobby = await gameData.create({lobbyId: lobbyId});
        pusher.trigger('Wrivia', 'test',{
            message: "hello world"
        });
        res.status(200).send({"lobbyId": lobbyId});
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
})

module.exports = router;