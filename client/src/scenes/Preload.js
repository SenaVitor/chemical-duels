export default class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }

    preload(){
        this.load.audio('menuMusic', '/assets/sfx/mainMenu.mp3');
        // this.load.audio('menuMusic', '/assets/sfx/aTaleLongPast.mp3');
        this.load.audio('duelMusic', '/assets/sfx/vsLancastrians.mp3');
        this.load.audio('creditsMusic', '/assets/sfx/worldMap.mp3');
        
        this.load.image('menu', '/assets/img/menu.png');
        this.load.image('creditsScreen', '/assets/img/credits.jpg');
        this.load.image('start', '/assets/img/iniciar.png');
        this.load.image('tutorial', '/assets/img/tutorial.png');
        this.load.image('score', '/assets/img/placar.png');
        this.load.image('credits', '/assets/img/creditos.png');
        this.load.image('board', '/assets/img/tabuleiro.png');
        this.load.image('logo', '/assets/img/logo.png');

        this.load.image('cyanCardBack', '/assets/img/fundoDeck1.png');
        this.load.image('magentaCardBack', '/assets/img/fundoDeck2.png');
        
        this.load.image('transmutacao', '/assets/cards/TransmutaçãoArtificial.png');
        this.load.image('lavoisier', '/assets/cards/Lavoisier.png');

        this.load.image('s', '/assets/cards/S.png');
        this.load.image('br', '/assets/cards/BR.png');
        this.load.image('c', '/assets/cards/C.png');
        this.load.image('ca', '/assets/cards/CA.png');
        this.load.image('cl', '/assets/cards/CL.png');
        this.load.image('f', '/assets/cards/F.png');
        this.load.image('h', '/assets/cards/H.png');
        this.load.image('k', '/assets/cards/K.png');
        this.load.image('mn', '/assets/cards/MN.png');
        this.load.image('mg', '/assets/cards/MG.png');
        this.load.image('n', '/assets/cards/N.png');
        this.load.image('na', '/assets/cards/NA.png');
        this.load.image('o', '/assets/cards/O.png');
        
        this.load.image('no', '/assets/cards/NO.png');
        this.load.image('naoh', '/assets/cards/NAOH.png');
        this.load.image('naf', '/assets/cards/NAF.png');
        this.load.image('nacl', '/assets/cards/NACL.png');
        this.load.image('mno', '/assets/cards/MNO.png');
        this.load.image('mgo', '/assets/cards/MGO.png');
        this.load.image('kf', '/assets/cards/KF.png');
        this.load.image('kbr', '/assets/cards/KBR.png');
        this.load.image('hcl', '/assets/cards/HCL.png');
        this.load.image('h2so4', '/assets/cards/H2SO4.png');
        this.load.image('h2o', '/assets/cards/H2O.png');
        this.load.image('cs2', '/assets/cards/CS2.png');
        this.load.image('cas', '/assets/cards/CAS.png');
        this.load.image('c2h2', '/assets/cards/C2H2.png');
        this.load.image('bro', '/assets/cards/BRO.png');
    }

    create(){
        this.scene.start('StartScene');
    }
}