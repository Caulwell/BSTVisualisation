import BSTNode from "./BSTNode";
import {moveNodes, searchAnimation, traversalAnimation} from "../util/animations";

export default class BT { 

    constructor(){
        this.root = null;
        this.numNodes = 0;
        this.numInsertedTotal = 0;
    }

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

    traversal(order){
        let nodes = [];
        if(order === "in"){
            nodes = this.inOrder(this.root, nodes);
            traversalAnimation(nodes);
        } else if(order === "pre"){
            nodes = this.preOrder(this.root, nodes);
            traversalAnimation(nodes);
        } else if(order === "post"){
            nodes = this.postOrder(this.root, nodes);
            traversalAnimation(nodes);
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
        let curr = this.root;

        let nodes = [];
        let foundNode = null;

        while(true){
            if(curr === null){
                break;
            } 
            if(curr.value === value){
                foundNode = curr;
                break;
            } else if(value < curr.value){
                nodes.push(curr);
                curr = curr.left;
            } else if(value > curr.value){
                nodes.push(curr);
                curr = curr.right;
                
            }
        }
        searchAnimation(nodes, foundNode);
    }

    setNewCordsOnMove(nodes){

        nodes.forEach(node => {

            node.setY(node.parent.y +50);
            if(node.lr === "l") node.setX(node.parent.x -50);
            if(node.lr === "r") node.setX(node.parent.x + 50);
            node.setDepth(node.parent.depth + 1);

        });

    }

    insertAtTop(value){
        const node = new BSTNode(value, this.numNodes);
        this.setRoot(node);
        node.setX(window.innerWidth * 0.43);
        node.setY(window.innerHeight * 0.1);
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
            node.setX(node.x -50);
            shiftedNodes = [...shiftedNodes, node];
        } else if(side === "r"){
            node.setX(node.x +50);
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
            if(insertSide === "l"){
                if(node.lr === "r"){
                    node.parent.setX(node.parent.x -50);
                    node.setX(node.x-50);
                    moveNodes([node.parent]);
                } else if(node.lr === "l"){
                    curr.setX(curr.x -50);
                    curr.parent.setX(curr.parent.x -50);
                    moveNodes([curr.parent, curr]);
                }
            } else if(insertSide === "r"){
                if(node.lr === "r"){
                    curr.setX(curr.x +50);
                    curr.parent.setX(curr.parent.x +50);
                    moveNodes([curr.parent, curr]);
                } else if(node.lr === "l"){
                    node.parent.setX(node.parent.x +50);
                    node.setX(node.x+50);
                    moveNodes([node.parent]);
                }
            }
        }

        if(curr.y === node.y && Math.abs(node.x -curr.x) <=50 && (node.x === curr.parent.x && curr.x === node.parent.x)){
            console.log(node, curr);
            if(insertSide === "l"){
                if(node.lr === "r"){
                    node.parent.setX(node.parent.x -50);
                    node.setX(node.x-50);
                    moveNodes([node.parent]);
                } else if(node.lr === "l"){
                    curr.setX(curr.x -50);
                    curr.parent.setX(curr.parent.x -50);
                    moveNodes([curr.parent, curr]);
                }
            } else if(insertSide === "r"){
                if(node.lr === "r"){
                    curr.setX(curr.x +50);
                    curr.parent.setX(curr.parent.x +50);
                    moveNodes([curr.parent, curr]);
                } else if(node.lr === "l"){
                    node.parent.setX(node.parent.x +50);
                    node.setX(node.x+50);
                    moveNodes([node.parent]);
                }
            }
        }

        this.checkForOverlap(node, curr.right, insertSide);
        
    }

    

    getTreeFromJSON(tree){

        let nodes = [];

        nodes = this.getNodesFromJSON(tree.root, nodes, tree.numNodes);

        nodes.sort( (first, second) => {
            if(first.id < second.id) return -1;
            if(second.id < first.id) return 1;
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



    