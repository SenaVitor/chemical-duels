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
                scene.DeckHandler.dealCard(670, 395, "substance", "playerCard", ["h", "o"]);
                scene.DeckHandler.dealCard(670, 215, "substance", "opponentCard", ["br", "o"]);
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
                scene.GameHandler.opponentHand.shift().destroy();
                scene.DeckHandler.dealCard((scene.dropZone.x - 250) + (scene.dropZone.data.values.cards * 50), 
                    scene.dropZone.y, card.name, "opponentCard", card.sprite);
                scene.dropZone.data.values.cards++;
            }
        });
    }
}