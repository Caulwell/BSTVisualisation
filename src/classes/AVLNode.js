import BSTNode from "./BSTNode";

export default class AVLNode extends BSTNode{

    constructor(value, id){
        super(value, id);
        this.balanceFactor = 0;
        this.height = 0;
    }

    getHeight(){
        if(!this.left && !this.right){
            return 0;
        } else {
            return Math.max(
                (this.left ? this.left.getHeight() : 0), 
                (this.right ? this.right.getHeight() : 0)
                ) +1;
        }
    }

    setHeight(value){
        this.height = value;
    }

    getBalanceFactor(){
        let nodeLeftHeight = this.left ? this.left.getHeight() : -1;
        let nodeRightHeight = this.right ? this.right.getHeight() : -1;

        return nodeLeftHeight - nodeRightHeight;
    }

    setBalanceFactor(value){
        this.balanceFactor = value;

        if(this.balanceFactor !== 0 && this.balanceFactor !== -1 && this.balanceFactor !== 1){
            console.error("node: " + this.value + " has a balance factor of: " + this.balanceFactor);
        }

    }
}