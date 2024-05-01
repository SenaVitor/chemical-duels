import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
    constructor(scene) {
        const config = {
            width: 800,
            height: 600
        };
        this.zoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZone = this.zoneHandler.renderZone(315, 305);
            this.zoneHandler.renderOutline(scene.dropZone);
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = scene.add.rectangle(315, 530, 600, 126);
            scene.playerHandArea.setStrokeStyle(4, 0xff69b4);
            scene.playerDeckArea = scene.add.rectangle(670, 530, 85, 118);
            scene.playerDeckArea.setStrokeStyle(3, 0x00ffff);
            
            scene.opponentHandArea = scene.add.rectangle(315, 80, 600, 126);
            scene.opponentHandArea.setStrokeStyle(4, 0xff69b4);
            scene.opponentDeckArea = scene.add.rectangle(670, 80, 85, 118);
            scene.opponentDeckArea.setStrokeStyle(3, 0x00ffff);
        }

        this.buildGameText = () => {
            scene.dealCards = scene.add.text(643, 300, "Deal Cards").setFontSize(14).setFontFamily("Trebuchet MS");
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildPlayerAreas();
            this.buildGameText();
        }
    }
}