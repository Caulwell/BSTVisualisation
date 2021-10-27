import anime from "animejs";

function searchAnimation(nodes, foundNode){

    const tl = anime.timeline({
    
    });
    
    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`highlighting${node.id}`);

        tl.add({
            targets: `.highlighting${node.id}`,
            scale: {value: 1.5, duration: 500},
        });
        tl.add({
            targets: `.highlighting${node.id}`,
            scale: {value: 1, duration: 500}
        });
    
    }

    let HTMLnode = document.getElementById(foundNode.id);
    HTMLnode.classList.add("foundNodeHighlight");

    tl.add({
        targets: ".foundNodeHighlight",
        scale: {value: 2, duration: 1000}
    });
    tl.add({
        targets: ".foundNodeHighlight",
        scale: {value: 1, duration: 500}
    });
   
}

function insertAnimation(node){

    const differenceX = node.x-20;
    const differenceY = node.y-20;

    anime({
        targets: ".insertNode",
        translateX: {value: differenceX, duration: 1000},
        translateY: {value: differenceY, duration: 1000}
    });
}

function moveNodes(nodes){
    
    const tl = anime.timeline({
    
    });

    console.log(nodes);
    

    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        console.log("trying to shift: " + node.value);
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`moving${node.id}`);

        tl.add({
            targets: `.moving${node.id}`,
            translateX: {value: node.x-20, duration: 500},
            translateY: {value: node.y-20, duration: 500}
        });

        HTMLnode.classList.remove(`moving${node.id}`);
    
    }
}


function traversalAnimation(nodes){

    const tl = anime.timeline({
    
    });
    
    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`highlighting${node.id}`);

        tl.add({
            targets: `.highlighting${node.id}`,
            scale: {value: 1.5, duration: 500},
        });
        tl.add({
            targets: `.highlighting${node.id}`,
            scale: {value: 1, duration: 500}
        });
    
    }
}



export {insertAnimation, searchAnimation, moveNodes, traversalAnimation};
