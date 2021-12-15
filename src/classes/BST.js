import BT from "./BT";
import BSTNode from "./BSTNode";

export default class BST extends BT { 

    /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            TREE GENERATION HELPERS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */

    // used by generic BT insert method to create correct node type
    createNode(value){
        return new BSTNode(value, this.numInsertedTotal);
    }

    // used to load from file
    createNodeFromJSON(node){
        return new BSTNode(node.value, node.id, node.parent, node.left, node.right, node.depth, node.x, node.y, node.lr)
    }

    // used to convert between trees or generate tree from CSV
    getTreeFromValues(values){
        values.forEach(value => {
            this.insert(value);
        });
    }

   
}



    