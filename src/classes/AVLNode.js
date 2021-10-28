import BSTNode from "./BSTNode";

export default class AVLNode extends BSTNode{

    constructor(value, id){
        super(value, id);
        this.balanceFactor = 0;
        this.height = 0;
    }

    getHeight(){
        return this.height;
    }

    setHeight(value){
        this.height = value;
    }

    getBalanceFactor(){
        return this.balanceFactor;
    }

    setBalanceFactor(value){
        this.balanceFactor = value;

        if(this.balanceFactor !== 0 && this.balanceFactor !== -1 && this.balanceFactor !== 1){
            console.error("node: " + this.value + " has a balance factor of: " + this.balanceFactor);
        }

    }
}