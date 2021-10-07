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
    console.log(nodes);


    for(let i = 0; i < nodes.length; i++){


        let HTMLnode = document.getElementById(nodes[i].id);
        let arrow = document.getElementById(`arrow${nodes[i].id}`);
        let node = nodes[i];

        console.log(arrow);
        arrow.classList.add("extending");
        HTMLnode.classList.add("shifting");

        anime({
            targets: ".shifting",
            translateX: {value: nodes[i].x-20, duration: 2000}
        });

        // anime({
        //     targets: ".extending",
        //     d: node.lr == "l" ? `M ${node.parent.x-13},${node.parent.y+13} L ${node.x+13},${node.y-13}` : `M ${node.parent.x+13},${node.parent.y+13} L ${node.x-13},${node.y-13}`,
        //     easing: "linear",
        //     duration: 3000,
        //     autoplay: true
        // });

        arrow.classList.remove("extending");
        HTMLnode.classList.remove("shifting");
    }

}






export {insertAnimation, shiftNodesAnimation};
