import anime from "animejs";


function insertAnimation(node){

    const differenceX = node.x - 20;
    const differenceY = node.y - 20;

    anime({
        targets: ".insertNode",
        translateX: {value: differenceX, duration: 1200},
        translateY: {value: differenceY, duration: 1200}
    });
}

function shiftNodesAnimation(nodes){

    // A bit crude - AMEND IN FUTURE

    for(let i = 0; i < nodes.length; i++){
        let node = document.getElementById(nodes[i].id);
        node.classList.add("shifting");
        anime({
            targets: ".shifting",
            translateX: {value: nodes[i].x, duration: 2000}
        });
        node.classList.remove("shifting");
    }

}






export {insertAnimation, shiftNodesAnimation};
