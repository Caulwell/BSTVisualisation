import BT from "./BT";
import AVLNode from "./AVLNode";

export default class AVL extends BT { 

    insert(value){

        this.affectedNodes = [];

        let curr = this.root;
        const node = new AVLNode(value, this.numInsertedTotal);

        if(this.root === null){
            this.insertAtTop(value);
            return;

        } else {

            for(;;){
                if(value < curr.value ){

                    if(curr.left === null){
                        this.addLeftChild(curr, node);
                        return;
                    }

                    curr = curr.left; 

                } else if(value > curr.value || value === curr.value) {
                    if(curr.right === null){
                        this.addRightChild(curr, node);
                        return;
                    }

                    curr = curr.right; 
                }
            }
        }
    }

    insertAtTop(value){
        const node = new AVLNode(value, this.numInsertedTotal);
        this.setRoot(node);
        node.setX(window.innerWidth * 0.43);
        node.setY(window.innerHeight * 0.1);
        this.numNodes++;
        this.numInsertedTotal++;
    }

    
    addLeftChild(curr, node){

        curr.setLeft(node);
        node.setX(node.parent.x -50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;

        this.updateAvlValues(node.parent);
        this.checkBalanceAfterInsertion(node.parent, false);
        

    }

    addRightChild(curr, node){

        curr.setRight(node);
        node.setX(node.parent.x + 50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;

        this.updateAvlValues(node.parent);
        this.checkBalanceAfterInsertion(node.parent, false);

    }

    checkBalanceAfterInsertion(node, found){

        if(found === true) return;

        if(node){
            if(Math.abs(node.balanceFactor) > 1){
                found = true;
                this.balance(node);
            }

            this.checkBalanceAfterInsertion(node.parent, found);

        } else {
            return;
        }
    }

    balance(node){
        // if node not null
        if(node){

            console.log("unbalancedNode: " + node.value);
            
            // if heavy on the left
            if (node.balanceFactor > 1) {
                // and node.left is right heavy do a left-right rotation
                if(node.left.balanceFactor <= -1){
                    this.leftRightRotation(node);
                    return;
                } else {
                    // else do a right rotation
                    this.rightRotation(node);
                    return;
                }

                // if heavy on the right
            } else {
                //and node.right is left heavy do a right-left rotation
                if(node.right.balanceFactor >= 1){
                    this.rightLeftRotation(node);
                    return;
                } else {
                    // else do a left rotation
                    this.leftRotation(node);
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

        replacement.setX(node.x);
        replacement.setY(node.y);

        node.setX(node.x -50);
        node.setY(node.y +50);

        this.affectedNodes.push(replacement, node);
        
    }

    rightRotation(node){    
        console.log("right rotation on node: " + node.value);
        // rotating about node and left child
        // rotate whole subtree rooted at node one place to the right
        // right subtree of new root = left subtree of r

        let replacement = node.left;

        node.setLeft(replacement.right);

        if(node.parent){
            // console.log("node parent : " + node.parent.value);
            if(node.parent.left === node){
                // console.log("changing node's parent left from : " + node.parent.left.value);
                node.parent.setLeft(replacement);
                // console.log("to: " + node.parent.left.value);
            } else if(node.parent && node.parent.right === node){
                // console.log("changing node's parent right from : " + node.parent.right.value);
                node.parent.setRight(replacement);
                // console.log("to: " +  node.parent.right.value);
            } 
        }

        replacement.setRight(node);
        if(node === this.root){
            this.setRoot(replacement);
        }
        this.affectedNodes.push(replacement, node);
        // console.log("node : " + node.value + " right : " + (node.right ? node.right.value : " null") + " left : " + (node.left ? node.left.value : " null") + " parent:  " + (node.parent ? node.parent.value : " null"));
        // console.log("replacement : " + replacement.value + " right : " + (replacement.right ? replacement.right.value : " null") + " left : " + (replacement.left ? replacement.left.value : " null") + " parent:  " + (replacement.parent ? replacement.parent.value : " null"));

    }

    leftRightRotation(node){
        console.log("leftright rotation on node: " + node.value);
        this.leftRotation(node.left);
        this.rightRotation(node);
        

    }

    rightLeftRotation(node){
        console.log("rightleft rotation on node: " + node.value);
        this.rightRotation(node.right);
        this.leftRotation(node);
        
    }

    updateAvlValues(node){

        if(node){
            node.setHeight(this.updateHeight(node));

            let nodeLeftHeight = node.left ? node.left.getHeight() : -1;
            let nodeRightHeight = node.right ? node.right.getHeight() : -1;

            node.setBalanceFactor(nodeLeftHeight - nodeRightHeight);

            this.updateAvlValues(node.parent);
        } else {
            return;
        }
        
    }

    updateHeight(node){
        if(!node || (!node.left && !node.right)){
            return 0;
        } else {
            let height = Math.max(this.updateHeight(node.left), this.updateHeight(node.right)) +1;
            return height;
        }

    }

   
}



    