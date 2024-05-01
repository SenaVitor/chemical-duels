export default class StartScene extends Phaser.Scene{
    constructor(){
        super('StartScene');
    }

    create(){
        const config = {
            width: 1200,
            height: 1100
        };
        this.menuMusic = this.sound.add('menuMusic');
        this.menuMusic.play({
            volume: 1,
            loop: true
        });
        this.add.image(0, 0, 'menu').setOrigin(0);
        const startButton = this.add.image(config.width/2 - 375, config.height/2 - 10, 'start').setOrigin(0).setScale(0.8, 1);
        const tutorialButton = this.add.image(config.width/2 - 280, config.height/2 - 10, 'tutorial').setOrigin(0).setScale(0.8, 1);
        const creditButton = this.add.image(config.width/2 - 185, config.height/2 - 10, 'credits').setOrigin(0).setScale(0.8, 1);
        const scoreButton = this.add.image(config.width/2 - 90, config.height/2 - 10, 'score').setOrigin(0).setScale(0.8, 1);

        startButton.setInteractive();
        tutorialButton.setInteractive();
        creditButton.setInteractive();
        scoreButton.setInteractive();
        
        startButton.on("pointerdown", () => {
            this.menuMusic.stop();
            this.scene.start('Game');
        });
        tutorialButton.on("pointerdown", () => {
            // this.scene.start('DuelScene');
            console.log("Tutorial");
        });
        creditButton.on("pointerdown", () => {
            // this.scene.start('DuelScene');
            console.log("Credits");
        });
        scoreButton.on("pointerdown", () => {
            // this.scene.start('DuelScene');
            console.log("Score");
        });
    }
}