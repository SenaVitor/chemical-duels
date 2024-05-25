import Phaser from 'phaser';
import Game from './scenes/game.js';
import StartScene from './scenes/StartScene.js';
import Preload from './scenes/Preload.js';
import Credits from './scenes/Credits.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        Preload, StartScene, Game, Credits
    ]
}

const game = new Phaser.Game(config);