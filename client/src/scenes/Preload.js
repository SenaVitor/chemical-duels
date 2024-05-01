export default class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }

    preload(){
        this.load.audio('menuMusic', '/assets/sfx/mainMenu.mp3');
        this.load.audio('duelMusic', '/assets/sfx/vsLancastrians.mp3');
        
        this.load.image('menu', '/assets/img/menu.png');
        this.load.image('start', '/assets/img/iniciar.png');
        this.load.image('tutorial', '/assets/img/tutorial.png');
        this.load.image('score', '/assets/img/placar.png');
        this.load.image('credits', '/assets/img/creditos.png');
        this.load.image('board', '/assets/img/tabuleiro.png');
        // this.load.image('playerCardBack', '/assets/img/fundoDeck1.jpg');
        // this.load.image('opponentCardBack', '/assets/img/fundoDeck2.jpg');
        this.load.image('logo', '/assets/img/logo.png');

        this.load.image('cyanCardBack', '/assets/img/cyanCardBack.png');
        this.load.image('magentaCardBack', '/assets/img/magentaCardBack.png');

        this.load.image('cyanBoolean', '/assets/img/cyanBoolean.png');
        this.load.image('magentaBoolean', '/assets/img/magentaBoolean.png');
        this.load.image('cyanPing', '/assets/img/cyanPing.png');
        this.load.image('magentaPing', '/assets/img/magentaPing.png');
    }

    create(){
        this.scene.start('StartScene');
    }
}