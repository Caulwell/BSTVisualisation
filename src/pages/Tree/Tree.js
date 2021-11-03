import {useEffect, useState, useContext } from "react";
import Controls from "../../components/Controls/Controls";
import Node from "../../components/Node/Node";
import BST from "../../classes/BST";
import "./Tree.css";
import {stringify, toJSON} from "flatted";
import { UserContext } from "../../context/UserContext";
import {Alert} from "@mui/material";
import AVL from "../../classes/AVL";
import RB from "../../classes/RB";
import { insertAnimation, moveNodes, searchAnimation, traversalAnimation, checkBalanceAnimation } from "../../util/animations";


export default function Tree({type}){

  const [userContext, setUserContext] = useContext(UserContext);
  const [alert, setAlert] = useState({});
  const [tree, setTree] = useState();
  const [nodes, setNodes] = useState([]);

  useEffect(() => {

    console.log("re render");
  
    if(userContext.currentTree){
      
      let insertingNodes = tree.getTreeFromJSON(userContext.currentTree);

      insertingNodes.forEach((node, index) => {
        insertingNodes[index] = node.value;
      });

      insertAll(insertingNodes);

    }
  },[]);

  useEffect(() => {
    console.log("type change");
    if(type === "bst"){
      setTree(new BST());
      setNodes([]);
    } else if(type === "avl"){
      setTree(new AVL());
      setNodes([]);
    } else {
      setTree(new RB());
      setNodes([]);
    }
  }, [type]);

  const timer = ms => new Promise(res => setTimeout(res, ms));

  async function insertAll(insertingNodes){

    for(let i = 0; i < insertingNodes.length; i++){
      addNode(insertingNodes[i]);
      await timer(500);
    }

  }

  async function addNode(value){

    if(value !== ""){

      // set internal data structure
      let insertedNode = tree.insert(parseInt(value));
      // render node in intitial position
      setNodes(tree.values(tree.getRoot()));
      // wait for node to render
      await timer(100);
      // play insertion animation
      const insertDone = await insertAnimation(tree.insertionAnimation.highlightNodes, tree.insertionAnimation.node, userContext.animationSpeed);

      console.log("insert animation: " + insertDone);

      // if avl tree - check for unbalanced nodes, animate this checking - balance the tree in memory
      if(type === "avl"){
        if(insertedNode.parent) {
          tree.checkBalanceAfterOperation(insertedNode.parent, false);
          const checkBalanceDone = await checkBalanceAnimation(tree.checkBalanceAnimation.checkingNodes, tree.checkBalanceAnimation.foundNode, userContext.animationSpeed);
          console.log("check balance animation " + checkBalanceDone);
        }
      }
      
      // if rb tree - restore rb tree properties
      if(type === "rb"){
        console.log("got here")
        if(insertedNode.parent){
          console.log("hello");
          tree.fixOnInsertion(insertedNode);
          
        }
      }

      // reset x and ys to original values - new attribute moveTo
      tree.resetLayout(tree.getRoot());

      // check for overlaps - change moveTo again
      tree.checkLayout(tree.getRoot());

      // animate only the nodes for which moveTo is different to current x and y
      tree.findAlteredNodes(tree.getRoot());

      await timer(500);
      moveNodes(tree.shiftNodesAnimation, userContext.animationSpeed);

      // reset x and ys to moveTo
      tree.resolveCoords(tree.getRoot());
      
      // set current tree for later retrieval
      setUserContext(oldValues => {
        return {...oldValues, currentTree: tree};
      });
    }
    return;
  };

  const searchForNode = (value) => {
    if(value !== ""){
      tree.search(parseInt(value));
      searchAnimation([...tree.getAffectedNodes()], tree.foundNode, userContext.animationSpeed);
    }
  };

  const deleteNode = (node) => {
    tree.delete(node);

    tree.checkLayout();

    setNodes(tree.values(tree.getRoot()));

    moveNodes([...tree.getAffectedNodes()], userContext.animationSpeed);

    setUserContext(oldValues => {
      return {...oldValues, currentTree: tree};
    });
  };

  const traverseTree = (order) => {
    tree.traversal(order);
    traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
  };

  const saveTree = () => {
    let treeJSON = stringify(tree);
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
                setAlert({text: "Tree saved successfully", severity: "success"});
              } else {
                setAlert({text: "Something went wrong - could not save tree", severity: "error"});
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

      insertAll(data);
    };

    reader.readAsText(file);

  };


    return (
      <>
      {alert ? <Alert severity={alert.severity}>{alert.text}</Alert>: null}
    <div className="Tree flex">
    <Controls addNode={addNode} searchForNode={searchForNode} traverseTree={traverseTree} saveTree={saveTree} treeFromCSV={treeFromCSV}/>
        <svg width={window.innerWidth - 200} height={window.innerHeight - 300} viewBox={`0 0 ${window.innerWidth-200} ${window.innerHeight-300}`} name="viewBox">
              {nodes.map(node => {
                  return <Node key={node.id} node={node} deleteNode={deleteNode} />
              })}
        </svg>
    </div>
    
    </>
    )
}