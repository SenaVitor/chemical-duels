import CardBack from "./cards/CardBack";
import Element from "./cards/Element";
import Substance from "./cards/Substance";

export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type, sprite) => {
            let cards = {
                cardBack: new CardBack(scene, sprite),
                element: new Element(scene, sprite),
                substance: new Substance(scene, sprite)
            }
            let newCard = cards[name];
            return (newCard.render(x, y, type));
        }
    }
}