import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";

export default class DuelScene extends Phaser.Scene{
    constructor(){
        super('DuelScene');
    }

    create(){
        this.sndMusic = this.sound.add('duelMusic');
        this.sndMusic.play({
            volume: 0.5,
            loop: true
        });
        
        // const board = this.add.image(400, 450, 'board').setScale(0.95, 0.5);
        // const board = this.add.image(game.config.width/2, game.config.height/2, 'board').setScale(0.95, 1);
        const board = this.add.image(game.config.width/2, game.config.height/2, 'logo').setScale(2.5, 1.2);

        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.InteractiveHandler = new InteractiveHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);
    }

    update(){
        
    }
}