import BSTNode from "./BSTNode";
import BT from "./BT";
import {moveNodes, searchAnimation, traversalAnimation} from "../util/animations";

export default class BST extends BT { 

    constructor(){
        super();
        this.affectedNodes = [];
    }

    getAffectedNodes(){
        return this.affectedNodes;
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

            let replacement = this.getLeftMostElement(node.right, node.right);

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

    addLeftChild(curr, node){

        
        curr.setLeft(node);
        node.setX(node.parent.x -50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;

    }

    addRightChild(curr, node){

        curr.setRight(node);
        node.setX(node.parent.x + 50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;
        
        

    }

    shiftTree(root, side){

        if(root){
            console.log("shifting: " + root.value + " from: " + root.x );
            if(side === "l") root.setX(root.x - 50);
            if(side === "r") root.setX(root.x + 50);
            console.log("pushing to affectedNodes: " + root.value);
            this.affectedNodes.push(root);
            console.log("affected nodes now: " + this.affectedNodes.length);

            console.log( " to: " + root.x );
            console.log(this.affectedNodes);

            this.shiftTree(root.left, side);
            this.shiftTree(root.right, side); 
        } else {
            return;
        }
    }

    // checkGrandChildren(root){
    //     // check if grandchildren are overlapping so left child has right child and right child has left child
    //     if(root.left && root.right && root.left.right && root.right.left){
    //         if(Math.abs(root.right.left.x - root.left.right.x) <=50){
    //             this.shiftTree(root.right, "r");
    //             this.shiftTree(root.left, "l");
    //         }
    //     }
    // }

    checkChildrenTrees(root){
        // check leftmost and rightmost node of each tree - if they are too close, move each tree away from each other
        if(root.left && root.right){
            const leftsRightMost = this.getRightMostElement(root.left, root.left);
            const rightsLeftMost = this.getLeftMostElement(root.right, root.right);

            console.log("rightmost: " + leftsRightMost.value);

            if(Math.abs(leftsRightMost.x - rightsLeftMost.x) <50 ){
                console.log("lefts right most: " + leftsRightMost.value + " x : " + leftsRightMost.x);
                console.log("rights left most: " + rightsLeftMost.value + " x : " + rightsLeftMost.x);
                this.shiftTree(root.right, "r");
                this.shiftTree(root.left, "l");
            }
        }
    }

    getLeftMostElement(top, leftMost){
        if(top===null){
            return;
        } 

        if(top.left != null) leftMost = this.getLeftMostElement(top.left, leftMost);
        if(top.right != null) leftMost = this.getLeftMostElement(top.right, leftMost);

        if(top != null && top.x < leftMost.x) leftMost = top;

        return leftMost;
    }

    getRightMostElement(top, rightMost){
        
        if(top===null){
            return;
        } 

        if(top.left != null) rightMost = this.getRightMostElement(top.left, rightMost);
        if(top.right != null) rightMost = this.getRightMostElement(top.right, rightMost);

        if(top != null && top.x > rightMost.x) rightMost = top;

        return rightMost;
        
    }

    

    checkLayout(root){

        

        if(root){
            this.checkLayout(root.left);
            this.checkLayout(root.right);
            // this.checkGrandChildren(root);
            this.checkChildrenTrees(root);
            
        } else {
            return;
        }

        
    }

    insert(value){

        this.affectedNodes = [];
        console.log("resetting affectedNodes");
        
        let curr = this.root;
        const node = new BSTNode(value, this.numInsertedTotal);

        

        if(this.root === null){
            this.insertAtTop(value);
            return;

        } else {

            let insertSide = "";

            for(;;){
                if(value < curr.value ){
                    console.log(curr);

                    if(curr.left === null){
                        this.addLeftChild(curr, node);
                        return;
                    }

                    curr = curr.left; 

                } else if(value > curr.value || value === curr.value) {
                    console.log(curr);
                    if(curr.right === null){
                        this.addRightChild(curr, node);
                        return;
                    }

                    curr = curr.right; 
                }
            }
        }
    }

   
}



    