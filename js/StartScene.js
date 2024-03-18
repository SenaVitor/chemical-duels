class StartScene extends Phaser.Scene{
    constructor(){
        super('StartScene');
    }

    create(){
        this.menuMusic = this.sound.add('menuMusic');
        this.menuMusic.play({
            volume: 1,
            loop: true
        });
        this.add.image(0, 0, 'menu').setOrigin(0);
        const startButton = this.add.image(game.config.width/2 - 165, game.config.height/2 + 237, 'start').setOrigin(0).setScale(0.8, 1);
        const tutorialButton = this.add.image(game.config.width/2 - 70, game.config.height/2 + 237, 'tutorial').setOrigin(0).setScale(0.8, 1);
        const creditButton = this.add.image(game.config.width/2 + 25, game.config.height/2 + 237, 'credits').setOrigin(0).setScale(0.8, 1);
        const scoreButton = this.add.image(game.config.width/2 + 120, game.config.height/2 + 237, 'score').setOrigin(0).setScale(0.8, 1);

        startButton.setInteractive();
        tutorialButton.setInteractive();
        creditButton.setInteractive();
        scoreButton.setInteractive();
        
        startButton.on("pointerdown", () => {
            this.menuMusic.stop();
            this.scene.start('DuelScene');
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