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

    delete(node){

        this.affectedNodes = [];

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
            this.affectedNodes = this.values(node.left);

            // set new coordinates for children of left child
            let portionToChange = this.affectedNodes.slice(1);
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
            this.affectedNodes = this.values(node.right);

            // set new coordinates for children of right child
            let portionToChange = this.affectedNodes.slice(1);
            this.setNewCordsOnMove(portionToChange);

        // HAS TWO CHILDREN
        } else if (node.right !== null && node.left !== null){

            let replacement = this.getLeftMostElementReal(node.right);

            if(replacement.right !== null && replacement.parent !== node) replacement.parent.setLeft(replacement.right);

            if(replacement.parent.left === replacement) replacement.parent.left = null;
            if(replacement.parent.right === replacement) replacement.parent.right = null;

            // ready for animation - get it so its prior children are grabbed, not its new ones
            this.affectedNodes = this.values(replacement);

        
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
            let portionToChange = this.affectedNodes.slice(1);
            this.setNewCordsOnMove(portionToChange);

        }
        console.log(node.parent);
        this.checkBalanceAfterOperation(node.parent, false);

        this.numNodes --;
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

        this.checkBalanceAfterOperation(node.parent, false);
        

    }

    addRightChild(curr, node){

        curr.setRight(node);
        node.setX(node.parent.x + 50);
        node.setY(node.parent.y + 50);

        this.numNodes++;
        this.numInsertedTotal++;

        this.checkBalanceAfterOperation(node.parent, false);

    }

    checkBalanceAfterOperation(node, found){

        if(found === true) return;

        if(node){
            if(Math.abs(node.getBalanceFactor()) > 1){
                found = true;
                this.balance(node);
            }

            this.checkBalanceAfterOperation(node.parent, found);

        } else {
            return;
        }
    }

    balance(node){
        // if node not null
        if(node){

            console.log("unbalancedNode: " + node.value);
            
            // if heavy on the left
            if (node.getBalanceFactor() > 1) {
                // and node.left is right heavy do a left-right rotation
                if(node.left.getBalanceFactor() <= -1){
                    this.leftRightRotation(node);
                    this.affectedNodes = this.values(node.parent);
                    return;
                } else {
                    // else do a right rotation
                    this.rightRotation(node);
                    this.affectedNodes = this.values(node.parent);
                    return;
                }

                // if heavy on the right
            } else {
                //and node.right is left heavy do a right-left rotation
                if(node.right.getBalanceFactor() >= 1){
                    this.rightLeftRotation(node);
                    this.affectedNodes = this.values(node.parent);
                    return;
                } else {
                    // else do a left rotation
                    this.leftRotation(node);
                    this.affectedNodes = this.values(node.parent);
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

   
}



    