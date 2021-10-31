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

function insertAnimation(node, animationSpeed){

    const differenceX = node.x-20;
    const differenceY = node.y-20;

    const maxDuration = 3000;

    anime({
        targets: ".insertNode",
        translateX: {value: differenceX, duration: maxDuration*animationSpeed},
        translateY: {value: differenceY, duration: maxDuration*animationSpeed}
    });
}

function moveNodes(nodes, animationSpeed){

    console.log(nodes);

    const maxDuration = 500;

    const tl = anime.timeline({
    
    });  

    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`moving${node.id}`);

        tl.add({
            targets: `.moving${node.id}`,
            translateX: {value: node.x-20, duration: maxDuration*animationSpeed},
            translateY: {value: node.y-20, duration: maxDuration*animationSpeed}
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



export {insertAnimation, searchAnimation, moveNodes, traversalAnimation};
