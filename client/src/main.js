import Phaser from 'phaser';
import Game from './scenes/game.js';
import StartScene from './scenes/StartScene.js';
import Preload from './scenes/Preload.js';
import Credits from './scenes/Credits.js';
import Score from './scenes/Score.js';
import Tutorial from './scenes/Tutorial.js';
import ScoreBoard from './scenes/ScoreBoard.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        Preload, StartScene, Game, Credits, Score, Tutorial, ScoreBoard
    ]
}

const game = new Phaser.Game(config);