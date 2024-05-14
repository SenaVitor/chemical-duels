import Card from "./Card";

export default class Boolean extends Card {
    constructor(scene, sprite) {
        super(scene, sprite);
        this.name = "boolean";
        if(sprite) {
            this.playerCardSprite = sprite;
            this.opponentCardSprite = sprite;
        }else {
            const sprites = ["br", "c", "ca", "cl", "f", "h", "k", "mg", "mn", "n", "na", "o", "s", "transmutacao", "lavoisier"];
            const index = Math.floor(Math.random() * sprites.length);
            this.playerCardSprite = sprites[index];
            this.opponentCardSprite = sprites[index];
        }
    }
}