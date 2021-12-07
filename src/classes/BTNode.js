export default class BTNode{

    constructor(value, id, parent=null, left = null, right=null, depth = null, x = null, y = null, lr = null){
        this.id = id;
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
        this.depth = depth;
        this.x = x;
        this.y = y;
        this.lr = lr;
        this.moveToX = x;
        this.moveToY = y;

        if(this.constructor === BTNode){
            throw new Error("Instance of Abstract class BTNode cannot be instantiated");
        }
    }

    getParent(){
        return this.parent;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }

    lessThan(node){
        return this.value < node.value ?  true : false;
    }

    moreThan(node){
        return this.value > node.value ? true : false;
    }

    equalTo(node){
        return this.value === node.value ? true : false;
    }

    isLeaf(){
        return this.left === null && this.right === null ? true : false;
    }


    setLeft(node){
        this.left = node;
        if(node !== null){
            node.setParent(this);
            node.setLR("l");
        }
    }

    setRight(node){
        this.right = node;
        if(node !== null){
            node.setParent(this);
            node.setLR("r");
        } 
        
    }

    setParent(node){
        this.parent = node;
    }

    setX(value){
        this.x = value;
    }

    setY(value){
        this.y = value;
    }

    getDepth(){
        if(!this.parent) return 0;
        return this.parent.getDepth() + 1;
    }

    setLR(value){
        // required to position edge on the correct side
        this.lr = value;
    }



}