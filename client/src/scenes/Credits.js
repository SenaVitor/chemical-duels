export default class Credits extends Phaser.Scene{
    constructor(){
        super('Credits');
    }

    create(){
        const config = {
            width: 800,
            height: 600
        };
        this.creditsMusic = this.sound.add('creditsMusic');
        this.creditsMusic.play({
            volume: 0.5,
            loop: true
        });
        this.esc = this.input.keyboard.addKey('ESC');
        this.add.image(0, 0, 'creditsScreen').setOrigin(0).setAlpha(0.3).setScale(0.8);
        const backButton = this.add.text(350, 500, 'Voltar', { fontSize: '32px', fill: '#fff' });
        const creditsText = `
            - Desenvolvido por: Vitor Lucas
            - Linguagem Base: JavaScript 
            - GameEngine: Phaser 3
            - Imagens: Microsoft Copilot
            - Áudio: Jogos "Yu-Gi-Oh! GX Tag Force Evolution" e 
                     "Yu-Gi-Oh! The Duelists of the Roses".   
            ------------------------------------------------
            Agradecimentos especiais: à todos os membros do grupo 
            do trabalho de química que fizeram nascer a primeira 
            versão (física) desse jogo.
            `

        this.add.text(150, 200, creditsText).setOrigin(0);

        backButton.setInteractive({ useHandCursor: true });
        
        backButton.on("pointerdown", () => {
            this.creditsMusic.stop();
            this.scene.start('StartScene');
        });
    }

    update() {
        if (this.esc.isDown) {
            this.creditsMusic.stop();
            this.scene.start('StartScene');
        }
    }

}