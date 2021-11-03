import BT from "./BT";

export default class BST extends BT { 


    createNode(value){
        return new BSTNode(value, this.numInsertedTotal);
    }

   
}



    