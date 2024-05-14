import CardBack from "./cards/CardBack";
import Element from "./cards/Element";
import Substances from "./cards/Substances";

export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type, sprite) => {
            let cards = {
                cardBack: new CardBack(scene, sprite),
                element: new Element(scene, sprite),
                substance: new Substances(scene, sprite)
            }
            let newCard = cards[name];
            return (newCard.render(x, y, type));
        }
    }
}