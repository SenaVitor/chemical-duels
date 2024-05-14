import CardBack from "./cards/CardBack";
import Element from "./cards/Element";
import Substance from "./cards/Substance";

export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type, complement) => {
            let sprite;
            let elements = [];
            if(Array.isArray(complement)){
                elements = complement;
            }else{
                sprite = complement;
            } 
            let cards = {
                cardBack: new CardBack(scene),
                element: new Element(scene, sprite),
                substance: new Substance(scene, elements)
            }
            let newCard = cards[name];
            return (newCard.render(x, y, type));
        }
    }
}