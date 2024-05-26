import io from 'socket.io-client';

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3000'); //substituir o caminho pelo host depois que hospedar (heroku ou outro)

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('dealDeck', scene.socket.id);
        });

        scene.socket.on('firstTurn', () => {
            scene.GameHandler.changeTurn();
        });

        scene.socket.on('changeGameState', (gameState) => {
            scene.GameHandler.changeGameState(gameState);
            if(gameState === "Initializing") {
                scene.DeckHandler.dealCard(670, 530, "cardBack", "playerCard");
                scene.DeckHandler.dealCard(670, 80, "cardBack", "opponentCard");
                let cardP = scene.add.image(670, 395, "h2o").setScale(0.5);
                let cardO = scene.add.image(670, 215, "bro").setScale(0.5);
                cardP.alpha = 0.8;
                cardO.alpha = 0.8;
                scene.dealCards.setInteractive();
                scene.dealCards.setColor('#00ffff');
            }
        });

        scene.socket.on('changeTurn', () => {
            scene.GameHandler.changeTurn();
        });

        scene.socket.on('dealCards', (socketId, cards) => {
            if(socketId === scene.socket.id) {
                for(let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(100 + (i * 100), 530, cards[i], "playerCard"));
                }
            }else {
                for(let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(100 + (i * 100), 80, "cardBack", "opponentCard"));
                }
            }
        });

        scene.socket.on('cardPlayed', (card, socketId) => {
            if(socketId !== scene.socket.id) {
                if(!scene.cards) scene.cards = [];
                if(card.name !== "substance") {
                    scene.GameHandler.opponentHand.shift().destroy();
                    scene.cards.push(scene.DeckHandler.dealCard((scene.dropZone.x - 250) + (scene.dropZone.data.values.opponentCards * 100), 
                        scene.dropZone.y - 70, card.name, "opponentCard", card.sprite));
                }else{
                    const elements = getElements(card.sprite);
                    scene.cards.push(scene.DeckHandler.dealCard((scene.dropZone.x - 250) + (scene.dropZone.data.values.opponentCards * 100), 
                        scene.dropZone.y - 70, card.name, "opponentCard", elements));
                    removeElements(elements, scene);
                }
                scene.dropZone.data.values.opponentCards++;
            }
        });
    }
}

function orderCards(scene){
    let playerIndex = 0;
    let opponentIndex = 0;
    scene.cards.forEach(card => {
        if(card.data.list.type === "playerCard"){
            card.x = (scene.dropZone.x - 250) + (playerIndex * 100);
            playerIndex++;
        } else{
            card.x = (scene.dropZone.x - 250) + (opponentIndex * 100);
            opponentIndex++;
        }
    }); 
}

function removeElements(elements, scene){
    elements.forEach(char => {
        let index = scene.cards.findIndex(card => card.data.list.sprite === char);
        if (index !== -1) {
            if(scene.cards[index].data.list.type === "playerCard"){
                scene.dropZone.data.values.playerCards--;
            }else{
                scene.dropZone.data.values.opponentCards--;
            }
            scene.cards[index].destroy();
            scene.cards.splice(index, 1);
        } 
    });
    orderCards(scene);
}

function getElements(substance) {
    const substances = {
        no: ["n", "o"],
        naoh: ["na", "o", "h"],
        naf: ["na", "f"],
        nacl: ["na", "cl"],
        mno: ["mn", "o"],
        mgo: ["mg", "o"],
        kf: ["k", "f"],
        kbr: ["k", "br"],
        hcl: ["h", "cl"],
        h2so4: ["h", "s", "o"],
        h2o: ["h", "o"],
        cs2: ["c", "s"],
        cas: ["ca", "s"],
        c2h2: ["c", "h"],
        bro: ["br", "o"],
    };

    const elements = substances[substance];
    return elements;
}