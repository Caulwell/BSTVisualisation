import BSTNode from "./BSTNode";
import {shiftNodesAnimation, passingHighlightNode} from "../util/animations";

export default class BST { 

    constructor(){
        this.root = null;
        this.numNodes = 0;
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

    search(value){
        let curr = this.root;

        while(true){
            if(curr == null){
                console.log("value: " + value + " not found");
                break;
            } 
            if(curr.value == value){
                console.log("found : " + curr.value);
                break;
            } else if(value < curr.value){
                console.log("value : " + value + " < " + "curr: " + curr.value);
                // passingHighlightNode(curr);
                curr = curr.left;
            } else if(value > curr.value){
                console.log("value : " + value + " > " + "curr: " + curr.value);
                // passingHighlightNode(curr);
                curr = curr.right;
                
            }
        }
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

    insertAtTop(value){
        const node = new BSTNode(value, this.numNodes);
        this.root = node;
        node.x = window.innerWidth * 0.4;
        node.y = window.innerHeight * 0.1;
        this.numNodes++;
    }

    addLeftChild(insertSide, curr, node){

        if(insertSide === "r" && this.checkShiftNeeded(insertSide)){
            // Adding a right child on the left tree - shift left tree to left
            let node = this.root.right;
            this.shiftNodes(node, insertSide, []);
        } 

        curr.left = node;
        node.parent = curr;
        node.x = node.parent.x - 50;
        node.y = node.parent.y + 50;
        node.lr = "l";

        this.checkForOverlap(node, insertSide == "l" ? this.root.left : this.root.right, insertSide);
        this.numNodes++;

      
        

    }

    addRightChild(insertSide, curr, node){
                
        if(insertSide === "l" && this.checkShiftNeeded(insertSide)){
            // Adding a left child on the right tree - shift right tree to right
            let node = this.root.left;
            this.shiftNodes(node, insertSide, []);
        }

        curr.right = node;
        node.parent = curr;
        node.x = node.parent.x + 50;
        node.y = node.parent.y + 50;
        node.lr = "r";

        this.checkForOverlap(node, insertSide == "l" ? this.root.left : this.root.right, insertSide);
        this.numNodes++;
        
        

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

    getMostCenterNode(curr, side, centerNode){

        if(curr==null){
            return;
        } 

        if(curr.left != null) centerNode = this.getMostCenterNode(curr.left, side, centerNode);
        if(curr.right != null) centerNode = this.getMostCenterNode(curr.right, side, centerNode);

        if(curr != null && side == "l" && curr.x > centerNode.x) centerNode = curr;
        if(curr != null && side == "r" && curr.x < centerNode.x) centerNode = curr;

        return centerNode;

    }

    checkShiftNeeded(insertSide){

        let curr;
        let mostCenterNode = null;

        if (insertSide == "l"){
            curr = this.root.left;
            mostCenterNode = this.getMostCenterNode(curr, "l", curr);
        } else {
            curr = this.root.right;
            mostCenterNode = this.getMostCenterNode(curr, "r", curr);
        }

        if(mostCenterNode != null && Math.abs(this.root.x - mostCenterNode.x ) <= 50){
            return true;
        }  else {
            return false;
        }
    }

    checkForOverlap(node, curr, insertSide){
        // When two nodes with the same parent - the left one has a right child, the right one has a left child
        // If so move right node to the right if in right tree/move left node to left if in left tree
        // if(curr == null || node.parent == null || node.parent.parent == null || node.parent.parent.right == null || node.parent.parent.left == null){
        if(curr == null || node.parent == null || node.parent.parent == null){
            return;
        }
        this.checkForOverlap(node, curr.left, insertSide);

        if(curr.x == node.x && curr.y == node.y && curr != node){
            console.log(curr, node);
            if(insertSide == "l"){
                if(node.lr == "r"){
                    node.parent.x -=50;
                    node.x -=50;
                    shiftNodesAnimation([node.parent]);
                } else if(node.lr == "l"){
                    curr.x -=50;
                    curr.parent.x -=50;
                    shiftNodesAnimation([curr.parent, curr]);
                }
            } else if(insertSide == "r"){
                if(node.lr == "r"){
                    curr.x +=50;
                    curr.parent.x +=50;
                    shiftNodesAnimation([curr.parent, curr]);
                } else if(node.lr == "l"){
                    node.parent.x +=50;
                    node.x += 50;
                    shiftNodesAnimation([node.parent]);
                }
            }
        }

        if(curr.y == node.y && Math.abs(node.x -curr.x) <=50 && (node.x == curr.parent.x && curr.x == node.parent.x)){
            console.log(node, curr);
            if(insertSide == "l"){
                if(node.lr == "r"){
                    node.parent.x -=50;
                    node.x -=50;
                    shiftNodesAnimation([node.parent]);
                } else if(node.lr == "l"){
                    curr.parent.x -=50;
                    curr.x -=50;
                    shiftNodesAnimation([curr.parent, curr]);
                }
            } else if(insertSide = "r"){
                if(node.lr == "r"){
                    curr.parent.x +=50;
                    curr.x +=50;
                    shiftNodesAnimation([curr.parent, curr]);
                } else if(node.lr == "l"){
                    node.parent.x +=50;
                    node.x +=50;
                    shiftNodesAnimation([node.parent]);
                }
            }
        }

        this.checkForOverlap(node, curr.right, insertSide);
        
    }
    
}