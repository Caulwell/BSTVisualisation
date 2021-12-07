import BTNode from "./BTNode";

export default class RBNode extends BTNode{

    constructor(value, id, parent=null, left = null, right=null, depth = null, x = null, y = null, lr = null){
        super(value, id, parent, left, right, depth, x, y, lr);
        this.type = "rb";
        this.colour = null;
    }

}