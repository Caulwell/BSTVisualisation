import BT from "./BT";
import RBNode from "./RBNode";

export default class RB extends BT { 

    constructor(){
        super();
        this.colours = {
            r: "red",
            b: "black"
        };
    }

    resetAnimationObjects(){
        super.resetAnimationObjects();
        this.deleteFixNode = null;

    }

    getColour(node){
        return node === null ? this.colours.b : node.colour;
    }

    isRed(node){
        return node !== null && this.getColour(node) === this.colours.r;
    }

    isBlack(node){
        return node === null || this.getColour(node) === this.colours.b;
    }

    createNode(value){
        let node = new RBNode(value, this.numInsertedTotal);
        node.colour = this.colours.r;
        return node;
    }

    createNodeFromJSON(node){
        let newNode = new  RBNode(node.value, node.id, node.parent, node.left, node.right, node.depth, node.x, node.y, node.lr);
        newNode.colour = node.colour;
        return newNode;
    }

    getTreeFromValues(values){
        values.forEach(value => {
            let insertedNode = this.insert(value);
            if(insertedNode.parent) this.fixOnInsertion(insertedNode);
        });
    }

    insertAtTop(node){
        super.insertAtTop(node);
        node.colour = this.colours.b;
    }

    // rbTransplant(u,v){
    //     if(!u.parent){  // u is root
    //         this.root = v;
    //     } else if(u === u.parent.left){
    //         u.parent.left = v;
    //         if(v)v.lr = "l";
    //     } else {
    //         u.parent.right = v;
    //         if(v)v.lr = "r";
    //     }
    //     if(v) v.parent = u.parent;
    // }


    delete(node){

        this.resetAnimationObjects();

        // get nodes to animate

        const getNodes = (node) => {
            if(!node) return;
            getNodes(node.parent);
            this.operationAnimation.highlightNodes.push(node);
        };

        getNodes(node.parent);
        this.operationAnimation.node = node;

        let deletingNode = node; //z
        let replacement = deletingNode; //y
        let x;

        let originalColour = deletingNode.colour;

        if(!deletingNode.left){
            x = this.rightOf(deletingNode);
            this.transplant(deletingNode, this.rightOf(deletingNode));
        } else if(!deletingNode.right){
            x = this.leftOf(deletingNode);
            this.transplant(deletingNode, this.leftOf(deletingNode));
        } else {
            replacement = this.getLeftMostElementReal(this.rightOf(deletingNode));
            
            originalColour = replacement.colour;
            x = this.rightOf(replacement);
            if(this.parentOf(replacement) === deletingNode){
                if(x) x.parent = replacement;
            } else {
                this.transplant(replacement, this.rightOf(replacement));
                replacement.setRight(deletingNode.right);
                this.rightOf(replacement).parent = replacement;
            }

            this.transplant(deletingNode, replacement);
            replacement.setLeft(deletingNode.left);
            replacement.colour = deletingNode.colour;
        }
        if(originalColour === this.colours.b){
            this.deleteFixNode = x;
        } else {
            this.deleteFixNode = null;
        }
        this.numNodes--;
        return deletingNode.parent;
    }

    // delete(node){

    //     let y = node;
    //     let x;
    //     let y_original_colour = y.colour;

    //     if(!node.left){ // no children or only has right child
    //         x = node.right;
    //         this.rbTransplant(node, node.right);
    //     } else if(!node.right){ // only has left child
    //         x = node.left;
    //         this.rbTransplant(node, node.left);
    //     } else { //both children
    //         y = this.getLeftMostElementReal(node.right);
    //         y_original_colour = y.colour;
    //         x = y.right;
    //         if(y.parent === node){ // y is direct child of node to be deleted
    //             x.parent = y;
    //         } else {
    //             this.rbTransplant(y, y.right);
    //             y.right = node.right;
    //             y.right.parent = y;
    //         }
    //         this.rbTransplant(node, y);
    //         y.left = node.left;
    //         y.left.parent = y;
    //         y.colour = node.colour;
    //     }

    //     if(y_original_colour === "black"){

    //         if(!x){
    //             x = new RBNode(null,null);
    //             x.colour = "black";
    //             x.parent = node.parent;
                
    //             if(node === node.parent.left){
    //                 node.parent.left = x;
    //             } else {
    //                 node.parent.right = x;
    //             }
    //         }
            
    //         this.deleteFixNode = x;
    //         console.log(x);

            
    //         console.log("y original colour = " + y_original_colour);
    //         console.log("going to call fixOnDelete with node: " + node);
    //     } else {
    //         this.deleteFixNode = null;
    //     }

    //     return node.parent;

    // }

