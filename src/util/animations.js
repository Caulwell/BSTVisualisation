import anime from "animejs";




function passingHighlightNode(nodes){

    const tl = anime.timeline({
    
    });
    

    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`highlighting${node.id}`);

        tl.add({
            targets: `.highlighting${node.id}`,
            scale: {value: 1.5, duration: 1000},
        })
        tl.add({
            targets: `.highlighting${node.id}`,
            scale: {value: 1, duration: 1000}
        });
    
    }  
   
}

function insertAnimation(node){

    const differenceX = node.x-20;
    const differenceY = node.y-20;

    anime({
        targets: ".insertNode",
        translateX: {value: differenceX, duration: 1200},
        translateY: {value: differenceY, duration: 1200}
    });
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}

function moveNodes(nodes){

    const tl = anime.timeline({
    
    });
    

    for(let i = 0; i < nodes.length; i++){

        let node = nodes[i];
        let HTMLnode = document.getElementById(node.id);
        HTMLnode.classList.add(`moving${node.id}`);

        tl.add({
            targets: `.moving${node.id}`,
            translateX: {value: node.x-20, duration: 1000},
            translateY: {value: node.y-20, duration: 1000}
        });

        HTMLnode.classList.remove(`moving${node.id}`);
    
    }
}




export {insertAnimation, passingHighlightNode, moveNodes};
