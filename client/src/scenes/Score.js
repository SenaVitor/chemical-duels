export default class Score extends Phaser.Scene{
    constructor(){
        super('Score');
    }

    create(data){
        this.scoreMusic = this.sound.add('scoreMusic');
        this.scoreMusic.play({
            volume: 0.5,
            loop: true
        });
        this.esc = this.input.keyboard.addKey('ESC');
        this.add.image(0, 0, 'scoreScreen').setOrigin(0.1, 0.2).setAlpha(0.3).setScale(1, 0.9);
        const backButton = this.add.text(350, 300, 'Próximo', { fontSize: '32px', fill: '#fff' });
        const scoreText = `Pontuação: ${data.score}`;

        this.add.text(295, 250, scoreText, { fontSize: '32px', fill: '#fff' }).setOrigin(0);

        backButton.setInteractive({ useHandCursor: true });
        
        backButton.on("pointerdown", () => {
            this.scoreMusic.stop();
            this.scene.start('StartScene');
        });
    }

    update() {
        if (this.esc.isDown) {
            this.scoreMusic.stop();
            this.scene.start('StartScene');
        }
    }

}