import {useEffect, useState, useContext, useRef } from "react";
import Controls from "../../components/ControlBar/ControlBar";
import Node from "../../components/Node/Node";
import BST from "../../classes/BST";
import "./Tree.css";
import {stringify, toJSON} from "flatted";
import { UserContext } from "../../context/UserContext";
import { Card, Paper, Typography } from "@mui/material";
import AVL from "../../classes/AVL";
import RB from "../../classes/RB";
import { insertAnimation, deleteAnimation, moveNodes, searchAnimation, traversalAnimation, checkBalanceAnimation, quickInsert } from "../../util/animations";
import configureZoom from "../../util/zoomPan";
import MessageBar from "../../components/MessageBar/MessageBar";


export default function Tree({type}){

  const [userContext, setUserContext] = useContext(UserContext);
  const [alert, setAlert] = useState({});
  const [tree, setTree] = useState();
  const [nodes, setNodes] = useState([]);
  const [operationMessages, setOperationMessages] = useState([]);
  const [loadingTree, setLoadingTree] = useState(false);
  const [addingMessage, setAddingMessage] = useState(false);
  const svgEl = useRef(null);
  const svgContainerEl = useRef(null);

  const timer = ms => new Promise(res => setTimeout(res, ms));

  const getAndSetOperationMessages = () => {
    setAddingMessage(true);
    setOperationMessages([tree.operationMessage, ...operationMessages]);
    setAddingMessage(false);
  };

  useEffect(() => {
    configureZoom(svgEl, svgContainerEl);

  },[]);

  useEffect(() => {
    // when loading a whole tree from memory, on setting nodes, perform animations
    loadingTree && nodes.forEach(async node => {
      quickInsert(node);
    });
    setLoadingTree(false);
  },[nodes]);

  useEffect(() => {
    addingMessage && saveMessages();
  },[operationMessages]);

  const saveCurrentTree = () => {

    if(type === "bst"){
      setUserContext(oldValues => {
        return {...oldValues, currentBST: tree};
      });
    } else if(type === "avl"){
      setUserContext(oldValues => {
        return {...oldValues, currentAVL: tree};
      });
    } else {
      setUserContext(oldValues => {
        return {...oldValues, currentRB: tree};
      });
    }
    
  };

  const saveMessages = () => {

    if(type === "bst"){
      setUserContext(oldValues => {
        return {...oldValues, currentBSTMessages: operationMessages};
      });
    } else if(type === "avl"){
      setUserContext(oldValues => {
        return {...oldValues, currentAVLMessages: operationMessages};
      });
    } else {
      setUserContext(oldValues => {
        return {...oldValues, currentRBMessages: operationMessages};
      });
    }

  };


  const renderCurrentTree = (tree, messages) => {

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    let newRoot = renderTree.getTreeFromJSON(tree)[0];
    renderTree.setRoot(newRoot);

    setLoadingTree(true);

    let nodesToRender = renderTree.values(renderTree.getRoot());
    setOperationMessages(messages);
    setNodes(nodesToRender);

    renderTree.numNodes = nodesToRender.length;
    renderTree.numInsertedTotal = nodesToRender.length;

    setTree(renderTree);
    console.log(messages);
    

  };

  useEffect(() => {
    if(type === "bst"){
      setTree(new BST());
      setNodes([]);
      setOperationMessages([]);
      if(userContext.currentBST) renderCurrentTree(userContext.currentBST, userContext.currentBSTMessages);
    } else if(type === "avl"){
      setTree(new AVL());
      setNodes([]);
      setOperationMessages([]);
      if(userContext.currentAVL) renderCurrentTree(userContext.currentAVL, userContext.currentAVLMessages);
    } else {
      setTree(new RB());
      setNodes([]);
      setOperationMessages([]);
      if(userContext.currentRB) renderCurrentTree(userContext.currentRB, userContext.currentRBMessages);  
    }
    
  }, [type]);

  

  async function addNode(value){

    if(value !== ""){

      // set internal data structure
      let insertedNode = tree.insert(parseInt(value));
      // render node in intitial position
      setNodes(tree.values(tree.getRoot()));

      await timer(100);
      // play insertion animation
      await insertAnimation(tree.insertionAnimation.highlightNodes, tree.insertionAnimation.node, userContext.animationSpeed);


      // if avl tree - check for unbalanced nodes, animate this checking - balance the tree in memory
      if(type === "avl"){
        if(insertedNode.parent) {
          tree.checkBalanceAfterOperation(insertedNode.parent, false);
          await checkBalanceAnimation(tree.checkBalanceAnimation.checkingNodes, tree.checkBalanceAnimation.foundNode, userContext.animationSpeed);
        }
      }
      
      // if rb tree - restore rb tree properties
      if(type === "rb"){
        if(insertedNode.parent){
          tree.fixOnInsertion(insertedNode);
          
        }
      }

      // add a new operationMessage to display to user
      getAndSetOperationMessages();

      // reset x and ys to original values - new attribute moveTo
      tree.resetLayout(tree.getRoot());

      // check for overlaps - change moveTo again
      tree.checkLayout(tree.getRoot());

      // animate only the nodes for which moveTo is different to current x and y
      tree.findAlteredNodes(tree.getRoot());
      await moveNodes(tree.shiftNodesAnimation, userContext.animationSpeed);

      // reset x and ys to moveTo
      tree.resolveCoords(tree.getRoot());

      setNodes(tree.values(tree.getRoot()));
      saveCurrentTree();
    }
  }

  const searchForNode = (value) => {
    if(value !== ""){
      tree.search(parseInt(value));
      searchAnimation([...tree.getAffectedNodes()], tree.foundNode, userContext.animationSpeed);
      getAndSetOperationMessages();
    }
  };

  async function deleteNode(node){

    let deletedParent = tree.delete(node);
    await deleteAnimation(tree.deletionAnimation.highlightNodes, tree.deletionAnimation.node, userContext.animationSpeed);

    // if avl tree - check for unbalanced nodes, animate this checking - balance the tree in memory
    if(type === "avl" || type === "rb"){

      if(type === "avl"){
        if(deletedParent) {
          tree.checkBalanceAfterOperation(deletedParent, false);
          await checkBalanceAnimation(tree.checkBalanceAnimation.checkingNodes, tree.checkBalanceAnimation.foundNode, userContext.animationSpeed); 
        } else {
          tree.checkBalanceAfterOperation(tree.getRoot(), false);
          await checkBalanceAnimation(tree.checkBalanceAnimation.checkingNodes, tree.checkBalanceAnimation.foundNode, userContext.animationSpeed); 
        }

      } else if(type === "rb"){
        if(tree.deleteFixNode){
          tree.fixOnDelete(tree.deleteFixNode);
        }
      }
      
    }
    // add a new operationMessage to display to user - useEffect will also trigger saving tree to context on state change
    getAndSetOperationMessages();

    tree.resetLayout(tree.getRoot());
    tree.checkLayout(tree.getRoot());
    tree.findAlteredNodes(tree.getRoot());
    await moveNodes(tree.shiftNodesAnimation, userContext.animationSpeed);

    
    setNodes(tree.values(tree.getRoot()));
    tree.resolveCoords(tree.getRoot());

    
    saveCurrentTree();

  };

  const traverseTree = (order) => {
    tree.traversal(order);
    traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    getAndSetOperationMessages();

  };

  const saveTree = (name) => {
    console.log("saving...");
    let savingTree = {};
    savingTree.root = tree.root;
    savingTree.type = type;
    savingTree.name = name;
    let treeJSON = stringify(savingTree);
    treeJSON = toJSON(treeJSON);
    
    fetch("http://localhost:4000/saveTree", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userContext.token}`,
                },
                body: treeJSON,
            })
            .then(async response => {
              if(response.ok){
                console.log(response);
              } else {
                console.log(response);
              }
              
            });
  };

  const treeFromCSV = file => {
    let reader = new FileReader();

    reader.onload = e => {
      const text = e.target.result;
      const data = text.split(",");

      data.forEach((number, index) => {
        data[index] = parseInt(number);
      });

      tree.treeFromNodes(data);
    };

    reader.readAsText(file);

  };


    return (
      <>
      {/* {alert ? <Alert severity={alert.severity}>{alert.text}</Alert>: null} */}
    <div className="Tree flex">
      <Controls addNode={addNode} searchForNode={searchForNode} traverseTree={traverseTree} saveTree={saveTree} treeFromCSV={treeFromCSV}/>
      <main>

      <div  >
      <Paper>
        <div className="info-panel flex">
          <Typography color="white">{type.toUpperCase()} Tree</Typography>
          <Typography color="white">Number of Nodes: {tree && tree.numNodes}</Typography>
          <Typography color="white">Tree Depth: {tree && tree.getDepth(tree.getRoot())}</Typography>
          <Typography color="white">Min Node: {tree && tree.getMinNode()}</Typography>
          <Typography color="white">Max Node: {tree && tree.getMaxNode()}</Typography>
        </div>
        </Paper>
        <div className="flex">
        <div id="svgContainer" ref={svgContainerEl}>
        <svg id="canvas" width={window.innerWidth - 600} height={window.innerHeight-210} ref={svgEl}>
              {nodes.map(node => {
                  return <Node key={node.id} node={node} deleteNode={deleteNode} />
              })}
        </svg>
        </div>
        <MessageBar messages={operationMessages}/>
        </div>
      </div>
      
      </main>
      
    </div>
    
    </>
    )
}