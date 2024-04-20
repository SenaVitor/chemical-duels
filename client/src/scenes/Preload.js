class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }

    preload(){
        this.load.audio('menuMusic', 'sfx/mainMenu.mp3');
        this.load.audio('duelMusic', 'sfx/vsLancastrians.mp3');
        
        this.load.image('menu', 'img/menu.png');
        this.load.image('start', 'img/iniciar.png');
        this.load.image('tutorial', 'img/tutorial.png');
        this.load.image('score', 'img/placar.png');
        this.load.image('credits', 'img/creditos.png');
        this.load.image('board', 'img/tabuleiro.png');
        this.load.image('orangeCardBack1', 'img/fundoDeck1.png');
        this.load.image('blueCardBack', 'img/fundoDeck2.png');
        this.load.image('logo', 'img/logo.png');
    }

    create(){
        this.scene.start('StartScene');
    }
}