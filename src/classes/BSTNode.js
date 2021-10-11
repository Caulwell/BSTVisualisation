export default class BSTNode{

    constructor(value, id){
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.x = null;
        this.y = null;
        this.lr = null;
        this.id = id;
    }


    setLeft(node){
        this.left = node;
        if(node !== null) node.setParent(this);
        node.setLR("l");
    }

    setRight(node){
        this.right = node;
        if(node !== null) node.setParent(this);
        node.setLR("r");
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

    setLR(value){
        this.lr = value;
    }



}