export default class Card {
    constructor(scene) {
        this.render = (x, y, type) => {
            let sprite;
            if(type === 'playerCard') {
                sprite = this.playerCardSprite;
            }else {
                sprite = this.opponentCardSprite;
            }
            //instancia uma nova carta
            let card = scene.add.image(x, y, sprite).setInteractive().setData({
                "name": this.name,
                "type": type,
                "sprite": sprite,
                "enthalpy": this.enthalpy,
                "cardType": this.cardType
            }).setScale(0.5);
            if(type === 'playerCard') {
                scene.input.setDraggable(card);
            }
            return card;
        }
    }
}