import BT from "./BT";
import RBNode from "./RBNode";

export default class RB extends BT { 

    constructor(){
        super();
    }

    resetAnimationObjects(){
        super.resetAnimationObjects();

    }

    getColour(node){
        return node === null ? "black" : node.rb;
    }

    isRed(node){
        return node !== null && this.getColour(node) === "red";
    }

    isBlack(node){
        return node === null || this.getColour(node) === "black";
    }

    parentOf(node){
        return node === null ? null : node.getParent();
    }

    gParentOf(node){
        return (node === null || node.getParent() == null) ? null : node.getParent().getParent();
    }

    siblingOf(node){
        return (node === null || node.getParent() == null) ? null   
                : (node === node.getParent().getLeft()) ? node.getParent().getRight() : node.getParent().getLeft();
    }

    leftOf(node){
        return node === null ? null : node.getLeft();
    }

    rightOf(node){
        return node === null ? null : node.getRight();
    }


    createNode(value){
        let node = new RBNode(value, this.numInsertedTotal);
        node.rb = "red";
        return node;
    }

    insertAtTop(node){
        super.insertAtTop(node);
        node.rb = "black";
    }


    fixOnInsertion(node){
        
        while(this.parentOf(node) !== null && this.parentOf(node).rb === "red"){

            let uncle = null;

            if(this.parentOf(node) === this.leftOf(this.gParentOf(node))){
                uncle = this.rightOf(this.gParentOf(node));

                if(uncle !== null && uncle.rb === "red"){

                    this.parentOf(node).rb = "black";
                    uncle.rb = "black";
                    this.gParentOf(node).rb = "red";
                    node = this.gParentOf(node);
                    continue;
                }

                if(node === this.rightOf(this.parentOf(node))){
                    node = this.parentOf(node);
                    this.leftRotation(node);
                }

                this.parentOf(node).rb = "black";
                this.gParentOf(node).rb = "red";

                this.rightRotation(this.gParentOf(node));
            } else {

                uncle = this.leftOf(this.gParentOf(node));

                if(uncle !== null && uncle.rb === "red"){
                    this.parentOf(node).rb = "black";
                    uncle.rb = "black";
                    this.gParentOf(node).rb = "red";
                    node = this.gParentOf(node);
                    continue;
                }

                if(node === this.leftOf(this.parentOf(node))){
                    node = this.parentOf(node);
                    this.rightRotation(node);
                }

                this.parentOf(node).rb = "black";
                this.gParentOf(node).rb = "red";
                this.leftRotation(this.gParentOf(node));
            }
        }

        this.root.rb = "black";

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

   
}



    