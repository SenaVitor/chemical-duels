import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import SocketHandler from "../helpers/SocketHandler";
import UIHandler from "../helpers/UIHandler";

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    create() {
        this.duelMusic = this.sound.add('duelMusic');
        this.duelMusic.play({
            volume: 0.5,
            loop: true
        });
        this.cards = [];
        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);
        this.events.on('shutdown', this.shutdown, this);
    }
    
    update() {
        if(this.GameHandler.gameState !== "Initializing" && this.GameHandler.playerHand.length === 0 && this.GameHandler.opponentHand.length === 0){
            this.duelMusic.stop();
            if(this.GameHandler.score > this.GameHandler.opponentScore) this.GameHandler.win = true;
            this.scene.start('Score', { score: this.GameHandler.score, win: this.GameHandler.win });
        }
    }

    shutdown() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}