import shortid from "shortid";

export default class BT { 

    /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            CONSTRUCTOR
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */

    constructor(){
        this.root = null;
        this.numNodes = 0;
        this.numInsertedTotal = 0;
        this.foundNode = null;
        this.affectedNodes = new Set();
        this.operationAnimation = {highlightNodes: [], node: null};
        this.operationMessage = {name: "", decisions: [], id: null, type: ""};
        this.shiftNodesAnimation = [];

        // ABSTRACT CLASS BEHAVIOUR
        if(this.constructor === BT){
            throw new Error("Instance of Abstract class BT cannot be instantiated");
        }
    }



     /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            GETTERS AND SETTERS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */
    getRoot(){
        return this.root;
    }

    getDepth(root){
        // depth of tree is 1 + max depth of left/right branch
        if(! root) return 0;
        return 1 + Math.max(this.getDepth(root.left), this.getDepth(root.right));
    }

    getAffectedNodes(){
        // AFFECTEDNODES FOR NODE PLACEMENT MOVEMENT - A SET SO NO DUPLICATES
        return this.affectedNodes;
    }

    values(top) {
        // get all nodes in an array
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

    setRoot(node){
        this.root = node;
        if(node !== null){
            node.setParent(null);
        }
    }

    incrementNumNodes(){
        this.numNodes++;
        this.numInsertedTotal++;
    }

    decrementNumNodes(){
        this.numNodes--;
    }

    getNumNodes(){
        return this.numNodes;
    }

    resetAnimationObjects(){
        // perform this at beginning of any operation to ensure no duplicates
        this.affectedNodes = new Set();
        this.operationAnimation = {highlightNodes: [], node: null};
        this.shiftNodesAnimation = [];
    }

    initOperationMessage(name, type){
        // RESETS AND ADDS NAME, TYPE AND GENERATES A UNIQUE ID TO CATER FOR REACT KEY CONSTRAINTS
        this.operationMessage.name = name;
        this.operationMessage.decisions = [];
        this.operationMessage.id = shortid.generate();
        this.operationMessage.type = type;
    }

    addOperationMessageDecision(string){
        this.operationMessage.decisions.push(string);
    }

    addOperationAnimationHighlightNode(node){
        this.operationAnimation.highlightNodes.push(node);
    }

    addOperationAnimationMainNode(node){
        this.operationAnimation.node = node;
    }

    // GETTERS TO DEAL WITH NULL POINTERS
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

      /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                           TREE OPERATIONS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */

    getMinNode(){
        // GET ALL NODES TO HIGHLIGHT DURING ANIMATION AND RETURN FINAL NODE
        this.resetAnimationObjects();

        this.initOperationMessage("Min", "get");
        
        this.addOperationMessageDecision("Checking root");
        let nodes = [];
        // get min value of tree
        let curr = this.root;

        if(!curr){
            this.addOperationMessageDecision("Root is null, terminating operation");
            return;
        }

        nodes.push(curr);
        this.addOperationMessageDecision("Visiting root: " + curr.value);

        while(curr.left){
            this.addOperationMessageDecision("Checking " + curr.value + ".left: " + curr.left.value);
            curr = curr.left;
            this.addOperationMessageDecision("Visiting " + curr.value);
            nodes.push(curr);

        }

        this.addOperationMessageDecision(curr.value + ".left is null");
        this.addOperationMessageDecision("Minimum node: " + curr.value);

        this.affectedNodes =  new Set(nodes);

        return curr.value;
    }

    getMaxNode(){
        // GET ALL NODES TO HIGHLIGHT DURING ANIMATION AND RETURN FINAL NODE
        this.resetAnimationObjects();
        this.initOperationMessage("Max", "get");
        this.addOperationMessageDecision("Checking root");
        let nodes = [];
        let curr = this.root;

        if(!curr){
            this.addOperationMessageDecision("Root is null, terminating operation");
            return;
        }

        nodes.push(curr);
        this.addOperationMessageDecision("Visiting root: " + curr.value);

        while(curr.right){
            this.addOperationMessageDecision("Checking " + curr.value + ".right: " + curr.right.value);
            curr = curr.right;
            this.addOperationMessageDecision("Visiting " + curr.value);
            nodes.push(curr);

        }

        this.addOperationMessageDecision(curr.value + ".right is null");
        this.addOperationMessageDecision("Maximum node: " + curr.value);

        this.affectedNodes =  new Set(nodes);

        return curr.value;
    }
    
    insert(value){

        this.resetAnimationObjects();
        this.initOperationMessage(value, "insert");


        let curr = this.getRoot();

        //CREATE CORRECT NODE TYPE
        const node = this.createNode(value);

        // IF ROOT NULL, INSERT AS ROOT
        if(this.root === null){
            this.insertAtTop(node);
            this.addOperationAnimationMainNode(node);
            this.addOperationMessageDecision("No root node found, " + value + "is now root")
            return node;

        } else {

            for(;;){

                // TRAVERSE LEFT OF CURR
                if(node.lessThan(curr)){

                    this.addOperationMessageDecision(value + " < " + curr.value + ": checking " + curr.value + ".left");

                    this.addOperationAnimationHighlightNode(curr);

                    // INSERT NODE
                    if(!this.leftOf(curr)){
                        this.addLeftChild(curr, node);
                        this.addOperationAnimationMainNode(node);
                        this.addOperationMessageDecision(curr.value + ".left is null, inserting " + value + " in place");
                        return node;
                    }

                    // NEXT LOOP ON LEFT OF CURR
                    curr = this.leftOf(curr); 

                    // TRAVERSE RIGHT OF CURR
                } else if(node.moreThan(curr) || node.equalTo(curr)) {

                    if(value === curr.value) this.addOperationMessageDecision(value + " == " + curr.value + ": checking " + curr.value + ".right");
                    if(value > curr.value) this.addOperationMessageDecision(value + " > " + curr.value + ": checking " + curr.value + ".right");

                    this.addOperationAnimationHighlightNode(curr);

                    // INSERT NODE
                    if(curr.right === null){
                        this.addRightChild(curr, node);
                        this.addOperationAnimationMainNode(node);
                        this.addOperationMessageDecision(curr.value + ".right is null, inserting " + value + " in place");
                        return node;
                    }

                    // NEXT LOOP ON RIGHT OF CURR
                    curr = this.rightOf(curr); 
                }
            }
        }
    }

    insertAtTop(node){
        this.setRoot(node);
        const svg = document.getElementById("canvas");
        
        // handle no svg for testing
        if(!svg){
            node.setX(400);
            node.setY(200);
        }else{
            node.setX(svg.clientWidth * 0.5);
            node.setY(svg.clientHeight * 0.3);
        }
        
        this.incrementNumNodes();
    }

    deleteByValue(value){
        // TO BE USED WHEN USER DELETES USING NUMBER INPUT
        this.resetAnimationObjects();
        this.initOperationMessage(value, "delete");
        this.addOperationMessageDecision("Searching for " + value);

        let curr = this.root;
        let nodeToDelete = null;

        // find node
        while(curr){

            if(curr.value === value){
                nodeToDelete = curr;
                break;
            } else {
                this.addOperationAnimationHighlightNode(curr);
                if(value < curr.value){
                    this.addOperationMessageDecision(value + " < "  + curr.value + " - checking curr.left");
                    curr = curr.left;
                } else if(value > curr.value){
                    this.addOperationMessageDecision(value + " > "  + curr.value + " - checking curr.right");
                    curr = curr.right;
                }
            }
        }


        
        if(!nodeToDelete){
            // node not in tree
            this.addOperationMessageDecision("A node with value: " + value + " was not found in this tree");
            return;
        } else {
            // node found with this value - delete it
            this.addOperationMessageDecision("Found node with value " + value + " - Deleting node");
            this.addOperationAnimationMainNode(nodeToDelete);
            // RETURN PRODUCT OF DELETE FUNCTION
            return this.delete(nodeToDelete);

        }

    }


    deleteNode(node){
        // TO BE USED WHEN USER CLICKS A NODE TO DELETE
        this.resetAnimationObjects();
        this.initOperationMessage(node.value, "delete");
        this.addOperationMessageDecision("Searching for " + node.value);

        // get nodes to animate
        const getNodes = (node) => {
            if(!node) return;
            getNodes(node.parent);
            this.addOperationAnimationHighlightNode(node);
        };

        // setting tree attributes for animating deletion
        getNodes(node.parent);
        this.addOperationAnimationMainNode(node);

        // setting tree attributes for deletion messages
        this.operationAnimation.highlightNodes.forEach(element => {
            if(node.lessThan(element)){
                this.addOperationMessageDecision(node.value + " < " + element.value + ": checking " + element.value + ".left" );
                if(this.leftOf(element) === node) this.addOperationMessageDecision(element.value + ".left === " + node.value + ": deleting " + node.value);
            } 
            if(node.moreThan(element)){
                this.addOperationMessageDecision(node.value + " > " + element.value + ": checking " + element.value + ".right" );
                if(this.rightOf(element) === node) this.addOperationMessageDecision(element.value + ".right === " + node.value + ": deleting " + node.value);
            }
        });
        // RETURN PRODUCT OF DELETE FUNCTION
        return this.delete(node);


    }

    delete(node){
        // NODE IS FOUND - DELETE AND REARRANGE IF NEEDED

        // IS A LEAF NODE
        if(node.isLeaf()){

            this.addOperationMessageDecision(node.value + " is a leaf node");

            if(node === this.root){
                // is root node
                this.setRoot(null);
            } else {
                // not root node
                if(this.leftOf(this.parentOf(node)) === node) node.parent.setLeft(null);
                if(this.rightOf(this.parentOf(node)) === node) node.parent.setRight(null);
            }

        // ONLY HAS A LEFT CHILD
        } else if (this.leftOf(node) !== null && this.rightOf(node) === null){

            this.addOperationMessageDecision(node.value + " only has a left child");
            this.addOperationMessageDecision(this.leftOf(node).value + " replaces " + node.value);
  
            // is root node
            if(node === this.root){
                this.setRoot(this.leftOf(node));
            // not root node
            } else {
                if(this.leftOf(this.parentOf(node)) === node){
                    node.parent.setLeft(this.leftOf(node));
                } 
                if(this.rightOf(this.parentOf(node)) === node){
                    node.parent.setRight(this.leftOf(node));
                }   
            }


            

        // ONLY HAS A RIGHT CHILD
        } else if (this.rightOf(node) !== null && this.leftOf(node) === null){

            this.addOperationMessageDecision(node.value + " only has a right child");
            this.addOperationMessageDecision(this.rightOf(node).value + " replaces " + node.value);

            // is root node
            if(node === this.root){
                this.setRoot(this.rightOf(node));
            // not root node
            } else {
                if(node.parent.left === node) node.parent.setLeft(this.rightOf(node));
                if(node.parent.right === node) node.parent.setRight(this.rightOf(node));
            }
           

        // HAS TWO CHILDREN
        } else if (this.rightOf(node) !== null && this.leftOf(node) !== null){

            let replacement = this.getLeftMostElementReal(this.rightOf(node));

            this.addOperationMessageDecision(node.value + "  has two children");
            this.addOperationMessageDecision(replacement.value + " is leftmost node in right subtree of " + node.value);
            this.addOperationMessageDecision(replacement.value + " replaces " + node.value);

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
            replacement.setLeft(this.leftOf(node));
            replacement.moveToX = node.moveToX;
            replacement.moveToY = node.moveToY;

            // don't want to set right to itself, but if node did have a right, set it for replacement
            if(this.rightOf(node) !== replacement && this.rightOf(node) !== null){
                if(this.rightOf(node).left === null) this.rightOf(node).setLeft(replacement.right);
                replacement.setRight(this.rightOf(node));
            } 

        }
        this.decrementNumNodes();
        return node.parent;  
    }

    traversal(order){
        let nodes = [];
        if(order === "in"){
            this.initOperationMessage("In-Order", "traverse");
            this.addOperationMessageDecision("Traversing left subtree of a node")
            this.addOperationMessageDecision("The node itself");
            this.addOperationMessageDecision("Then the right subtree of the node");

            this.affectedNodes =  new Set(this.inOrder(this.root, nodes));

            this.addOperationMessageDecision("Values: ");
            this.addOperationMessageDecision([...this.affectedNodes]
                .map(node => node.value)
                .join(","));

        } else if(order === "pre"){
            this.initOperationMessage("Pre-Order", "traverse");
            this.addOperationMessageDecision("Traversing a node")
            this.addOperationMessageDecision("The left subtree of the node");
            this.addOperationMessageDecision("Then the right subtree of the node");

            this.affectedNodes =  new Set(this.preOrder(this.root, nodes));

            this.addOperationMessageDecision("Values: ");
            this.addOperationMessageDecision([...this.affectedNodes]
                .map(node => node.value)
                .join(","));

        } else if(order === "post"){
            this.initOperationMessage("Post-Order", "traverse");
            this.addOperationMessageDecision("Traversing the left subtree of a node");
            this.addOperationMessageDecision("The right subtree of the node");
            this.addOperationMessageDecision("Then the node itself");

            this.affectedNodes =  new Set(this.postOrder(this.root, nodes));

            this.addOperationMessageDecision("Values: ");
            this.addOperationMessageDecision([...this.affectedNodes]
                .map(node => node.value)
                .join(","));

        }
    }

    inOrder(top, nodes){   
        if(top !== null){
            this.inOrder(this.leftOf(top), nodes);
            if(!nodes.includes(top)) nodes.push(top);
            this.inOrder(this.rightOf(top), nodes);
        }

        if(nodes.length === this.numNodes){
            return nodes;
        }
        
    }

    preOrder(top, nodes){
        if(top !== null){
            if(!nodes.includes(top)) nodes.push(top);
            this.preOrder(this.leftOf(top), nodes);
            this.preOrder(this.rightOf(top), nodes);
        }

        if(nodes.length === this.numNodes){
            return nodes;
        }
    }

    postOrder(top, nodes){
        if(top !== null){
            this.postOrder(this.leftOf(top), nodes);
            this.postOrder(this.rightOf(top), nodes);
            if(!nodes.includes(top)) nodes.push(top);
        }

        if(nodes.length === this.numNodes){
            return nodes;
        }
    }

    search(value){
        this.affectedNodes.clear();
        this.foundNode = null;
        let curr = this.root;

        this.initOperationMessage(value, "search");

        while(true){
            if(curr === null){
                break;
            } 
            if(curr.value === value){
                this.foundNode = curr;
                this.addOperationMessageDecision("Found " + curr.value);
                break;
            } else if(value < curr.value){
                this.affectedNodes.add(curr);
                this.addOperationMessageDecision(value + " < " + curr.value + ": Checking " + curr.value + ".left");
                curr = this.leftOf(curr);
            } else if(value > curr.value){
                this.affectedNodes.add(curr);
                this.addOperationMessageDecision(value + " > " + curr.value + ": Checking " + curr.value + ".right");
                curr = this.rightOf(curr);
                
            }
        }

        if(this.foundNode === null){
            this.addOperationMessageDecision(value + " is not present in this tree");
        }
    }


    /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            OPERATION HELPERS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */



    transplant(node1, node2){

        if(!node1.parent){
            this.setRoot(node2);
        } else if(node1 === this.leftOf(this.parentOf(node1))){
            this.parentOf(node1).setLeft(node2);
        } else {
            this.parentOf(node1).setRight(node2);
        }

    }

    addLeftChild(curr, node){
        curr.setLeft(node);
        node.setX(node.parent.x -50);
        node.setY(node.parent.y + 50);

        this.incrementNumNodes();

    }

    addRightChild(curr, node){

        curr.setRight(node);
        node.setX(node.parent.x + 50);
        node.setY(node.parent.y + 50);

        this.incrementNumNodes();
    }

    getLeftMostElement(top, leftMost){
        // LEFT MOST IN COORDINATE CONTEXT
        if(top===null){
            return;
        } 

        if(this.leftOf(top) != null) leftMost = this.getLeftMostElement(this.leftOf(top), leftMost);
        if(this.rightOf(top) != null) leftMost = this.getLeftMostElement(this.rightOf(top), leftMost);

        if(top != null && top.x < leftMost.x) leftMost = top;

        return leftMost;
    }

    getLeftMostElementReal(top){
        // LEFTMOST IN TREE STRUCTURE CONTEXT
        let curr = top;
        while(true){
            if(!this.leftOf(curr)){
                return curr;
            } else {
                curr = this.leftOf(curr);
            }
        }
    }

    getRightMostElement(top, rightMost){
        // RIGHTMOST IN COORDINATE CONTEXT
        if(top===null){
            return;
        } 

        if(this.leftOf(top)) rightMost = this.getRightMostElement(this.leftOf(top), rightMost);
        if(this.rightOf(top)) rightMost = this.getRightMostElement(this.rightOf(top), rightMost);

        if(top && top.x > rightMost.x) rightMost = top;

        return rightMost;
        
    }

    getRightMostElementReal(top){
        // RIGHTMOST IN TREE STRUCTURE CONTEXT
        let curr = top;
        while(true){
            if(!this.rightOf(curr)){
                return curr;
            } else {
                curr = this.rightOf(curr);
            }
        }
    }

    

    /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                            NODE PLACEMENT HELPERS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */
    

    shiftTree(root, side){
        // SHIFTS ALL NODES DESCENDING FROM ROOT THE LEFT OR RIGHT BY 50 UNITS RECURSIVELY
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
        if(this.leftOf(root) && this.rightOf(root)){
            const leftsRightMost = this.getRightMostElement(this.leftOf(root), this.leftOf(root));
            const rightsLeftMost = this.getLeftMostElement(this.rightOf(root), this.rightOf(root));

            if(Math.abs(leftsRightMost.moveToX - rightsLeftMost.moveToX) <50 || leftsRightMost.moveToX > rightsLeftMost.moveToX ){
                this.shiftTree(this.rightOf(root), "r");
                this.shiftTree(this.leftOf(root), "l");
            }
        }
    }

    correctCords(){
        // PARENT METHOD FOR CHECKING OVERLAPS
        this.resetLayout(this.root);
        this.checkLayout(this.root);
        this.findAlteredNodes(this.root);
    }
  
    checkLayout(root){
        // RECURSIVELY CHECKS IN POST-ORDER FASHION
        if(root){
            this.checkLayout(this.leftOf(root));
            this.checkLayout(this.rightOf(root));
            this.setInitialCoords(root);
            this.checkChildrenTrees(root);
        } else {
            return;
        }
    }

    setInitialCoords(node){

        if(!node) return;

        // if it has 2 children, place it in the middle of its children
        if(node.left && node.right){
            node.moveToX = node.left.moveToX + ((node.right.moveToX - node.left.moveToX) / 2);
        } 

        // if it has one left child, place it +50x of left child
        if(!node.right && node.left) node.moveToX = node.left.moveToX + 50;

        if(!node.left && node.right) node.moveToX = node.right.moveToX - 50;

        let curr = node;

        // CHECKS IF ANY NODE IS TO LEFT/RIGHT OF ITS ANCESTORS
        while(curr){

            if(!(curr.left && curr.right)){
                curr = curr.parent;
                continue;
            } 
            
            if(curr.right && node.isDescendantOf(curr.right)){
                if(node.moveToX <= curr.moveToX){
                    this.shiftTree(curr.right, "r");
                }
            }

            if(curr.left && node.isDescendantOf(curr.left)){
                if(node.moveToX >= curr.moveToX){
                    this.shiftTree(curr.left, "l");
                }
            }

            curr = curr.parent;
        }
        //if node is descendent of right subtree of root, dont let it drift further left than root
        if(this.root.right && node.isDescendantOf(this.root.right)){
            if(node.moveToX <= this.root.moveToX){
                this.shiftTree(this.root.right, "r");
            }
        }


        // if node is descendent of left subtree of root, dont let it drift further right than root
        if(this.root.left && node.isDescendantOf(this.root.left)){
            if(node.moveToX >= this.root.moveToX){
                this.shiftTree(this.root.left, "l");
            }
        }

        



    }

    resetLayout(node){
        // RETURNS NODES TO +50/-50 OF PARENT DEPENDING ON SIDE - IF ROOT, SET TO CANVAS WIDTH/2
        if(!node) return;

        if(this.parentOf(node)){
            
            if(node.lr === "l") node.moveToX = this.parentOf(node).moveToX -50;
            if(node.lr === "r") node.moveToX = this.parentOf(node).moveToX + 50;
            node.moveToY = this.parentOf(node).moveToY + 50;
        } else {
            const svg = document.getElementById("canvas");
            node.moveToX = svg.clientWidth * 0.5;
            node.moveToY = svg.clientHeight * 0.3;
        }

        this.resetLayout(this.leftOf(node));
        this.resetLayout(this.rightOf(node));
    }

    findAlteredNodes(node){
        // GET NODES WHICH COORDINATES HAVE BEEN MOVED BY OVERLAP CHECKS - TO BE GATHERED FOR ANIMATION OF MOVEMENT
        if(!node) return;

        if(node.x !== node.moveToX || node.y !== node.moveToY){
            this.shiftNodesAnimation.push(node);
        } 

        this.findAlteredNodes(this.leftOf(node));
        this.findAlteredNodes(this.rightOf(node));
    }

    resolveCoords(node){
        // AFTER ALTERED NODES FOUND, SET COORDINATES TO BE EQUAL TO MOVED COORDINATES SO WILL NOT APPEAR IN ALTERED NODES UNECESSARILY
        if(!node) return;

        node.x = node.moveToX;
        node.y = node.moveToY;

        this.resolveCoords(this.leftOf(node));
        this.resolveCoords(this.rightOf(node));
    }

    /*
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                           TREE GENERATION
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    */

    getTreeFromJSON(tree){

        // RETURNS ROOT OF TREE AFTER CONVERSION FROM JSON TO TREE OF CORRECT TYPE
        let arrayNodes = this.getArrayOfJsonNodes(tree.root, []);

        arrayNodes.forEach((node, index) => {
            arrayNodes[index] = this.createNodeFromJSON(node);
        });

        let linkedNodes = this.addLinksToNodeArray(arrayNodes);

        return linkedNodes.filter(node => {
            return node.parent === null;
        });

    }

    getArrayOfJsonNodes(root, array){
        // FROM JSON STRUCTURE TO ARRAY OF JSON NODES
        if(!root) return;
        array.push(root);
        this.getArrayOfJsonNodes(root.left, array);
        this.getArrayOfJsonNodes(root.right, array);

        return array;
    }

    addLinksToNodeArray(nodes){
        // ENSURE THAT NODES REFERENCE EACHOTHER - BEFOREHAND THEY ONLY REFERENCE THE ID OF NODE
        let nodesCopy = [];

        // sort so id corresponds to index
        nodes.forEach((node) => {
            nodesCopy[node.id] = node;
        });

        // add links to parent, left, right
        nodesCopy.forEach((node,index) => {

            if(node.parent) nodesCopy[index].parent = nodesCopy[node.parent.id];
            if(node.left) nodesCopy[index].left = nodesCopy[node.left.id];
            if(node.right) nodesCopy[index].right = nodesCopy[node.right.id];

        });

        return nodesCopy;
    }
    
}



    