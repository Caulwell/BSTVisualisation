/**
 * @jest-environment jsdom
 */

 import AVL from "../../classes/AVL";
 import AVLNode from "../../classes/AVLNode";
 import BT from "../../classes/BT";
 

const avlTree = new AVL();

 // test instance of BT
test("BST instance of BT", () => {
    expect(avlTree instanceof BT).toBeTruthy();
});

// test createNode is correct type
test("Create node = BSTNode", () => {
    expect(avlTree.createNode(5) instanceof AVLNode).toBeTruthy();
});

// test createNodeFromJSON returns correct type
test("Create node from JSON = AVLNode", () => {
    const node = {
        value: 5,
        id: 1,
        parent: null,
        left: null,
        right: null,
        depth: 0,
        x: 400,
        y: 500,
        lr: "l"
    };
    expect(avlTree.createNodeFromJSON(node) instanceof AVLNode).toBeTruthy();
});


//create tree, check balance factor
test("create tree, test if node has correct balanceFactor", () => {
    const values = [8,4,12,19,21];
    avlTree.getTreeFromValues(values)
    expect(avlTree.getRoot().getBalanceFactor()).toBe(-1);
    expect(avlTree.getRoot().right.getBalanceFactor()).toBe(0);
});

/* 
        8 - should be -1
    4       19 - should be  0
        12      21

*/

//create imbalance
test("create unbalanced node with insert, check correct", () => {
    avlTree.insert(28);
    expect(avlTree.getRoot().getBalanceFactor()).toBe(-2);
});
/* 
        8 - should be -2
    4           19 - should be  -1
            12      21 
                        28

*/


//correct imbalance
test("correct imbalance", () => {
    avlTree.checkBalanceAfterOperation(avlTree.getRoot().right.right, false);
    expect(avlTree.getRoot().getBalanceFactor()).toBe(0);
    expect(avlTree.getRoot().value).toBe(19);
    expect(avlTree.getRoot().left.value).toBe(8);
    expect(avlTree.getRoot().right.value).toBe(21);
});

/* 
        19 
    8        21
4     12          28

*/