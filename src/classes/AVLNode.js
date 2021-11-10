import BSTNode from "./BSTNode";

export default class AVLNode extends BSTNode{

    constructor(value, id, parent=null, left = null, right=null, depth = null, x = null, y = null, lr = null){
        super(value, id, parent, left, right, depth, x, y, lr);
        this.balanceFactor = 0;
        this.height = 0;
        this.type = "avl";
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

    getBalanceFactor(){
        let nodeLeftHeight = this.left ? this.left.getHeight() : -1;
        let nodeRightHeight = this.right ? this.right.getHeight() : -1;

        return nodeLeftHeight - nodeRightHeight;
    }

}