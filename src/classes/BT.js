import { insertAnimation } from "../util/animations";
import BSTNode from "./BSTNode";

export default class BT { 

    constructor(){
        this.root = null;
        this.numNodes = 0;
        this.numInsertedTotal = 0;
        this.foundNode = null;
        this.affectedNodes = new Set();
        this.insertionAnimation = {highlightNodes: [], node: null};
        this.deletionAnimation = {highlightNodes: [], node: null};
        this.shiftNodesAnimation = [];
    }



    ///// GETTERS AND SETTERS ///////
    getRoot(){
        return this.root;
    }

    setRoot(node){
        this.root = node;
        if(node !== null){
            node.setDepth(0);
            node.setParent(null);
        }
        
    }

    getAffectedNodes(){
        return this.affectedNodes;
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

    resetAnimationObjects(){
        this.affectedNodes = new Set();
        this.insertionAnimation = {highlightNodes: [], node: null};
        this.deletionAnimation = {highlightNodes: [], node: null};
        this.shiftNodesAnimation = [];
    }

    ///// OPERATIONS ////////

    insert(value){

        this.resetAnimationObjects();

        let curr = this.root;
        const node = this.createNode(value);

        if(this.root === null){
            this.insertAtTop(node);
            this.insertionAnimation.node = node;
            return node;

        } else {

            for(;;){

                // add this node to an array, as an object, with {node: curr, status: "</>/=="}

                if(value < curr.value ){

                    this.insertionAnimation.highlightNodes.push(curr);

                    if(curr.left === null){
                        this.addLeftChild(curr, node);
                        this.insertionAnimation.node = node;
                        return node;
                    }

                    curr = curr.left; 

                } else if(value > curr.value || value === curr.value) {

                    this.insertionAnimation.highlightNodes.push(curr);

                    if(curr.right === null){
                        this.addRightChild(curr, node);
                        this.insertionAnimation.node = node;
                        return node;
                    }

                    curr = curr.right; 
                }
            }
        }
    }

    insertAtTop(node){
        this.setRoot(node);
        node.setX(window.innerWidth * 0.43);
        node.setY(window.innerHeight * 0.1);
        this.numNodes++;
        this.numInsertedTotal++;
    }

    delete(node){

        this.resetAnimationObjects();

        // get nodes to animate

        const getNodes = (node) => {
            if(!node) return;
            getNodes(node.parent);
            this.deletionAnimation.highlightNodes.push(node);
        };

        getNodes(node.parent);
        this.deletionAnimation.node = node;

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
           

        // HAS TWO CHILDREN
        } else if (node.right !== null && node.left !== null){

            let replacement = this.getLeftMostElementReal(node.right);

            if(replacement.right !== null && replacement.parent !== node) replacement.parent.setLeft(replacement.right);

            if(replacement.parent.left === replacement) replacement.parent.left = null;
            if(replacement.parent.right === replacement) replacement.parent.right = null;

            if(node !== this.root){
                // set parent child relationship for replacement
                if(node.parent.left === node) node.parent.setLeft(replacement);
                if(node.parent.right === node) node.parent.setRight(replacement);
            } else {
                this.setRoot(replacement);
            }
            
            // replacement cannot have a left, so set it to node's left
            replacement.setLeft(node.left);

            // don't want to set right to itself, but if node did have a right, set it for replacement
            if(node.right !== replacement && node.right !== null){
                if(node.right.left === null) node.right.setLeft(replacement.right);
                replacement.setRight(node.right);
            } 

        }
        this.numNodes --;
        return node.parent;  
    }

    traversal(order){
        let nodes = [];
        if(order === "in"){
            this.affectedNodes =  new Set(this.inOrder(this.root, nodes));
        } else if(order === "pre"){
            this.affectedNodes =  new Set(this.preOrder(this.root, nodes));
        } else if(order === "post"){
            this.affectedNodes =  new Set(this.postOrder(this.root, nodes));
        }
    }

