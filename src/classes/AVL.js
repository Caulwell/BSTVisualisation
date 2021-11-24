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

    getTreeFromValues(values){
        values.forEach(value => {
            let insertedNode = this.insert(value);
            if(this.parentOf(insertedNode)) this.checkBalanceAfterOperation(this.parentOf(insertedNode), false);
        });
    }


    checkBalanceAfterOperation(node, found){

        if(found === true) return;

        if(node){
            if(Math.abs(node.getBalanceFactor()) > 1){
                found = true;
                this.addOperationMessageDecision(node.value + "has a BF of " + node.getBalanceFactor());
                this.balance(node);
                this.checkBalanceAnimation.foundNode = node;
            } else {
                this.checkBalanceAnimation.checkingNodes.push(node);
            }

            this.checkBalanceAfterOperation(this.parentOf(node), found);

        } else {
            return;
        }
    }

    balance(node){
        // if node not null
        if(node){

            this.addOperationMessageDecision("balancing " + node.value);
            
            // if heavy on the left
            if (node.getBalanceFactor() > 1) {
                // and node.left is right heavy do a left-right rotation
                if(this.leftOf(node).getBalanceFactor() <= -1){
                    this.addOperationMessageDecision("LR Rotation on " + node.value);
                    this.leftRightRotation(node);
                    
                    return;
                } else {
                    // else do a right rotation
                    this.rightRotation(node);
                    this.addOperationMessageDecision("R Rotation on " + node.value);
                    return;
                }

                // if heavy on the right
            } else {
                //and node.right is left heavy do a right-left rotation
                if(this.rightOf(node).getBalanceFactor() >= 1){
                    this.addOperationMessageDecision("RL Rotation on " + node.value);
                    this.rightLeftRotation(node);
                    return;
                } else {
                    // else do a left rotation
                    this.leftRotation(node);
                    this.addOperationMessageDecision("L Rotation on " + node.value);
                    return;
                }
                
            }
        
        }
        
    }

    leftRotation(node){
        // rotating about node and node's right child
        // rotate the whole subtree rooted at r one place to the left
        // take the left subtree of new root and make it the right subtree of r

        let replacement = this.rightOf(node);

        node.setRight(this.leftOf(replacement));

        if(this.parentOf(node)){
            if(this.leftOf(this.parentOf(node)) === node){
                this.parentOf(node).setLeft(replacement);
            } else if(this.parentOf(node) && this.rightOf(this.parentOf(node)) === node){
                this.parentOf(node).setRight(replacement); 
            } 
        }

        replacement.setLeft(node);

        if(node === this.root){
            this.setRoot(replacement);
        }
        
    }

    rightRotation(node){    
        // rotating about node and left child
        // rotate whole subtree rooted at node one place to the right
        // right subtree of new root = left subtree of r

        let replacement = this.leftOf(node);

        node.setLeft(this.rightOf(replacement));

        if(this.parentOf(node)){
            if(this.leftOf(this.parentOf(node)) === node){
                this.parentOf(node).setLeft(replacement);
            } else if(this.parentOf(node) && this.rightOf(this.parentOf(node)) === node){
                this.parentOf(node).setRight(replacement);
            } 
        }

        replacement.setRight(node);
        if(node === this.root){
            this.setRoot(replacement);
        }

    }

    leftRightRotation(node){
        this.leftRotation(this.leftOf(node));
        this.rightRotation(node);
    }

    rightLeftRotation(node){
        this.rightRotation(this.rightOf(node));
        this.leftRotation(node);
        
    }

   
}



    