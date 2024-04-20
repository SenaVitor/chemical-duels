import UIHandler from "../helpers/UIHandler"

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        })
    }

    preload() {

    }

    create() {
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
    }
    
    update() {

    }
}