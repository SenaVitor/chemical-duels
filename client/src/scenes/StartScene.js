export default class StartScene extends Phaser.Scene{
    constructor(){
        super('StartScene');
    }

    create(){
        const config = {
            width: 800,
            height: 600
        };
        this.menuMusic = this.sound.add('menuMusic');
        this.menuMusic.play({
            volume: 0.5,
            loop: true
        });
        this.add.image(0, 0, 'menu').setOrigin(0);
        const startButton = this.add.image(config.width/2 - 175, config.height/2 + 237, 'start').setOrigin(0).setScale(0.8, 1);
        const tutorialButton = this.add.image(config.width/2 - 80, config.height/2 + 237, 'tutorial').setOrigin(0).setScale(0.8, 1);
        const creditButton = this.add.image(config.width/2 + 15, config.height/2 + 237, 'credits').setOrigin(0).setScale(0.8, 1);
        const scoreButton = this.add.image(config.width/2 + 110, config.height/2 + 237, 'score').setOrigin(0).setScale(0.8, 1);

        startButton.setInteractive({ useHandCursor: true });
        tutorialButton.setInteractive({ useHandCursor: true });
        creditButton.setInteractive({ useHandCursor: true });
        scoreButton.setInteractive({ useHandCursor: true });
        
        startButton.on("pointerdown", () => {
            this.menuMusic.stop();
            this.scene.start('Game');
        });
        tutorialButton.on("pointerdown", () => {
            this.menuMusic.stop();
            this.scene.start('Tutorial');
        });
        creditButton.on("pointerdown", () => {
            this.menuMusic.stop();
            this.scene.start('Credits');
        });
        scoreButton.on("pointerdown", () => {
            this.menuMusic.stop();
            this.scene.start('ScoreBoard');
        });
    }
}