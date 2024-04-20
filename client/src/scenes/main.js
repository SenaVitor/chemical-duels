let game;

window.onload = function(){
    const config = {
        type: Phaser.CANVAS,
        width: 800,
        height: 600,
        scene: [Preload, StartScene, DuelScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 1000},
                debug: false
            }
        },
        pixelArt: false
    }
    
    game = new Phaser.Game(config);
}