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
        const backButton = this.add.text(550, 510, 'Voltar', { fontSize: '32px', fill: '#fff' });
        const tutorialText = `
            - São necessários 2 jogadores para jogar, o jogo inicia
              após ambos apertarem o botão Puxar Cartas, o primeiro
              a entrar inicia a partida.
            - Use o mouse para jogar elementos, arrastando eles até
              o centro da tela, e utilize-os para formar Substâncias.
            - É possível listar as substâncias com o botão Listar.
            - Para invocar uma substância utilize o botão Invocar.
            - A pontuação será salva no ranking ao final da partida. 
            - Ao invocar substâncias o jogador ganhará pontos de vida
              caso seja uma substância endotérmica (+), caso contrário,
              ou seja, se for uma substância exotérmica (-) causará dano
              aos pontos de vida do oponente, de acordo com a entalpia da
              substância. Vence o que zerar os pontos de vida do adversário 
              primeiro, caso algum duelista jogue 6 cartas em campo ou fique
              sem cartas na mão, o jogo acaba e vence aquele com maior vida,
              caso ambos tenha a mesma quantidade o jogador que jogou a 
              última carta será o vencedor.

            -Tabela de pontuação
              .------------------------------------.
              | Ação                   | Pontuação |
              | -----------------------| ----------|
              | Sem Dano               | 100 pts   |
              | Vitória                | 50 pts    |
              | Jogar uma substância   | 20 pts    |
              | Jogar um elemento      | 5 pts     |
              | Jogar uma alquimia     | 5 pts     |
              .------------------------------------.
            `

        this.add.text(50, 140, tutorialText).setOrigin(0);

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