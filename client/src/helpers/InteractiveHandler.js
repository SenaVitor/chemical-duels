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
                ).setDepth(2);
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
            if(scene.cardPreview) scene.cardPreview.setVisible(false);
        });

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if(!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            if(gameObject.data && gameObject.data.list && gameObject.data.list.name === "substance"){
                const index = scene.substancesPreview.indexOf(substance => substance.sprite === gameObject.data.list.sprite);
                const substance = scene.substancesPreview.splice(index, 1);
                stopShowSubstances(scene);
            }
            playCard(gameObject, dropZone, scene);
        });

        scene.listSubstances.on('pointerdown', () => {
            if(!scene.listingSubstances){
                const sprites = ["no", "naoh", "naf", "nacl", "mno", "mgo", "kf", "kbr", "hcl", "h2so4", "h2o", "cs2", "cas", "c2h2", "bro"];
                let numCards = 0;
                sprites.forEach((sprite, i) => {
                    if(!Array.isArray(scene.substancesPreview)) scene.substancesPreview = [];
                    if(i > sprites.length/2 && numCards > 7) numCards = 0;
                    const x = (scene.dropZone.x - 250) + (numCards * 70);
                    const y = i <= sprites.length/2 ? scene.dropZone.y - 50 : scene.dropZone.y + 50;
                    const card = scene.DeckHandler.dealCard(x, y, "substance", "playerCard", sprite).setDepth(2);
                    scene.substancesPreview.push(card);
                    scene.listingSubstances = true;
                    numCards++;
                });
                scene.substancesZone.setVisible(true);
            }else{
                scene.substancesPreview.forEach(card => {
                    card.destroy();
                });
                scene.listingSubstances = false;
                scene.substancesZone.setVisible(false);
            }
        });
        
        scene.playSubstance.on('pointerdown', () => {
            if(scene.dropZone.data.values.cards < 2) return;
            if(!scene.listingSubstances){
                scene.substancesZone.setVisible(true);
                const sprites = ["no", "naoh", "naf", "nacl", "mno", "mgo", "kf", "kbr", "hcl", "h2so4", "h2o", "cs2", "cas", "c2h2", "bro"];
                const spriteList = scene.cards.map(card => card.data.list.sprite);
                const possibleSubstances = findPossibleCombinations(spriteList, sprites);
                let numCards = 0;
                possibleSubstances.forEach((substance, i) => {
                    if(!Array.isArray(scene.substancesPreview)) scene.substancesPreview = [];
                    if(numCards > 7 && i <= possibleSubstances.length/2) numCards = 0;
                    const card = scene.DeckHandler.dealCard(
                        (scene.dropZone.x - 250) + (numCards * 70), 
                        numCards > 7 && i <= possibleSubstances.length/2 ? scene.dropZone.y + 50 : scene.dropZone.y - 50, 
                        "substance", 
                        "playerCard", 
                        substance
                    ).setDepth(2);
                    scene.substancesPreview.push(card);
                    scene.listingSubstances = true;
                    numCards++;
                });
            }else{
                stopShowSubstances(scene);
            }
        });

        // scene.input.on('pointerdown', (pointer, gameObject, dropZone) => {
        //     if(gameObject.data && gameObject.data.list && gameObject.data.list.name === "substance"){
        //         console.log(gameObject);
        //         playCard(gameObject, dropZone, scene);
        //         stopShowSubstances(scene);
        //     }
        // });
    }
}

function playCard(gameObject, dropZone, scene){
    if(scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready" && gameObject.data.list.name !== "cardBack") {
        gameObject.x = (dropZone.x - 250) + (dropZone.data.values.cards * 50);
        gameObject.y = dropZone.y;
        if(!scene.cards) scene.cards = [];
        scene.cards.push(gameObject);
        scene.dropZone.data.values.cards++;
        scene.input.setDraggable(gameObject, false);
        scene.socket.emit('cardPlayed', gameObject.data.values, scene.socket.id);
    } else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
    }
}

function stopShowSubstances(scene) {
    scene.substancesPreview.forEach(card => {
        card.destroy();
    });
    scene.listingSubstances = false;
    scene.substancesZone.setVisible(false);
}

function getAllCombinations(arr) {
    let result = [];
    function combine(prefix, arr) {
        for (let i = 0; i < arr.length; i++) {
            if(prefix + arr[i] === "hso"){
                if(!result.includes("h2so4")) result.push("h2so4");
            }else if(prefix + arr[i] === "ho"){
                if(!result.includes("h2o")) result.push("h2o");
            }else if(prefix + arr[i] === "cs"){
                if(!result.includes("cs2")) result.push("cs2");
            }else if(prefix + arr[i] === "ch"){
                if(!result.includes("c2h2")) result.push("c2h2");
            }else{
                if(!result.includes(prefix + arr[i])) result.push(prefix + arr[i]);
            }
            
            if(arr[i] + prefix === "hso"){
                if(!result.includes("h2so4")) result.push("h2so4");
            }else if(arr[i] + prefix === "ho"){
                if(!result.includes("h2o")) result.push("h2o");
            }else if(arr[i] + prefix === "cs"){
                if(!result.includes("cs2")) result.push("cs2");
            }else if(arr[i] + prefix === "ch"){
                if(!result.includes("c2h2")) result.push("c2h2");
            }else{        
                if(!result.includes(arr[i] + prefix)) result.push(arr[i] + prefix);
            }
            
            combine(prefix + arr[i], arr.slice(i + 1));
        }
    }
    combine('', arr);
    return result.filter(combination => combination.length > 0);
}


function findPossibleCombinations(spriteList, sprites) {
    const combinations = getAllCombinations(spriteList);
    return combinations.filter(combination => sprites.includes(combination));
}