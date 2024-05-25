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
            if(gameObjects[0].type === "Image" && gameObjects[0].data && gameObjects[0].data.list && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(
                    pointer.worldX, pointer.worldY - 70, gameObjects[0].data.values.sprite
                ).setDepth(2);
            }
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            if(gameObjects[0].type === "Image" && gameObjects[0].data && gameObjects[0].data.list && gameObjects[0].data.list.name !== "cardBack" && scene.cardPreview) {
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
                scene.GameHandler.score += 20;
            }else{
                scene.GameHandler.score += 5;
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
            if(scene.dropZone.data.values.playerCards < 2) return;
            if(!scene.listingSubstances){
                scene.substancesZone.setVisible(true);
                const sprites = ["no", "naoh", "naf", "nacl", "mno", "mgo", "kf", "kbr", "hcl", "h2so4", "h2o", "cs2", "cas", "c2h2", "bro"];
                const spriteList = scene.cards.map(card => {
                    if(card.data.list.name !== "substance")
                        return card.data.list.sprite;
                });
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
    }
}

function playCard(gameObject, dropZone, scene){
    if(scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready" && gameObject.data.list.name !== "cardBack") {
        if(gameObject.data && gameObject.data.list && gameObject.data.list.name === "substance"){
            // const index = scene.substancesPreview.indexOf(substance => substance.sprite === gameObject.data.list.sprite);
            // let substance = scene.substancesPreview.splice(index, 1);
            // substance[0].setDepth(0);
            const card = scene.DeckHandler.dealCard(dropZone.x, dropZone.y, "substance", "playerCard", gameObject.data.list.sprite);
            const elements = getElements(gameObject.data.list.sprite);
            removeElements(elements, scene);
            stopShowSubstances(scene);
            gameObject = card;
        }
        gameObject.x = (dropZone.x - 250) + (dropZone.data.values.playerCards * 100);
        gameObject.y = dropZone.y + 70;
        if(!scene.cards) scene.cards = [];
        scene.cards.push(gameObject);
        dropZone.data.values.playerCards++;
        scene.input.setDraggable(gameObject, false);
        scene.socket.emit('cardPlayed', gameObject.data.values, scene.socket.id);
    } else {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
    }
}

function removeElements(elements, scene){
    elements.forEach(char => {
        let index = scene.cards.findIndex(card => card.data.list.sprite === char);
        if (index !== -1) {
            if(scene.cards[index].data.list.type === "playerCard"){
                scene.dropZone.data.values.playerCards--;
            }else{
                scene.dropZone.data.values.opponentCards--;
            } 
            scene.cards[index].destroy();
            scene.cards.splice(index, 1);
        }
    });
    orderCards(scene);
}

function orderCards(scene){
    let playerIndex = 0;
    let opponentIndex = 0;
    scene.cards.forEach(card => {
        if(card.data.list.type === "playerCard"){
            card.x = (scene.dropZone.x - 250) + (playerIndex * 100);
            playerIndex++;
        } else{
            card.x = (scene.dropZone.x - 250) + (opponentIndex * 100);
            opponentIndex++;
        }
            
    }); 
}

function getElements(substance) {
    const substances = {
        no: ["n", "o"],
        naoh: ["na", "o", "h"],
        naf: ["na", "f"],
        nacl: ["na", "cl"],
        mno: ["mn", "o"],
        mgo: ["mg", "o"],
        kf: ["k", "f"],
        kbr: ["k", "br"],
        hcl: ["h", "cl"],
        h2so4: ["h", "s", "o"],
        h2o: ["h", "o"],
        cs2: ["c", "s"],
        cas: ["ca", "s"],
        c2h2: ["c", "h"],
        bro: ["br", "o"],
    };

    const elements = substances[substance];
    return elements;
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