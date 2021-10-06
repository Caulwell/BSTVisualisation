import BSTNode from "./BSTNode";

export default class BST {

    constructor(){
        this.root = null;
    }

    insertAtTop(value){
        const node = new BSTNode(value);
        this.root = node;
        node.x = window.innerWidth * 0.4;
        node.y = window.innerHeight * 0.1;
    }

    addLeftChild(insertSide, curr, node){
        if(insertSide === "r"){
            // Adding a right child on the left tree - shift left tree to left
            let node = this.root.right;
        } 

        curr.left = node;
        node.parent = curr;
        node.x = node.parent.x - 50;
        node.y = node.parent.y + 50;
        node.lr = "l";
    }

    addRightChild(insertSide, curr, node){
        if(insertSide === "l"){
            // Adding a left child on the right tree - shift right tree to right
            let node = this.root.left;
        } 

        curr.right = node;
        node.parent = curr;
        node.x = node.parent.x + 50;
        node.y = node.parent.y + 50;
        node.lr = "r";
    }

    insert(value){
        let curr = this.root;
        const node = new BSTNode(value);

        if(this.root === null){
            this.insertAtTop(value);
            return;

        } else {

            let insertSide = "";

            for(;;){
                if(value < curr.value ){
                    console.log("value: " + value + " < " + curr.value);
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
                    console.log("value: " + value + " > " + curr.value);
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