import BT from "./BT";
import AVLNode from "./AVLNode";

export default class AVL extends BT { 

    constructor(){
        super();
    }

    insert(value){

        this.affectedNodes = [];

        let curr = this.root;
        const node = new AVLNode(value, this.numInsertedTotal);

        if(this.root === null){
            this.insertAtTop(value);
            return;

        } else {

            for(;;){
                if(value < curr.value ){

                    if(curr.left === null){
                        this.addLeftChild(curr, node);
                        return;
                    }

                    curr = curr.left; 

                } else if(value > curr.value || value === curr.value) {
                    if(curr.right === null){
                        this.addRightChild(curr, node);
                        return;
                    }

                    curr = curr.right; 
                }
            }
        }
    }

    insertAtTop(value){
        const node = new AVLNode(value, this.numInsertedTotal);
        this.setRoot(node);
        node.setX(window.innerWidth * 0.43);
        node.setY(window.innerHeight * 0.1);
        this.numNodes++;
        this.numInsertedTotal++;
    }

    
    addLeftChild(curr, node){

        curr.setLeft(node);
        node.setX(node.parent.x -50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;

        this.updateAvlValues(node.parent);
        this.checkBalanced(node.parent);

    }

    addRightChild(curr, node){

        curr.setRight(node);
        node.setX(node.parent.x + 50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;

        this.updateAvlValues(node.parent);
        this.checkBalanced(node.parent); 

    }

    checkBalanced(node){

        if(node){
            let nodeLeftHeight = node.left ? node.left.getHeight() : 0;
            let nodeRightHeight = node.right ? node.right.getHeight() : 0;
            if(Math.abs(nodeLeftHeight - nodeRightHeight) > 1){
                this.balanceNode(node);
            } else {
                this.checkBalanced(node.parent);
            }
        } else {
            return;
        }
    }

    balanceNode(node){
        console.log(node);
    }

    leftRotation(){

    }

    rightRotation(){

    }

    leftRightRotation(){

    }

    rightLeftRotation(){

    }

    updateAvlValues(node){

        if(node){
            node.setHeight(this.updateHeight(node));

            let nodeLeftHeight = node.left ? node.left.getHeight() : 0;
            let nodeRightHeight = node.right ? node.right.getHeight() : 0;

            node.setBalanceFactor(Math.abs(nodeLeftHeight - nodeRightHeight));

            this.updateAvlValues(node.parent);
        } else {
            return;
        }
        
    }

    updateHeight(node){
        if(!node || (!node.left && !node.right)){
            return 0;
        } else {
            let height = Math.max(this.updateHeight(node.left), this.updateHeight(node.right)) +1;
            return height;
        }

    }

   
}



    