    inOrder(top, nodes){
        if(top !== null){
            this.inOrder(top.left, nodes);
            if(!nodes.includes(top)) nodes.push(top);
            this.inOrder(top.right, nodes);
        }

        if(nodes.length === this.numNodes){
            return nodes;
        }
        
    }

    preOrder(top, nodes){
        if(top !== null){
            if(!nodes.includes(top)) nodes.push(top);
            this.preOrder(top.left, nodes);
            this.preOrder(top.right, nodes);
        }

        if(nodes.length === this.numNodes){
            return nodes;
        }
    }

    postOrder(top, nodes){
        if(top !== null){
            this.postOrder(top.left, nodes);
            this.postOrder(top.right, nodes);
            if(!nodes.includes(top)) nodes.push(top);
        }

        if(nodes.length === this.numNodes){
            return nodes;
        }
    }

    search(value){
        this.affectedNodes.clear();
        let curr = this.root;

        while(true){
            if(curr === null){
                break;
            } 
            if(curr.value === value){
                this.foundNode = curr;
                break;
            } else if(value < curr.value){
                this.affectedNodes.add(curr);
                curr = curr.left;
            } else if(value > curr.value){
                this.affectedNodes.add(curr);
                curr = curr.right;
                
            }
        }
    }


    /////// HELPERS ///////

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
            if(side === "l"){
                root.moveToX -=50;
            } 
            if(side === "r"){
                root.moveToX +=50;
            } 
            this.affectedNodes.add(root);
            this.shiftTree(root.left, side);
            this.shiftTree(root.right, side); 
        } else {
            return;
        }
    }

    checkChildrenTrees(root){
        // check leftmost and rightmost node of each tree - if they are too close, move each tree away from each other
        if(root.left && root.right){
            const leftsRightMost = this.getRightMostElement(root.left, root.left);
            const rightsLeftMost = this.getLeftMostElement(root.right, root.right);

            if(Math.abs(leftsRightMost.moveToX - rightsLeftMost.moveToX) <50 || leftsRightMost.moveToX > rightsLeftMost.moveToX ){
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

    getLeftMostElementReal(top){
        let curr = top;
        while(true){
            if(curr.left === null){
                return curr;
            } else {
                curr = curr.left;
            }
        }
    }

    getRightMostElementReal(top){
        let curr = top;
        while(true){
            if(curr.right === null){
                return curr;
            } else {
                curr = curr.right;
            }
        }
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
            this.checkChildrenTrees(root);  
        } else {
            return;
        }
    }

    resetLayout(node){
        if(!node) return;

        if(node.parent){
            
            if(node.lr == "l") node.moveToX = node.parent.moveToX -50;
            if(node.lr == "r") node.moveToX = node.parent.moveToX + 50;
            node.moveToY = node.parent.moveToY + 50;
        } else {
            node.moveToX = window.innerWidth * 0.43;
            node.moveToY = window.innerHeight * 0.1;
        }

        this.resetLayout(node.left);
        this.resetLayout(node.right);
    }

    findAlteredNodes(node){
        if(!node) return;

        if(node.x !== node.moveToX || node.y !== node.moveToY){
            this.shiftNodesAnimation.push(node);
        } 

        this.findAlteredNodes(node.left);
        this.findAlteredNodes(node.right);
    }

    resolveCoords(node){
        if(!node) return;

        node.x = node.moveToX;
        node.y = node.moveToY;

        this.resolveCoords(node.left);
        this.resolveCoords(node.right);
    }

    getTreeFromJSON(tree){

        let nodes = [];

        nodes = this.getNodesFromJSON(tree.root, nodes, tree.numNodes);

        nodes.sort( (first, second) => {
            if(first.id < second.id) return -1;
            if(second.id < first.id) return 1;
            return 0;
        });

        return nodes;
        
    }

    getNodesFromJSON(curr, nodes, length){
        if(curr !== null){
            this.getNodesFromJSON(curr.left, nodes, length);
            if(!nodes.includes(curr)) nodes.push(curr);
            this.getNodesFromJSON(curr.right, nodes, length);
        }

        if(nodes.length === length){
            return nodes;
        }
    }
    
}



    