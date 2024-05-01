import Phaser from 'phaser';
import Game from './scenes/game.js';
import StartScene from './scenes/StartScene.js';
import Preload from './scenes/Preload.js';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1100,
    scene: [
        Preload, StartScene, Game
    ]
}

const game = new Phaser.Game(config);