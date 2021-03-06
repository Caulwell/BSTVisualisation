import BTNode from "./BTNode";

export default class AVLNode extends BTNode{

    constructor(value, id, parent=null, left = null, right=null, depth = null, x = null, y = null, lr = null){
        super(value, id, parent, left, right, depth, x, y, lr);
        this.balanceFactor = 0;
        this.height = 0;
        this.type = "avl";
    }


    getHeight(){
        // HEIGHT IS MAX HEIGHT OF LEFT/RIGHT SUBTREE + 1
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
        // BALANCE FACTOR IS DIFFERENCE BETWEEN LEFT AND RIGHT SUBTREE HEIGHT
        let nodeLeftHeight = this.left ? this.left.getHeight() : -1;
        let nodeRightHeight = this.right ? this.right.getHeight() : -1;

        return nodeLeftHeight - nodeRightHeight;
    }

}