export default class BSTNode{

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
        
    }


    setLeft(node){
        this.left = node;
        if(node !== null){
            node.setParent(this);
            node.setLR("l");
            node.setDepth(this.depth + 1);
        }
    }

    setRight(node){
        this.right = node;
        if(node !== null){
            node.setParent(this);
            node.setLR("r");
            node.setDepth(this.depth + 1);
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

    setDepth(value){
        this.depth = value;
    }

    setLR(value){
        // required to position edge on the correct side
        this.lr = value;
    }



}