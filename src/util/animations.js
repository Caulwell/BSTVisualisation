import anime from "animejs";

function searchAnimation(nodes, foundNode, animationSpeed){

    const maxDuration = 1000;

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
            scale: {value: 1, duration: maxDuration*animationSpeed+100}
        });

        HTMLnode.classList.remove(`highlighting${node.id}`);
    
    }

    let HTMLnode = document.getElementById(foundNode.id);
    HTMLnode.classList.add("foundNodeHighlight");

    tl.add({
        targets: ".foundNodeHighlight",
        scale: {value: 2, duration: maxDuration*animationSpeed+200}
    });
    tl.add({
        targets: ".foundNodeHighlight",
        scale: {value: 1, duration: maxDuration*animationSpeed+200}
    });

    HTMLnode.classList.remove("foundNodeHighlight");
   
}

function insertAnimation(testNodes, node, animationSpeed){

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

function checkBalanceAnimation(testNodes, foundNode, animationSpeed){

    return new Promise((resolve, reject) => {

        const maxDuration = 3000;

        const tl = anime.timeline({
        
        });

        
        // function to resolve promise if !foundNode and loop of animations finished
        const checkLoopComplete = index => {
            if(index == testNodes.length -1){
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

    const maxDuration = 500;

    const tl = anime.timeline({
    
    });  

    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`moving${node.id}`);

        tl.add({
            targets: `.moving${node.id}`,
            translateX: {value: node.moveToX-20, duration: maxDuration*animationSpeed},
            translateY: {value: node.moveToY-20, duration: maxDuration*animationSpeed}
        });

        HTMLnode.classList.remove(`moving${node.id}`);
    }

}


function traversalAnimation(nodes, animationSpeed){

    const maxDuration = 1000;

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
            scale: {value: 1, duration: maxDuration*animationSpeed+100}
        });
    
    }
}



export {insertAnimation, checkBalanceAnimation, searchAnimation, moveNodes, traversalAnimation};