    fixOnInsertion(node){
        
        while(this.parentOf(node) !== null && this.parentOf(node).colour === this.colours.r){

            this.operationMessage.decisions.push(node.value + "'s parent is a red node - fixing RB properties");

            let uncle = null;

            if(this.parentOf(node) === this.leftOf(this.gParentOf(node))){
                uncle = this.rightOf(this.gParentOf(node));

                if(uncle !== null && uncle.colour === this.colours.r){

                    this.parentOf(node).colour = this.colours.b;
                    uncle.colour = this.colours.b;
                    this.gParentOf(node).colour = this.colours.r;
                    node = this.gParentOf(node);
                    continue;
                }

                if(node === this.rightOf(this.parentOf(node))){
                    node = this.parentOf(node);
                    this.operationMessage.decisions.push(node.value + "L Rotation on " + node.value);
                    this.leftRotation(node);
                }

                this.parentOf(node).colour = this.colours.b;
                this.gParentOf(node).colour = this.colours.r;
                this.operationMessage.decisions.push("R Rotation on " + this.gParentOf(node).value);
                this.rightRotation(this.gParentOf(node));
            } else {

                uncle = this.leftOf(this.gParentOf(node));

                if(uncle !== null && uncle.colour === this.colours.r){
                    this.parentOf(node).colour = this.colours.b;
                    uncle.colour = this.colours.b;
                    this.gParentOf(node).colour = this.colours.r;
                    node = this.gParentOf(node);
                    continue;
                }

                if(node === this.leftOf(this.parentOf(node))){
                    node = this.parentOf(node);
                    this.operationMessage.decisions.push(node.value + "R Rotation on " + node.value);
                    this.rightRotation(node);
                }

                this.parentOf(node).colour = this.colours.b;
                this.gParentOf(node).colour = this.colours.r;
                this.operationMessage.decisions.push("L Rotation on " + this.gParentOf(node).value);
                this.leftRotation(this.gParentOf(node));
            }
        }

        this.root.colour = this.colours.b;

    }

    // fixOnDelete(node){
    //     console.log("calling fixOnDelete with node: " + node.value);
    //     console.log("node colour == " + node.colour);

    //     let w;
    //     while(node && node !== this.root && node.colour === "black"){
    //         console.log("gets into the for loop");
    //         if(node === node.parent.left){
    //             w = node.parent.right;
    //             if(w.colour === "red"){ // case 1
    //                 w.colour = "black";
    //                 node.parent.colour = "red";
    //                 this.leftRotation(node.parent);
    //                 w = node.parent.right;
    //             }
    //             if(w.left.colour === "black" && w.right.colour === "black"){ // case 2
    //                 w.colour = "red";
    //                 node = node.parent;
    //             }else { //case 3/4
    //                 if(w.right.colour === "black"){ // case 3
    //                     w.left.colour = "black";
    //                     w.colour = "red";
    //                     this.rightRotation(w);
    //                     w = node.parent.right;
    //                 }
    //                 // case 4
    //                 w.colour = node.parent.colour;
    //                 node.parent.colour = "black";
    //                 w.right.colour = "black";
    //                 this.leftRotation(node.parent);
    //                 node = this.root;
    //             }
    //         } else {
    //             w = node.parent.left;
    //             if(w.colour === "red"){
    //                 w.colour = "black";
    //                 node.parent.colour = "red";
    //                 this.rightRotation(node.parent);
    //                 w = node.parent.left;
    //             }
    //             if( w.right.colour === "black" &&  w.left.colour === "black"){
    //                 w.colour = "red";
    //                 node = node.parent;
    //             } else {
    //                 if( w.left.colour === "black"){
    //                     w.right.colour = "black";
    //                     w.colour = "red";
    //                     this.leftRotation(w);
    //                     w = node.parent.left;
    //                 }
    //                 w.colour = node.parent.colour;
    //                 node.parent.colour = "black";
    //                 w.left.colour = "black";
    //                 this.rightRotation(node.parent);
    //                 node = this.root;
    //             }
    //         }
    //     }
    //     if(node) node.colour = "black";
    // }

    fixOnDelete(node){

        let u;

        while(this.parentOf(node).colour === this.colours.r){

            if(this.parentOf(node) === this.rightOf(this.gParentOf(node))){
                u = this.leftOf(this.gParentOf(node));

                if(u && u.colour === this.colours.r){
                    u.colour = this.colours.b;
                    this.parentOf(node).colour = this.colours.b;
                    this.parentOf(this.parentOf(node)).colour = this.colours.r;
                    node = this.gParentOf(node);
                } else {
                    if(node === this.leftOf(this.parentOf(node))){
                        node = this.parentOf(node);
                        this.rightRotation(node);
                    }
                    this.parentOf(node).colour = this.colours.b;
                    this.gParentOf(node).colour = this.colours.r;
                    this.leftRotation(this.gParentOf(node));
                }
            } else {
                u = this.rightOf(this.gParentOf(node));

                if( u && u.colour === this.colours.r){
                    u.colour = this.colours.b;
                    this.parentOf(node).colour = this.colours.b;
                    this.gParentOf(node).colour = this.colours.r;
                    node = this.gParentOf(node);
                } else {
                    if(node === this.rightOf(this.parentOf(node))){
                        node = this.parentOf(node);
                        this.leftRotation(node);
                    }
                    this.parentOf(node).colour = this.colours.b;
                    this.gParentOf(node).colour = this.colours.r;
                    this.rightRotation(this.gParentOf(node));
                }
            }
            if(node === this.root) break;
        }

        this.root.colour = this.colours.b;
    }

    leftRotation(node){
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



    