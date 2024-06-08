import CardBack from "./cards/CardBack";
import Element from "./cards/Element";
import Substance from "./cards/Substance";

export default class DeckHandler {
    constructor(scene) {
        this.sprites = [
            "br", "c", "ca", "cl", "f", "h", "k", "mg", "mn", "n", "na", "o", "s", "transmutacao", "lavoisier",
            "br", "c", "ca", "cl", "f", "h", "k", "mg", "mn", "n", "na", "o", "s"
        ];
        this.dealCard = (x, y, name, type, complement) => {
            let sprite;
            let elements = [];
            if(name === "substance"){
                elements = complement;
            }else{
                if(complement){
                    sprite = complement;
                }else{
                    const index = Math.floor(Math.random() * this.sprites.length);
                    sprite = this.sprites[index];
                    this.sprites.splice(index, 1);  
                }
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