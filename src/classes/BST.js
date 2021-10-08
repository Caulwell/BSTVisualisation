import BSTNode from "./BSTNode";
import {shiftNodesAnimation} from "../util/animations";

export default class BST { 

    constructor(){
        this.root = null;
        this.numNodes = 0;
    }

    shiftNodes(node, side, shiftedNodes){

        if(node == null){
            return;
        }

        this.shiftNodes(node.left, side, shiftedNodes);
        this.shiftNodes(node.right, side, shiftedNodes);

        if(side === "l"){
            node.x -= 50;
            shiftedNodes = [...shiftedNodes, node];
        } else if(side === "r"){
            node.x += 50;
            shiftedNodes = [...shiftedNodes, node];
        }

        shiftNodesAnimation(shiftedNodes);
    }

    checkShiftNeeded(){

        let mostCenterLeft = null;
        let mostCenterRight = null;

        if(this.root.left == null || this.root.right == null) return false;

        let curr = this.root.left;
        
        while(true){
            if(curr.right == null){
                mostCenterLeft = curr;
                break;
            } else {
                curr = curr.right;
            }
        }

        curr = this.root.right;

        while(true){
            if(curr.left == null){
                mostCenterRight = curr;
                break;
            } else {
                curr = curr.left;
            }
        }

        if(mostCenterLeft == null || mostCenterRight == null){
            return false;
        } else if (Math.abs(mostCenterRight.x - mostCenterLeft.x) <= 50 
                    || Math.abs(mostCenterRight.y - mostCenterLeft.y) <= 50
                    || Math.abs(mostCenterRight.parent.x - mostCenterLeft.x) <=50
                    || Math.abs(mostCenterRight.parent.y - mostCenterLeft.y) <=50) {
            
            return true;
        } else {
            return false;
        }
    }

    checkForDiamond(){
        // When two nodes with the same parent - the left one has a right child, the right one has a left child
        // If so move right node to the right if in right tree/move left node to left if in left tree
    }

    insertAtTop(value){
        const node = new BSTNode(value, this.numNodes);
        this.root = node;
        node.x = window.innerWidth * 0.4;
        node.y = window.innerHeight * 0.1;
        this.numNodes++;
    }

    addLeftChild(insertSide, curr, node){

        if(insertSide === "r" && this.checkShiftNeeded()){
            // Adding a right child on the left tree - shift left tree to left
            let node = this.root.right;
            this.shiftNodes(node, insertSide, []);
        } 

        curr.left = node;
        node.parent = curr;
        node.x = node.parent.x - 50;
        node.y = node.parent.y + 50;
        node.lr = "l";
        this.numNodes++;

      
        

    }

    addRightChild(insertSide, curr, node){
                
        if(insertSide === "l" && this.checkShiftNeeded()){
            // Adding a left child on the right tree - shift right tree to right
            let node = this.root.left;
            this.shiftNodes(node, insertSide, []);
        }

        curr.right = node;
        node.parent = curr;
        node.x = node.parent.x + 50;
        node.y = node.parent.y + 50;
        node.lr = "r";
        this.numNodes++;
        
        

    }

    insert(value){
        let curr = this.root;
        const node = new BSTNode(value, this.numNodes);

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

    values() {
        if (!this.root) return [];
        var array = [];
        search(this.root, 1);
    
        function search(node, level) {
          if (node !== null) {
            array.push(node);
            search(node.left, level + 1);
            search(node.right, level + 1);
          }
        }
        return array;
      }
    
}