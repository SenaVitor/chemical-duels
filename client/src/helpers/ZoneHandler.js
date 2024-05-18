export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y) => {
            const dropZone = scene.add.zone(x, y, 600, 200).setRectangleDropZone(600, 300);
            dropZone.setData({
                "cards": 0
            });
            return dropZone;
        }
        this.renderOutline = (dropZone) => {
            const dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xff69b4);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, 
                dropZone.input.hitArea.width, dropZone.input.hitArea.height);
                
            const dropZoneImage = scene.add.image(
                dropZone.input.hitArea.width - 285, 
                dropZone.input.hitArea.height + 5, 
                "logo"
            ).setScale(1.5, 0.52);
            return dropZoneImage;
        }

        this.buildSubstancesZone = (dropZone) => {
            const substancesZone = scene.add.image(
                dropZone.input.hitArea.width - 285, 
                dropZone.input.hitArea.height + 5, 
                "logo"
            ).setScale(1.5, 0.52);
            substancesZone.setVisible(false).setDepth(1);
            return substancesZone;
        }
    }
}