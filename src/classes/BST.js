import BSTNode from "./BSTNode";
import {moveNodes, passingHighlightNode} from "../util/animations";

export default class BST { 

    constructor(){
        this.root = null;
        this.numNodes = 0;
        this.numInsertedTotal = 0;
    }

    getRoot(){
        return this.root;
    }

    values(top) {
        if (!top) return [];
        var array = [];
        search(top, 1);
    
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

        let nodes = [];

        while(true){
            if(curr === null){
                break;
            } 
            if(curr.value === value){
                break;
            } else if(value < curr.value){
                nodes.push(curr);
                curr = curr.left;
            } else if(value > curr.value){
                nodes.push(curr);
                curr = curr.right;
                
            }
        }
        passingHighlightNode(nodes);
    }

    delete(node){

        let shiftNodes = [];

        // IS A LEAF NODE
        if(node.left === null && node.right === null){
            
            if(node === this.root){
                // is root node
                this.root = null;
            } else {
                // not root node
                if(node.parent.left === node) node.parent.setLeft(null);
                if(node.parent.right === node) node.parent.setRight(null);
            }
             

        // ONLY HAS A LEFT CHILD
        } else if (node.left !== null && node.right === null){
  
            // is root node
            if(node === this.root){
                this.root = node.left;
                node.left.parent = null;
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
                this.root = node.right;
                node.right.parent = null;
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
            if(replacement.parent.right === replacement) replacement.parent.right = null

            // ready for animation - get it so its prior children are grabbed, not its new ones
            shiftNodes = this.values(replacement);

        
            if(node !== this.root){
                // set parent child relationship for replacement
                if(node.parent.left === node) node.parent.setLeft(replacement);
                if(node.parent.right === node) node.parent.setRight(replacement);
            } else {
                this.root = replacement;
                replacement.parent = null;
            }
            
            // set replacement's new x and y
            replacement.setX(node.x);
            
            replacement.setY(node.y);


            // replacement cannot have a left, so set it to node's left
            replacement.setLeft(node.left)

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

    setNewCordsOnMove(nodes){

        console.log(nodes);

        nodes.forEach(node => {

            node.setY(node.parent.y +50);
            if(node.lr === "l") node.setX(node.parent.x -50);
            if(node.lr === "r") node.setX(node.parent.x + 50);

        });

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

    insertAtTop(value){
        const node = new BSTNode(value, this.numNodes);
        this.root = node;
        node.setX(window.innerWidth * 0.5);
        node.setY(window.innerHeight * 0.1);
        this.numNodes++;
        this.numInsertedTotal++;
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

        this.checkForOverlap(node, insertSide === "l" ? this.root.left : this.root.right, insertSide);
        this.numNodes++;
        this.numInsertedTotal++;

      
        

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

        this.checkForOverlap(node, insertSide === "l" ? this.root.left : this.root.right, insertSide);
        this.numNodes++;
        this.numInsertedTotal++;
        
        

    }

    shiftNodes(node, side, shiftedNodes){

        if(node === null){
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

        moveNodes(shiftedNodes);
    }

    getMostCenterNode(curr, side, centerNode){

        if(curr===null){
            return;
        } 

        if(curr.left != null) centerNode = this.getMostCenterNode(curr.left, side, centerNode);
        if(curr.right != null) centerNode = this.getMostCenterNode(curr.right, side, centerNode);

        if(curr != null && side === "l" && curr.x > centerNode.x) centerNode = curr;
        if(curr != null && side === "r" && curr.x < centerNode.x) centerNode = curr;

        return centerNode;

    }

    checkShiftNeeded(insertSide){

        let curr;
        let mostCenterNode = null;

        if (insertSide === "l"){
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
        // if(curr === null || node.parent === null || node.parent.parent === null || node.parent.parent.right === null || node.parent.parent.left === null){
        if(curr === null || node.parent === null || node.parent.parent === null){
            return;
        }
        this.checkForOverlap(node, curr.left, insertSide);

        if(curr.x === node.x && curr.y === node.y && curr !== node){
            console.log(curr, node);
            if(insertSide === "l"){
                if(node.lr === "r"){
                    node.parent.x -=50;
                    node.x -=50;
                    moveNodes([node.parent]);
                } else if(node.lr === "l"){
                    curr.x -=50;
                    curr.parent.x -=50;
                    moveNodes([curr.parent, curr]);
                }
            } else if(insertSide === "r"){
                if(node.lr === "r"){
                    curr.x +=50;
                    curr.parent.x +=50;
                    moveNodes([curr.parent, curr]);
                } else if(node.lr === "l"){
                    node.parent.x +=50;
                    node.x += 50;
                    moveNodes([node.parent]);
                }
            }
        }

        if(curr.y === node.y && Math.abs(node.x -curr.x) <=50 && (node.x === curr.parent.x && curr.x === node.parent.x)){
            console.log(node, curr);
            if(insertSide === "l"){
                if(node.lr === "r"){
                    node.parent.x -=50;
                    node.x -=50;
                    moveNodes([node.parent]);
                } else if(node.lr === "l"){
                    curr.parent.x -=50;
                    curr.x -=50;
                    moveNodes([curr.parent, curr]);
                }
            } else if(insertSide === "r"){
                if(node.lr === "r"){
                    curr.parent.x +=50;
                    curr.x +=50;
                    moveNodes([curr.parent, curr]);
                } else if(node.lr === "l"){
                    node.parent.x +=50;
                    node.x +=50;
                    moveNodes([node.parent]);
                }
            }
        }

        this.checkForOverlap(node, curr.right, insertSide);
        
    }

    getLeftMostElement(top){
        let curr = top;
        while(true){
            if(curr.left === null){
                return curr;
            } else {
                curr = curr.left;
            }
        }
    }
    
}