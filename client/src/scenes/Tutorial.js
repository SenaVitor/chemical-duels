export default class Tutorial extends Phaser.Scene{
    constructor(){
        super('Tutorial');
    }

    create(){
        this.tutorialMusic = this.sound.add('tutorialMusic');
        this.tutorialMusic.play({
            volume: 0.5,
            loop: true
        });
        this.esc = this.input.keyboard.addKey('ESC');
        this.add.image(0, 0, 'tutorialScreen').setOrigin(0).setAlpha(0.3).setScale(0.8);
        const backButton = this.add.text(350, 500, 'Voltar', { fontSize: '32px', fill: '#fff' });
        const tutorialText = `
            - São necessários 2 jogadores para jogar, o jogo inicia
              após ambos apertarem o botão Puxar Cartas, o último
              a apertar o botão inicia a partida.
            - Use o mouse para jogar elementos e utilize 
              eles para formar Substâncias.
            - É possível listar as substâncias com o botão Listar.
            - Para invocar uma substância utilize o botão Invocar. 
            - Cada elemento jogado vale 5 pontos, 
              enquanto cada substância jogada vale 20 pontos. 
            - Após jogar todas as cartas, o jogador com a maior 
              pontuação ganha.
            `

        this.add.text(50, 200, tutorialText).setOrigin(0);

        backButton.setInteractive({ useHandCursor: true });
        
        backButton.on("pointerdown", () => {
            this.tutorialMusic.stop();
            this.scene.start('StartScene');
        });
    }

    update() {
        if (this.esc.isDown) {
            this.tutorialMusic.stop();
            this.scene.start('StartScene');
        }
    }

}