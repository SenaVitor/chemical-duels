import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import SocketHandler from "../helpers/SocketHandler";
import UIHandler from "../helpers/UIHandler";

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene2'
        });
    }
    
    preload() {
        this.load.audio('menuMusic', '/assets/sfx/mainMenu.mp3');
        this.load.audio('duelMusic', '/assets/sfx/vsLancastrians.mp3');
        
        this.load.image('menu', '/assets/img/menu.png');
        this.load.image('start', '/assets/img/iniciar.png');
        this.load.image('tutorial', '/assets/img/tutorial.png');
        this.load.image('score', '/assets/img/placar.png');
        this.load.image('credits', '/assets/img/creditos.png');
        this.load.image('board', '/assets/img/tabuleiro.png');
        this.load.image('playerCardBack', '/assets/img/fundoDeck1.jpg');
        this.load.image('opponentCardBack', '/assets/img/fundoDeck2.jpg');
        this.load.image('logo', '../assets/img/logo.png');

        this.load.image('cyanBoolean', '/assets/img/menu.png');
        this.load.image('magentaBoolean', '/assets/img/logo.png');
        this.load.image('cyanPing', '/assets/img/tabuleiro.png');
        this.load.image('magentaPing', '/assets/img/menu.png');
    }

    create() {
        this.menuMusic = this.sound.add('duelMusic');
        this.menuMusic.play({
            volume: 1,
            loop: true
        });
        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);
    }
    
    update() {

    }
}