import { addScore } from "../config/fireBase";

export default class Score extends Phaser.Scene {
    constructor() {
        super('Score');
    }

    create(data) {
        this.scoreMusic = this.sound.add('scoreMusic');
        this.scoreMusic.play({
            volume: 0.5,
            loop: true
        });

        this.esc = this.input.keyboard.addKey('ESC');
        this.add.image(0, 0, 'scoreScreen').setOrigin(0.1, 0.2).setAlpha(0.3).setScale(1, 0.9);
        const win = data.win ? "Venceu!" : "Perdeu!";
        const winText = `Você ${win}`;
        this.add.text(280, 100, winText, { 
            fontSize: '40px', 
            fill: '#fff', 
            fontStyle: 'bold',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#fcb506',
                blur: 2,
                stroke: true,
                fill: true
            } 
        }).setOrigin(0);

        const backButton = this.add.text(350, 350, 'Próximo', { fontSize: '32px', fill: '#fff' });
        const scoreText = `Pontuação: ${data.score}`;
        this.add.text(295, 250, scoreText, { fontSize: '32px', fill: '#fff' }).setOrigin(0);

        backButton.setInteractive({ useHandCursor: true });
        this.createInput(this);

        backButton.on("pointerdown", () => {
            const playerName = this.inputElement.value.trim();
            if (playerName) {
                const saving = this.add.text(this.sys.canvas.width / 2 + 30, this.sys.canvas.height / 2 - 80, 'Salvando...', {
                    fontSize: '30px',
                    color: '#fff',
                    fontStyle: 'bold',
                    shadow: {
                        offsetX: 2,
                        offsetY: 2,
                        color: '#fcb506',
                        blur: 2,
                        stroke: true,
                        fill: true
                    }
                }).setOrigin(0.5);

                addScore(playerName, data.score)
                    .then((res) => {
                        saving.setText('Sua pontuação foi salva!');
                    })
                    .catch((err) => {
                        console.error('Erro ao salvar pontuação:', err);
                        saving.setText('Erro ao salvar pontuação.');
                    })
                    .finally(() => {
                        setTimeout(() => {
                            saving.destroy();
                            this.inputElement.remove();
                            backButton.setVisible(false);
                            backButton.disableInteractive();
                            this.scoreMusic.stop();
                            this.scene.start('StartScene');
                        }, 2000);
                    });
            } else {
                alert('Por favor, digite seu nome para salvar sua pontuação.');
            }
        });
    }

    update() {
        if (this.esc.isDown) {
            this.scoreMusic.stop();
            this.scene.start('StartScene');
        }
    }

    createInput(scene) {
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.placeholder = 'Digite seu nome';
        this.inputElement.maxLength = 10;
        this.inputElement.style.position = 'absolute';
        this.inputElement.style.width = '200px';
        this.inputElement.style.height = '15px';
        this.inputElement.style.borderWidth = '3px';
        this.inputElement.style.padding = '10px';
        this.inputElement.style.top = `${scene.sys.canvas.height * 0.5}px`;
        this.inputElement.style.left = `${scene.sys.canvas.width / 2 - 90}px`;
        this.inputElement.style.boxShadow = '0px 8px 8px #000';

        document.body.appendChild(this.inputElement);

        scene.events.on('shutdown', () => {
            this.inputElement.remove();
        });
    }
}
