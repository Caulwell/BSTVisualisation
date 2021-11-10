import BT from "./BT";
import BSTNode from "./BSTNode";

export default class BST extends BT { 


    createNode(value){
        return new BSTNode(value, this.numInsertedTotal);
    }

    createNodeFromJSON(node){
        return new BSTNode(node.value, node.id, node.parent, node.left, node.right, node.depth, node.x, node.y, node.lr)
    }

   
}



    