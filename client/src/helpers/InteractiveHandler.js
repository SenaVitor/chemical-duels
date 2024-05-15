export default class InteractiveHandler {
    constructor(scene) {

        scene.cardPreview = null;

        scene.dealCards.on('pointerdown', () => {
            scene.socket.emit("dealCards", scene.socket.id);
            scene.dealCards.disableInteractive();
        });

        scene.dealCards.on('pointerover', () => {
            scene.dealCards.setColor('#ff69b4');
        });

        scene.dealCards.on('pointerout', () => {
            scene.dealCards.setColor('#00ffff');
        });

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.activePointer;
            if(gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(
                    pointer.worldX, pointer.worldY - 70, gameObjects[0].data.values.sprite
                );
            }
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            if(gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack" && scene.cardPreview) {
                scene.cardPreview.setVisible(false);
            }
        });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff69b4);
            scene.children.bringToTop(gameObject);
            scene.cardPreview.setVisible(false);
        });

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if(!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            if(scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready" && gameObject.data.list.name !== "substance") {
                gameObject.x = (dropZone.x - 250) + (dropZone.data.values.cards * 50);
                gameObject.y = dropZone.y;
                scene.dropZone.data.values.cards++;
                scene.input.setDraggable(gameObject, false);
                scene.socket.emit('cardPlayed', gameObject.data.values, scene.socket.id);
            } else {
                if(gameObject.data.list.name === "substance"){
                    const sprites = ["no", "naoh", "naf", "nacl", "mno", "mgo", "kf", "kbr", "hcl", "h2so4", "h2o", "cs2", "cas", "c2h2", "bro"];
                    let numCards = scene.dropZone.data.values.cards;
                    sprites.forEach((sprite, i) => {
                        if(!Array.isArray(scene.substancesPreview)) scene.substancesPreview = [];
                        if(i > sprites.length/2 && numCards === scene.dropZone.data.values.cards + i) numCards = scene.dropZone.data.values.cards;
                        const card = scene.DeckHandler.dealCard((scene.dropZone.x - 250) + (numCards * 75), 
                        i <= sprites.length/2 ? scene.dropZone.y - 50 : scene.dropZone.y + 50, "substance", "playerCard", sprite);
                        // scene.dropZone.data.values.cards++;
                        // scene.substancesPreview.push(scene.add.image(
                        //     (scene.dropZone.x - 250) + (numCards * 75), 
                        //     i <= sprites.length/2 ? scene.dropZone.y - 50 : scene.dropZone.y + 50, 
                        //     sprite
                        // ).setScale(0.5));
                        numCards++;
                    });
                }
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
    }
}