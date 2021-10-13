export default class BSTNode{

    constructor(value, id){
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.depth = null;
        this.x = null;
        this.y = null;
        this.lr = null;
        this.id = id;
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