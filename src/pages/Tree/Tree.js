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
import { insertAnimation, deleteAnimation, moveNodes, searchAnimation, traversalAnimation, checkBalanceAnimation } from "../../util/animations";
import MessageBar from "../../components/MessageBar/MessageBar";


export default function Tree({type}){

  const [userContext, setUserContext] = useContext(UserContext);
  const [alert, setAlert] = useState({});
  const [tree, setTree] = useState();
  const [nodes, setNodes] = useState([]);
  const [operationMessages, setOperationMessages] = useState([]);
  const svgEl = useRef(null);
  const svgContainerEl = useRef(null);

  const getAndSetOperationMessages = () => {
    setOperationMessages([tree.operationMessage, ...operationMessages]);
  };

  const configureZoom = () =>{
    let svg = svgEl.current;
    let svgContainer = svgContainerEl.current;


    let viewBox = {x:0, y:0, w:svg.clientWidth, h: svg.clientHeight};
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    const svgSize = {w:svg.clientWidth,h:svg.clientHeight};
    let isPanning = false;
    let startPoint = {x:0,y:0};
    let endPoint = {x:0,y:0};
    let scale = 1;

    svgContainer.onmousewheel = function(e) {
      e.preventDefault();
      
      
      var w = viewBox.w;
      var h = viewBox.h;
      var mx = e.offsetX;//mouse x  
      var my = e.offsetY;    
      var dw = w*Math.sign(e.deltaY)*0.05;
      var dh = h*Math.sign(e.deltaY)*0.05;
      var dx = dw*mx/svgSize.w;
      var dy = dh*my/svgSize.h;
      if(svgSize.w/(viewBox.w-dw) > 1.3 || svgSize.w/(viewBox.w-dw) < 0.5 )  return;
      viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
      
      scale = svgSize.w/viewBox.w; 
      svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
   };

   svgContainer.onmousedown = function(e){
    isPanning = true;
    startPoint = {x:e.x,y:e.y};   
 };
 
 svgContainer.onmousemove = function(e){
    if (isPanning){
   endPoint = {x:e.x,y:e.y};
   var dx = (startPoint.x - endPoint.x)/scale;
   var dy = (startPoint.y - endPoint.y)/scale;
   var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
   svg.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    }
 };
 
 svgContainer.onmouseup = function(e){
    if (isPanning){ 
   endPoint = {x:e.x,y:e.y};
   var dx = (startPoint.x - endPoint.x)/scale;
   var dy = (startPoint.y - endPoint.y)/scale;
   viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
   svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
   isPanning = false;
    }
 };
 
 svgContainer.onmouseleave = function(e){
  isPanning = false;
 };
  
  };

  useEffect(() => {

    setNodes([]);
    configureZoom();

    


  
    // if(userContext.currentTree){
      
    //   let insertingNodes = tree.getTreeFromJSON(userContext.currentTree);

    //   insertingNodes.forEach((node, index) => {
    //     insertingNodes[index] = node.value;
    //   });

    //   insertAll(insertingNodes);

    // }
  },[]);

  useEffect(() => {
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
    setOperationMessages([]);
  }, [type]);

  const timer = ms => new Promise(res => setTimeout(res, ms));

  async function insertAll(insertingNodes){

    for(let i = 0; i < insertingNodes.length; i++){
      addNode(insertingNodes[i]);
    }

  }

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

      // add a new operationMessage to display to user
      getAndSetOperationMessages();
      
      // set current tree for later retrieval
      setUserContext(oldValues => {
        return {...oldValues, currentTree: tree};
      });
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

    tree.resetLayout(tree.getRoot());
    tree.checkLayout(tree.getRoot());
    tree.findAlteredNodes(tree.getRoot());
    await moveNodes(tree.shiftNodesAnimation, userContext.animationSpeed);

    
    setNodes(tree.values(tree.getRoot()));
    tree.resolveCoords(tree.getRoot());

    // add a new operationMessage to display to user
    getAndSetOperationMessages();

    setUserContext(oldValues => {
      return {...oldValues, currentTree: tree};
    });
  };

  const traverseTree = (order) => {
    tree.traversal(order);
    traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    getAndSetOperationMessages();

  };

  const saveTree = () => {
    console.log("saving...")
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
      {/* {alert ? <Alert severity={alert.severity}>{alert.text}</Alert>: null} */}
    <div className="Tree flex">
      <Controls addNode={addNode} searchForNode={searchForNode} traverseTree={traverseTree} saveTree={saveTree} treeFromCSV={treeFromCSV}/>
      <main>

      <div  >
      <Paper>
        <div className="info-panel flex">
          <Typography color="white">{type.toUpperCase()} Tree</Typography>
          <Typography color="white">Number of Nodes: {tree && tree.numNodes}</Typography>
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