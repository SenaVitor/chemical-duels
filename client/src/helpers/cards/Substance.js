import Card from "./Card";

export default class Substance extends Card {
    constructor(scene, elements) {
        super(scene);
        if(!elements) return;
        let substance = "";
        if(!Array.isArray(elements)){
            substance = elements;
        }else{
            elements.forEach(element => {
                substance += element;
            });
            if(substance === "hso"){
                substance = "h2so4";
            }else if(substance === "ho"){
                substance = "h2o";
            }else if(substance === "cs"){
                substance = "cs2";
            }else if(substance === "ch"){
                substance = "c2h2";
            }
        }

        this.name = "substance";
        this.playerCardSprite = substance;
        this.opponentCardSprite = substance;
    }
}