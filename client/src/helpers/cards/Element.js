import Card from "./Card";

export default class Element extends Card {
    static sprites = [
        "br", "c", "ca", "cl", "f", "h", "k", "mg", "mn", "n", "na", "o", "s", "transmutacao", "lavoisier",
        "br", "c", "ca", "cl", "f", "h", "k", "mg", "mn", "n", "na", "o", "s", "transmutacao", "lavoisier"
    ];
    constructor(scene, sprite) {
        super(scene);
        this.name = "element";
        if(sprite) {
            this.playerCardSprite = sprite;
            this.opponentCardSprite = sprite;
        }else {
            const index = Math.floor(Math.random() * Element.sprites.length);
            this.playerCardSprite = Element.sprites[index];
            this.opponentCardSprite = Element.sprites[index];
            Element.sprites.splice(index, 1);  
        }
    }
}