/**
 * @jest-environment jsdom
 */

 import RB from "../../classes/RB";
 import RBNode from "../../classes/RBNode";
 import BT from "../../classes/BT";
 

let rbTree = new RB();

 // test instance of BT
test("BST instance of BT", () => {
    expect(rbTree instanceof BT).toBeTruthy();
});

// test createNode is correct type
test("Create node = RBNode", () => {
    expect(rbTree.createNode(5) instanceof RBNode).toBeTruthy();
});

// test createNodeFromJSON returns correct type
test("Create node from JSON = RBNode", () => {
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
    expect(rbTree.createNodeFromJSON(node) instanceof RBNode).toBeTruthy();
});

//insert 1 node, test colour is black
test("insert 1 node, test colour is black", () => {
    rbTree.insert(28);
    expect(rbTree.getRoot().colour).toEqual("black");
});

//create tree, check correct colours
test("create tree, check correct colours", () => {
    rbTree = new RB();
    const values = [57,29,762];
    rbTree.getTreeFromValues(values);
    expect(rbTree.getRoot().colour).toEqual("black");
    expect(rbTree.getRoot().left.colour).toEqual("red");
    expect(rbTree.getRoot().right.colour).toEqual("red");
});

/*
        57b
    29r     762r


*/

//insert node, check colour change
test("insert node, check colour change", () => {
    let inserted = rbTree.insert(21);
    rbTree.fixOnInsertion(inserted);
    expect(rbTree.getRoot().colour).toEqual("black");
    expect(rbTree.getRoot().left.colour).toEqual("black");
    expect(rbTree.getRoot().right.colour).toEqual("black");
    expect(inserted.colour).toEqual("red");
});

/*

        57b
    29b      762b
21r          

*/

//insert node, check rotation
test("insert node, check rotation", () => {
    let inserted = rbTree.insert(27);
    rbTree.fixOnInsertion(inserted);
    expect(rbTree.getRoot().left.value === 27 && rbTree.getRoot().left.colour === "black").toBe(true);
    expect(rbTree.getRoot().left.left.value === 21 && rbTree.getRoot().left.left.colour === "red").toBe(true);
    expect(rbTree.getRoot().left.right.value === 29 && rbTree.getRoot().left.right.colour === "red").toBe(true);
    expect(rbTree.getRoot().right.value === 762 && rbTree.getRoot().right.colour === "black").toBe(true);
});

/*

            57b
    27b         762b
21r     29r          

*/


// delete node, check rotation
test("delete node, check rotation", () => {
    rbTree.deleteByValue(762);
    rbTree.fixOnDelete(rbTree.deleteFixNode);
    expect(rbTree.getRoot().value === 27 && rbTree.getRoot().colour === "black").toBe(true);
    expect(rbTree.getRoot().left.value === 21 && rbTree.getRoot().left.colour === "black").toBe(true);
    expect(rbTree.getRoot().right.value === 57 && rbTree.getRoot().right.colour === "black").toBe(true);
    expect(rbTree.getRoot().right.left.value === 29 && rbTree.getRoot().right.left.colour === "red").toBe(true);

})