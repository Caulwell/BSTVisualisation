import anime from "animejs";

function searchAnimation(nodes, foundNode, animationSpeed){
    //CYCLES THROUGH NODES, HIGHLIGHTING EACH ONE, THEN HIGHLIGHTS FOUND NODE
    

    return new Promise((resolve, reject) => {

        const maxDuration = 1000;

        const tl = anime.timeline({
        
        });

        // IF NO FOUND NODE, RESOLVES DONE ON LAST ITERATION OF NODES
        const testFinalAnimationDone = i => {

            if(i === nodes.length -1){
                resolve("done");
            }
        }
        
        for(let i = 0; i < nodes.length; i++){
    
            let node = nodes[i];
            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add(`highlighting${node.id}`);
    
            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1.5, duration: maxDuration*animationSpeed+100},
            });
            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1, duration: maxDuration*animationSpeed+100},
                complete: (anim) => {
                    if(!foundNode) testFinalAnimationDone(i);
                }
            });
    
            HTMLnode.classList.remove(`highlighting${node.id}`);
        
        }
    
        // PLAYS ANIMATION THEN ON COMPLETION, RESOLVES PROMISE
        if(foundNode){
            let HTMLnode = document.getElementById(foundNode.id);
            HTMLnode.classList.add("foundNodeHighlight");
    
            tl.add({
                targets: ".foundNodeHighlight",
                scale: {value: 2, duration: maxDuration*animationSpeed+200}
            });
            tl.add({
                targets: ".foundNodeHighlight",
                scale: {value: 1, duration: maxDuration*animationSpeed+200},
                complete: anim => {
                    resolve("done");
                }
            });
    
            HTMLnode.classList.remove("foundNodeHighlight");
        }
    })

   

    
   
}

function insertAnimation(testNodes, node, animationSpeed){
    // HIGHLIGHTS EACH TESTNODES, THEN PLAYS INSERT ANIMATION ON NODE, THEN RESOLVES PROMISE

    return new Promise((resolve, reject) => {


        const maxDuration = 3000;

        const tl = anime.timeline({
            
        });

        // highlight each node on the way
        
        testNodes.forEach(element => {

            let node = element;

            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add(`highlighting${node.id}`);

            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1.5, duration: maxDuration*animationSpeed+100},
            });
            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1, duration: maxDuration*animationSpeed+100}
            });

            HTMLnode.classList.remove(`highlighting${node.id}`);
        });

        // insert node

        // node initially set not on x coordinate, but 20,20, animate from this coordinate to true coordinates
        const differenceX = node.x-20;
        const differenceY = node.y-20;

        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`insertNode`);

        tl.add({
            targets: ".insertNode",
            translateX: {value: differenceX, duration: maxDuration*animationSpeed},
            translateY: {value: differenceY, duration: maxDuration*animationSpeed},
            complete: (anim) => {
                resolve("done");
            }
        });

        HTMLnode.classList.remove("insertNode");
    });

    
}

function deleteAnimation(testNodes, node, animationSpeed){

    // HIGHLIGHTS EACH TESTNODES, THEN PLAYS DELETE ANIMATION ON NODE, THEN RESOLVES PROMISE
    // IF NO NODE, RESOLVES PROMISE

    return new Promise((resolve, reject) => {


        const maxDuration = 3000;

        const tl = anime.timeline({
            
        });

        // highlight each node on the way
        
        testNodes.forEach(element => {

            let node = element;

            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add(`highlighting${node.id}`);

            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1.5, duration: maxDuration*animationSpeed+100},
            });
            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1, duration: maxDuration*animationSpeed+100}
            });

            HTMLnode.classList.remove(`highlighting${node.id}`);
        });

        // delete node

        if(!node){
            resolve("done");
            return;
        }
        
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`deleteNode`);

        tl.add({
            targets: `.deleteNode`,
            scale: {value: 2, duration: maxDuration*animationSpeed+100},
        });
        tl.add({
            targets: `.deleteNode`,
            scale: {value: 1, duration: maxDuration*animationSpeed+100}
        });

        tl.add({
            targets: ".deleteNode",
            translateY: {value: 1000, duration: maxDuration*animationSpeed},
            complete: (anim) => {
                resolve("done");
            }
        });

        HTMLnode.classList.remove("deleteNode");
    });

    
}

