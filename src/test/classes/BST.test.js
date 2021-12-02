/**
 * @jest-environment jsdom
 */

import BST from "../../classes/BST";
import BSTNode from "../../classes/BSTNode";
import BT from "../../classes/BT";


// BT CLASS

// instantiate abstract BT class, expect not allowed
test("Test Abstract BT cannot be instantiated", () => {
    expect(() => new BT()).toThrow(Error);
});


//BST CLASS

const binarySearchTree = new BST();

// test instance of BT
test("BST instance of BT", () => {
    expect(binarySearchTree instanceof BT).toBeTruthy();
});

// test createNode is correct type
test("Create node = BSTNode", () => {
    expect(binarySearchTree.createNode(5) instanceof BSTNode).toBeTruthy();
});

// test createNodeFromJSON returns correct type
test("Create node from JSON = BSTNode", () => {
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
    expect(binarySearchTree.createNodeFromJSON(node) instanceof BSTNode).toBeTruthy();
});



//test getTreeFromValues
test("get tree from values method creates tree of correct length", () => {
    const values = [8,19,4,26,6,1,18,29];
    binarySearchTree.getTreeFromValues(values)
    expect(binarySearchTree.values(binarySearchTree.getRoot()).length).toBe(values.length);
});

/* 
                    8
        4                       19
    1        6            18          26
                                            29


*/

//test getRoot
test("get root value = 8", () => {
    expect(binarySearchTree.getRoot().value).toBe(8);
});

//test getMinNode
test("getMinNode value = 1", () => {
    expect(binarySearchTree.getMinNode()).toBe(1);
});

//test getMaxNode
test("getMaxNode value = 17", () => {
    expect(binarySearchTree.getMaxNode()).toBe(29);
});

//test insert
test("insert", () => {
    const numNodes = binarySearchTree.numNodes;
    binarySearchTree.insert(36);
    expect(binarySearchTree.numNodes).toBe(numNodes +1);
    expect(binarySearchTree.getMaxNode()).toBe(36);
});

/* 
                    8
        4                       19
    1        6            18          26
                                            29
                                                36


*/

// test delete
test("deleteByValue", () => {
    const numNodes = binarySearchTree.numNodes;
    binarySearchTree.deleteByValue(36);

    expect(binarySearchTree.numNodes).toBe(numNodes -1);
    expect(binarySearchTree.getMaxNode()).toBe(29);
    expect(binarySearchTree.getRoot().right.right.right.right).toBe(null);
});

/* 
                    8
        4                       19
    1        6            18          26
                                            29
                                                


*/

test("deleteNode", () => {
    const numNodes = binarySearchTree.numNodes;
    const nodeToDelete = binarySearchTree.root.left;
    binarySearchTree.deleteNode(nodeToDelete);

    expect(binarySearchTree.numNodes).toBe(numNodes -1);
    expect(binarySearchTree.getRoot().left.value).toBe(6);
    expect(binarySearchTree.getRoot().left.left.value).toBe(1);
});

/* 
                    8
        6                       19
    1                     18          26
                                            29
                                                


*/

//test getDepth
test("getDepth", () => {
    expect(binarySearchTree.getDepth(binarySearchTree.getRoot())).toBe(4);
});


//test inOrdertraversal
test("inOrderTraversal", () => {
    binarySearchTree.traversal("in");

    const inOrderValues = [...binarySearchTree.affectedNodes]
        .map(node => {
            return node.value;
        });

    expect(inOrderValues).toEqual([1,6,8,18,19,26,29]);
});

//test preOrdertraversal
test("preOrderTraversal", () => {
    binarySearchTree.traversal("pre");

    const preOrderValues = [...binarySearchTree.affectedNodes]
        .map(node => {
            return node.value;
        });

    expect(preOrderValues).toEqual([8,6,1,19,18,26,29]);
});


//test postOrdertraversal
test("postOrderTraversal", () => {
    binarySearchTree.traversal("post");

    const postOrderValues = [...binarySearchTree.affectedNodes]
        .map(node => {
            return node.value;
        });

    expect(postOrderValues).toEqual([1,6,18,29,26,19,8]);
});

//test search
test("search", () => {
    binarySearchTree.search(6);
    expect(binarySearchTree.foundNode.value).toBe(6);
    binarySearchTree.search(7);
    expect(binarySearchTree.foundNode).toBe(null);
});