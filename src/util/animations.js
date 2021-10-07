import anime from "animejs";


function insertAnimation(node){

    const differenceX = node.x-20;
    const differenceY = node.y-20;

    anime({
        targets: ".insertNode",
        translateX: {value: differenceX, duration: 1200},
        translateY: {value: differenceY, duration: 1200}
    });
}

function shiftNodesAnimation(nodes){

    // A bit crude - AMEND IN FUTURE

    for(let i = 0; i < nodes.length; i++){

        let HTMLnode = document.getElementById(nodes[i].id);
        let arrow = document.getElementById(`arrow${nodes[i].id}`);
        let node = nodes[i];

        arrow.classList.add("extending");
        HTMLnode.classList.add("shifting");

        anime({
            targets: ".extending",
            opacity: 0,
            duration: 200
        });

        anime({
            targets: ".shifting",
            translateX: {value: node.x-20, duration: 200}
        });

        anime({
            targets: ".extending",
            opacity: 1,
            duration: 200
        });

        
        arrow.classList.remove("extending");
        HTMLnode.classList.remove("shifting");
        
    }

}






export {insertAnimation, shiftNodesAnimation};
