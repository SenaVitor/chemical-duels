class DuelScene extends Phaser.Scene{
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
    }

    update(){
        
    }
}