function checkBalanceAnimation(testNodes, foundNode, animationSpeed){

    // PLAYS ANIMATION ON ALL TESTNODES, THEN IF NO FOUNDNODE, RESOLVES PROMISE

    return new Promise((resolve, reject) => {

        const maxDuration = 3000;

        const tl = anime.timeline({
        
        });

        
        // function to resolve promise if !foundNode and loop of animations finished
        const checkLoopComplete = index => {
            if(index === testNodes.length -1){
                if(!foundNode) resolve("done");
            }
        };

        // highlight each node on the way
        testNodes.forEach((element, index) => {

            let node = element;

            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add(`highlighting${node.id}`);

            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1.5, duration: maxDuration*animationSpeed+100},
            });
            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1, duration: maxDuration*animationSpeed+100},
                complete: anim => {
                    checkLoopComplete(index);
                }
            });

            HTMLnode.classList.remove(`highlighting${node.id}`);
        });

        // if an unbalanced node is found
        if(foundNode){
            let HTMLnode = document.getElementById(foundNode.id);
            HTMLnode.classList.add("foundNodeHighlight");

            tl.add({
                targets: ".foundNodeHighlight",
                scale: {value: 2, duration: maxDuration*animationSpeed+200}
            });
            tl.add({
                targets: ".foundNodeHighlight",
                scale: {value: 1, duration: maxDuration*animationSpeed+200},
                complete: (anim) => {
                    resolve("done");
                }
            });

            HTMLnode.classList.remove("foundNodeHighlight");
        }
        
    });

    
}

function moveNodes(nodes, animationSpeed){

    // QUICKLY SHIFTS ALL NODES TO NEW POSITIONS
    // ON COMPLETION, RESOLVES PROMISE

    return new Promise((resolve, reject) => {

        if(nodes.length === 0) resolve("done");

        const maxDuration = 500;

        const tl = anime.timeline({
        
        });  

        // function to resolve promise if loop of animations finished
        const checkLoopComplete = index => {
            if(index === nodes.length -1){
                resolve("done");
            }
        };

        for(let i = 0; i < nodes.length; i++){
            
            let node = nodes[i];
            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add(`moving${node.id}`);

            tl.add({
                targets: `.moving${node.id}`,
                translateX: {value: node.moveToX-20, duration: maxDuration*animationSpeed},
                translateY: {value: node.moveToY-20, duration: maxDuration*animationSpeed},
                complete: (anim) => {
                    checkLoopComplete(i);
                }
            });

            HTMLnode.classList.remove(`moving${node.id}`);
        }

    });
    
}


function traversalAnimation(nodes, animationSpeed){

    // PLAYS ANIMATION ON ALL NODES THEN RESOLVES PROMISE

    return new Promise((resolve, reject) => {

        const maxDuration = 1000;

        const testFinalAnimationDone = (i) => {
            if(i === nodes.length -1){
                resolve("done");
            }
        }

        const tl = anime.timeline({
        
        });
        
        for(let i = 0; i < nodes.length; i++){

            let node = nodes[i];
            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add(`highlighting${node.id}`);

            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1.5, duration: maxDuration*animationSpeed+100},
            });
            tl.add({
                targets: `.highlighting${node.id}`,
                scale: {value: 1, duration: maxDuration*animationSpeed+100},
                complete: (anim) => {
                    testFinalAnimationDone(i);
                }
            });
        
        }
    });

    
}

function quickInsert(node){

    // QUICK INSERTION TO MOVE ALL NODES IN A GENERATED TREE TO TRUE COORDINATES
    
    const differenceX = node.x -20;
    const differenceY = node.y -20;
    

    let HTMLnode = document.getElementById(node.id);
    HTMLnode.classList.add(`inserting`);
    

    anime({
        targets: ".inserting",
        translateX: {value: differenceX, duration: 20},
        translateY: {value: differenceY, duration: 20}
    });

    HTMLnode.classList.remove("inserting");
   
}



export {insertAnimation, deleteAnimation, checkBalanceAnimation, searchAnimation, moveNodes, traversalAnimation, quickInsert};
