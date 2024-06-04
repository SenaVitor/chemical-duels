// import { getScores } from "../config/dataBase";
import { getScores } from "../config/firebase";
export default class ScoreBoard extends Phaser.Scene{
    constructor(){
        super('ScoreBoard');
    }

    create(){
        this.scoreBoardMusic = this.sound.add('scoreBoardMusic');
        this.scoreBoardMusic.play({
            volume: 0.5,
            loop: true
        });
        this.esc = this.input.keyboard.addKey('ESC');
        this.add.image(0, 0, 'scoreBoardScreen').setOrigin(0.1, 0.2).setAlpha(0.3).setScale(1, 0.9);
        this.add.text(340, 50, "Placar",{
            fontSize: '48px',
            color: '#fff',
            fontStyle: 'bold',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 2,
                stroke: true,
                fill: true
            }
        }).setOrigin(0);
        const backButton = this.add.text(350, 550, 'Voltar', { fontSize: '32px', fill: '#fff' }); 
        const loadingText = this.add.text(this.sys.canvas.width / 2 + 10, 220, 'Carregando...', {
            fontSize: '32px',
            color: '#fff',
            fontStyle: 'bold',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 2,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5, 0.5);

        getScores().then((data) => {
            this.displayScores(data);
          }).catch((err) => {
            alert('Não foi possível buscar o placar');
            loadingText.setText('Não foi possível buscar os dados');      
            console.log("erro ao buscar placar " + err);
          }).finally(() => {
            loadingText.destroy();
          });

        backButton.setInteractive({ useHandCursor: true });
        
        backButton.on("pointerdown", () => {
            this.scoreBoardMusic.stop();
            this.scene.start('StartScene');
        });
    }

    update() {
        if (this.esc.isDown) {
            this.scoreBoardMusic.stop();
            this.scene.start('StartScene');
        }
    }

    displayScores(data) {
        const startX = this.sys.canvas.width / 2 + 10;
        let startY = this.sys.canvas.height * 0.32;
    
        data.forEach((item, index) => {
            const text = `${index + 1} - ${item.name} - ${item.score}`;
            this.add.text(startX, startY, text, { fontSize: '20px' }).setOrigin(0.5, 0);
            startY += 30;
        });
    }
    

}