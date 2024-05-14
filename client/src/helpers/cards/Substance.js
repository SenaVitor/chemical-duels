import Card from "./Card";

export default class Substance extends Card {
    constructor(scene, elements) {
        super(scene);
        if(!elements) return;
        // const sprite = ["no", "naoh", "naf", "nacl", "mno", "mgo", "kf", "kbr", "hcl", "h2so4", "h2o", "cs2", "cas", "c2h2", "bro"];
        // const substances = {
        //     no: ["n", "o"],
        //     naoh: ["na", "o", "h"],
        //     naf: ["na", "f"],
        //     nacl: ["na", "cl"],
        //     mno: ["mn", "o"],
        //     mgo: ["mg", "o"],
        //     kf: ["k", "f"],
        //     kbr: ["k", "br"],
        //     hcl: ["h", "cl"],
        //     h2so4: ["h", "s", "o"],
        //     h2o: ["h", "o"],
        //     cs2: ["c", "s"],
        //     cas: ["ca", "s"],
        //     c2h2: ["c", "h"],
        //     bro: ["br", "o"],
        // };
        let substance = "";
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

        
        console.log("elements = " + elements);
        console.log("substance = " + substance);

        this.name = "substance";
        this.playerCardSprite = substance;
        this.opponentCardSprite = substance;
    }
}