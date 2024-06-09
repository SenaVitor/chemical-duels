import Card from "./Card";

export default class Substance extends Card {
    constructor(scene, elements) {
        super(scene);
        if(!elements) return;
        let substance = "";
        const substances = {
            bro: {enthalpy: 125, type: "endothermic"},
            c2h2: {enthalpy: 226, type: "endothermic"},
            cas: {enthalpy: 482, type: "exothermic"},
            cs2: {enthalpy: 89, type: "endothermic"},
            h2o: {enthalpy: 286, type: "exothermic"},
            h2so4: {enthalpy: 811, type: "exothermic"},
            hcl: {enthalpy: 167, type: "exothermic"},
            kbr: {enthalpy: 392, type: "exothermic"},
            kf: {enthalpy: 562, type: "exothermic"},
            mgo: {enthalpy: 601, type: "exothermic"},
            mno: {enthalpy: 384, type: "exothermic"},
            nacl: {enthalpy: 411, type: "exothermic"},
            naf: {enthalpy: 569, type: "exothermic"},
            naoh: {enthalpy: 425, type: "exothermic"},
            no: {enthalpy: 90, type: "endothermic"}
        };

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
        if(substances[substance]){
            this.enthalpy = substances[substance].enthalpy;
            this.cardType = substances[substance].type;
        }
    }
}