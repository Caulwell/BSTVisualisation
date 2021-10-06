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






export {insertAnimation};
