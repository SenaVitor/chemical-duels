import Phaser from 'phaser';
import Game from './scenes/game.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },
    // width: 800,
    // height: 600,
    scene: [
        Game,
    ]
}

const game = new Phaser.Game(config);
