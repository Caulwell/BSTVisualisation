import BSTNode from "./BSTNode";

export default class RBNode extends BSTNode{

    constructor(value, id){
        super(value, id);
        this.type = "rb";
    }

}