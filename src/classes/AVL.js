import BT from "./BT";
import AVLNode from "./AVLNode";

export default class AVL extends BT { 

    constructor(){
        super();
        this.checkBalanceAnimation = {checkingNodes: [], foundNode: null};
    }

    resetAnimationObjects(){
        super.resetAnimationObjects();
        this.checkBalanceAnimation = {checkingNodes: [], foundNode: null};
    }

    createNode(value){
        return new AVLNode(value, this.numInsertedTotal);
    }

    createNodeFromJSON(node){
        return new AVLNode(node.value, node.id, node.parent, node.left, node.right, node.depth, node.x, node.y, node.lr);
    }

    checkBalanceAfterOperation(node, found){

        if(found === true) return;

        if(node){
            if(Math.abs(node.getBalanceFactor()) > 1){
                found = true;
                this.operationMessage.decisions.push(node.value + "has a BF of " + node.getBalanceFactor());
                this.balance(node);
                this.checkBalanceAnimation.foundNode = node;
            } else {
                this.checkBalanceAnimation.checkingNodes.push(node);
            }

            this.checkBalanceAfterOperation(node.parent, found);

        } else {
            return;
        }
    }

    balance(node){
        // if node not null
        if(node){

            this.operationMessage.decisions.push("balancing " + node.value);
            
            // if heavy on the left
            if (node.getBalanceFactor() > 1) {
                // and node.left is right heavy do a left-right rotation
                if(node.left.getBalanceFactor() <= -1){
                    this.operationMessage.decisions.push("LR Rotation on " + node.value);
                    this.leftRightRotation(node);
                    
                    return;
                } else {
                    // else do a right rotation
                    this.rightRotation(node);
                    this.operationMessage.decisions.push("R Rotation on " + node.value);
                    return;
                }

                // if heavy on the right
            } else {
                //and node.right is left heavy do a right-left rotation
                if(node.right.getBalanceFactor() >= 1){
                    this.operationMessage.decisions.push("RL Rotation on " + node.value);
                    this.rightLeftRotation(node);
                    return;
                } else {
                    // else do a left rotation
                    this.leftRotation(node);
                    this.operationMessage.decisions.push("L Rotation on " + node.value);
                    return;
                }
                
            }
        
        }
        
    }

    leftRotation(node){
        console.log("left rotation on node: " + node.value);
        // rotating about node and node's right child
        // rotate the whole subtree rooted at r one place to the left
        // take the left subtree of new root and make it the right subtree of r

        let replacement = node.right;

        node.setRight(replacement.left);

        if(node.parent){
            if(node.parent.left === node){
                node.parent.setLeft(replacement);
            } else if(node.parent && node.parent.right === node){
                node.parent.setRight(replacement); 
            } 
        }

        replacement.setLeft(node);

        if(node === this.root){
            this.setRoot(replacement);
        }

        // replacement.setX(node.x);
        // replacement.setY(node.y);

        // node.setX(node.x -50);
        // node.setY(node.y +50);

        // set nodes that need adjustment
        
    }

    rightRotation(node){    
        console.log("right rotation on node: " + node.value);
        // rotating about node and left child
        // rotate whole subtree rooted at node one place to the right
        // right subtree of new root = left subtree of r

        let replacement = node.left;

        node.setLeft(replacement.right);

        if(node.parent){
            if(node.parent.left === node){
                node.parent.setLeft(replacement);
            } else if(node.parent && node.parent.right === node){
                node.parent.setRight(replacement);
            } 
        }

        replacement.setRight(node);
        if(node === this.root){
            this.setRoot(replacement);
        }

    }

    leftRightRotation(node){
        let nodes = [];

        this.leftRotation(node.left);
        this.rightRotation(node);
        

    }

    rightLeftRotation(node){
        console.log("rightleft rotation on node: " + node.value);
        this.rightRotation(node.right);
        this.leftRotation(node);
        
    }

   
}



    