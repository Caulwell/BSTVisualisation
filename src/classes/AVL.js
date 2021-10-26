import BSTNode from "./BSTNode";
import BT from "./BT";
import {moveNodes, searchAnimation, traversalAnimation} from "../util/animations";

export default class AVL extends BT { 

    constructor(){
        super();
    }

    delete(node){

        let shiftNodes = [];

        // IS A LEAF NODE
        if(node.left === null && node.right === null){
            
            if(node === this.root){
                // is root node
                this.setRoot(null);
            } else {
                // not root node
                if(node.parent.left === node) node.parent.setLeft(null);
                if(node.parent.right === node) node.parent.setRight(null);
            }
             

        // ONLY HAS A LEFT CHILD
        } else if (node.left !== null && node.right === null){
  
            // is root node
            if(node === this.root){
                this.setRoot(node.left);
            // not root node
            } else {
                if(node.parent.left === node) node.parent.setLeft(node.left);
                if(node.parent.right === node) node.parent.setRight(node.left);
            }
            // set x and y of left child to removed node
            node.left.setX(node.x);
            node.left.setY(node.y);

            // ready for animation
            shiftNodes = this.values(node.left);

            // set new coordinates for children of left child
            let portionToChange = shiftNodes.slice(1);
            this.setNewCordsOnMove(portionToChange);


        // ONLY HAS A RIGHT CHILD
        } else if (node.right !== null && node.left === null){

            // is root node
            if(node === this.root){
                this.setRoot(node.right);
            // not root node
            } else {
                if(node.parent.left === node) node.parent.setLeft(node.right);
                if(node.parent.right === node) node.parent.setRight(node.right);
            }
           // set x and y of left child to removed node
            node.right.setX(node.x);
            node.right.setY(node.y);

            // ready for animation
            shiftNodes = this.values(node.right);

            // set new coordinates for children of right child
            let portionToChange = shiftNodes.slice(1);
            this.setNewCordsOnMove(portionToChange);

        // HAS TWO CHILDREN
        } else if (node.right !== null && node.left !== null){

            let replacement = this.getLeftMostElement(node.right);

            if(replacement.right !== null && replacement.parent !== node) replacement.parent.setLeft(replacement.right);

            if(replacement.parent.left === replacement) replacement.parent.left = null;
            if(replacement.parent.right === replacement) replacement.parent.right = null;

            // ready for animation - get it so its prior children are grabbed, not its new ones
            shiftNodes = this.values(replacement);

        
            if(node !== this.root){
                // set parent child relationship for replacement
                if(node.parent.left === node) node.parent.setLeft(replacement);
                if(node.parent.right === node) node.parent.setRight(replacement);
            } else {
                this.setRoot(replacement);
            }
            
            // set replacement's new x and y
            replacement.setX(node.x);
            
            replacement.setY(node.y);


            // replacement cannot have a left, so set it to node's left
            replacement.setLeft(node.left);

            // don't want to set right to itself, but if node did have a right, set it for replacement
            if(node.right !== replacement && node.right !== null){
                if(node.right.left === null) node.right.setLeft(replacement.right);
                replacement.setRight(node.right);
            } 

            // set new coordinates for prior children of replacement
            let portionToChange = shiftNodes.slice(1);
            this.setNewCordsOnMove(portionToChange);

        }

        this.numNodes --;
        moveNodes(shiftNodes);
    }

    insert(value){
        let curr = this.root;
        const node = new BSTNode(value, this.numInsertedTotal);

        if(this.root === null){
            this.insertAtTop(value);
            return;

        } else {

            let insertSide = "";

            for(;;){
                if(value < curr.value ){
                    // set which side we are traversing from root
                    if(curr === this.root){
                        insertSide = "l";
                    }

                    if(curr.left === null){
                        this.addLeftChild(insertSide, curr, node)
                        return;
                    }

                    curr = curr.left; 

                } else if(value > curr.value || value === curr.value) {
                    // set which side we are traversing from root
                    if(curr === this.root){
                        insertSide = "r";
                    }
                    if(curr.right === null){
                        this.addRightChild(insertSide, curr, node);
                        return;
                    }

                    curr = curr.right; 
                }
            }
        }
    }

   
}



    