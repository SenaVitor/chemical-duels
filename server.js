const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
const shuffle = require('shuffle-array');
let gameState = "Initializing";
let players = {};
let readyCheck = 0;

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080', //substituir o caminho pelo host depois que hospedar (heroku ou outro)
        methods: ["GET", "POST"]
    }
});

server.use(cors());
server.use(serveStatic(__dirname + "/client/dist"));

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false
    };

    if(Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn');
    }

    socket.on('dealDeck', function (socketId) {
        players[socketId].inDeck = ["element"];
        console.log(players);
        if(Object.keys(players).length < 2) return;
        io.emit('changeGameState', "Initializing");
    });

    socket.on('dealCards', function (socketId) {
        console.log("deal cards server " + socketId + " cards " + players[socketId].inHand.length)
        if(players[socketId].inHand.length === 0) {
            for(let i = 0; i < 5; i++) {
                if(players[socketId].inDeck.length === 0){
                    players[socketId].inDeck = ["element"];
                }
                players[socketId].inHand.push(players[socketId].inDeck.shift());
            }
            console.log(players);
            io.emit('dealCards', socketId, players[socketId].inHand);
            readyCheck++;
            if(readyCheck >= 2) {
                gameState = "Ready";
                io.emit('changeGameState', "Ready");
            }
        } else {
            if(players[socketId].inDeck.length === 0){
                players[socketId].inDeck = ["element"];
            }
            players[socketId].inHand.push(players[socketId].inDeck.shift());
            const card = players[socketId].inHand[players[socketId].inHand.length - 1];
            console.log(players);
            io.emit('dealCards', socketId, [card]);
        }
    });

    socket.on('cardPlayed', function (cardName, socketId) {
        if(cardName.name !== "substance") players[socketId].inHand.shift();
        io.emit('cardPlayed', cardName, socketId);
        io.emit('changeTurn');
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('Server started!');
});