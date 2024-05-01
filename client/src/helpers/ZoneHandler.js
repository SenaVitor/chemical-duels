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
        }
    }
}