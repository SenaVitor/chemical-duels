import Card from "./Card";

export default class Element extends Card {
    constructor(scene, sprite) {
        super(scene);
        this.name = "element";
        this.playerCardSprite = sprite;
        this.opponentCardSprite = sprite;
    }
}