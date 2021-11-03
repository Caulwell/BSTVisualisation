import BT from "./BT";
import BSTNode from "./BSTNode";

export default class BST extends BT { 


    createNode(value){
        return new BSTNode(value, this.numInsertedTotal);
    }

   
}



    