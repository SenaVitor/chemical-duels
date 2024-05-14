import CardBack from "./cards/CardBack";
import Boolean from "./cards/Boolean";
import Ping from "./cards/Ping";

export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type, sprite) => {
            let cards = {
                cardBack: new CardBack(scene, sprite),
                boolean: new Boolean(scene, sprite),
                ping: new Ping(scene, sprite)
            }
            let newCard = cards[name];
            return (newCard.render(x, y, type));
        }
    }
}