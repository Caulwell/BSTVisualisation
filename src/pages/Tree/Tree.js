import {useEffect, useState, useContext, useRef } from "react";
import TreeOperationsPanel from "../../components/TreeOperationsPanel/TreeOperationsPanel";
import Node from "../../components/Node/Node";
import BST from "../../classes/BST";
import "./Tree.css";
import {stringify, toJSON} from "flatted";
import { UserContext } from "../../context/UserContext";
import AVL from "../../classes/AVL";
import RB from "../../classes/RB";
import { insertAnimation, deleteAnimation, moveNodes, searchAnimation, traversalAnimation, checkBalanceAnimation, quickInsert } from "../../util/animations";
import configureZoom from "../../util/zoomPan";
import MessageBar from "../../components/MessageBar/MessageBar";
import TreeMetaPanel from "../../components/TreeMetaPanel/TreeMetaPanel";
import shortid from "shortid";
import Modal from "../../components/Modal/Modal";


export default function Tree({type, setAlert}){

  const [userContext, setUserContext] = useContext(UserContext);
  const [tree, setTree] = useState();
  const [nodes, setNodes] = useState([]);
  const [operationMessages, setOperationMessages] = useState([]);
  const [loadingTree, setLoadingTree] = useState(true);
  const [addingMessage, setAddingMessage] = useState(false);
  const [generatingTree, setGeneratingTree] = useState(false);
  const svgEl = useRef(null);
  const svgContainerEl = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const timer = ms => new Promise(res => setTimeout(res, ms));


  const closeModal = () => {
    setShowModal(false);
  }
  
  /// USE EFFECTS //////

  // On first render - configure zoom and panning on svg element
  useEffect(() => {
    configureZoom(svgEl, svgContainerEl);
  },[]);

  // On changing type of tree - reset state and if a tree already in memory, load it
  useEffect(() => {
    setNodes([]);
    setOperationMessages([]);
    if(type === "bst"){
      setTree(new BST());
      if(userContext.currentBST) renderCurrentTree(userContext.currentBST, userContext.currentBSTMessages || []);
    } else if(type === "avl"){
      setTree(new AVL());
      if(userContext.currentAVL) renderCurrentTree(userContext.currentAVL, userContext.currentAVLMessages || []);
    } else {
      setTree(new RB());
      if(userContext.currentRB) renderCurrentTree(userContext.currentRB, userContext.currentRBMessages || []);  
    }

    
    
  }, [type]);

  // when loading a whole tree from memory, on setting nodes, perform animations
  useEffect(() => {
    if(loadingTree && nodes.length){
      nodes.forEach(async node => {
        quickInsert(node);
      });
      setLoadingTree(false);
    }
  },[loadingTree,nodes]);

  // when operationMessages change, save them in memory to be loaded back when same tree rendered again
  useEffect(() => {
    addingMessage && saveMessages();
  },[operationMessages]);

  // only when tree state changes on uploading csv - save generated tree to memory
  useEffect(() => {
    generatingTree && saveCurrentTree();
    setGeneratingTree(false);
  },[tree]);


  /// HELPER METHODS ////

  // method to save tree in memory based on type of tree to facilitate more than 1 current tree
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

  // method to save operation messages in memory based on type of tree to facilitate more than 1 current tree
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

  // method to set operation messages state, to initiate use effect only when new ones added, not when resetting to empty array
  const getAndSetOperationMessages = () => {

    let operationMessage = tree.operationMessage;
    operationMessage.id = shortid.generate();
    setAddingMessage(true);
    setOperationMessages([operationMessage, ...operationMessages]);
    setAddingMessage(false);
  };

  // method to render the tree saved in memory, based on type of tree currently selected
  const renderCurrentTree = (tree, messages) => {

    setLoadingTree(true);

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    let newRoot = renderTree.getTreeFromJSON(tree)[0];
    renderTree.setRoot(newRoot);

    let nodesToRender = renderTree.values(renderTree.getRoot());
    setOperationMessages(messages);
    setNodes(nodesToRender);

    renderTree.numNodes = nodesToRender.length;
    renderTree.numInsertedTotal = nodesToRender.length;

    setTree(renderTree);
    
  };

  /////// OPERATIONS /////

  // insertion method
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

  // search for node method
  const searchForNode = (value) => {
    if(value !== ""){
      tree.search(parseInt(value));
      searchAnimation([...tree.getAffectedNodes()], tree.foundNode, userContext.animationSpeed);
      getAndSetOperationMessages();
    }
  };

  // deletion method
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

  // traversal method
  const traverseTree = (order) => {
    tree.traversal(order);
    traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    getAndSetOperationMessages();

  };

  // max node
  const maxNode = () => {
    tree.getMaxNode();
    traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    getAndSetOperationMessages();
  }

  // min node
  const minNode = () => {
    tree.getMinNode();
    traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    getAndSetOperationMessages();
  }

  const clearTree = () => {

    if(type === "bst"){
      setTree(new BST());
      setUserContext(oldValues => {
        return {...oldValues, currentBST: null, currentBSTMessages: []};
      });
    } else if(type === "avl"){
      setTree(new AVL());
      setUserContext(oldValues => {
        return {...oldValues, currentAVL: null, currentAVLMessages: []};
      });
    } else {
      setTree(new RB());
      setUserContext(oldValues => {
        return {...oldValues, currentRB: null, currentRBMessages: []};
      });
    }
    setNodes([]);
    setOperationMessages([]);
  };

  // method to save tree
  const saveTree = (name) => {

    // create a new object, removing uncessessary attributes
    let savingTree = {};
    savingTree.root = tree.root;
    savingTree.type = type;
    savingTree.name = name;

    // stringify circular structure - third party library allows this
    let treeJSON = stringify(savingTree);
    treeJSON = toJSON(treeJSON);
    
    // post to route - if good response, set positive alert, else, negative alert
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
                // setAlert - positive
                setAlert({severity: "success", text: "You have successfully saved this tree!"});
              } else {
                // setAlert - negative
                setAlert({severity: "error", text: "Something went wrong, we could not save this tree for you. Please try again"});
              }
              
            });
  };

  // method to generate tree from CSV input
  const treeFromCSV = file => {

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    setNodes([]);
    setOperationMessages([]);
    
    let reader = new FileReader();

    reader.onload = e => {
      const text = e.target.result;
      const data = text.split(",");

      let error = false;

      data.forEach((number, index) => {
        if(isNaN(parseInt(number))) error = true;
        data[index] = parseInt(number);
      });

      if(error){
        setAlert({severity: "error", text: "There was a problem with your file - please make sure it is made of comma seperated numbers"});
        return;
      }

      createTreeFromArray(renderTree, data);
    };

    reader.readAsText(file);

  };

  const randomTree = () => {

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    setNodes([]);
    setOperationMessages([]);

    let data = [];

    let numNodes = Math.floor(Math.random() * (20 - 3) + 3);

    for(let i = 0; i < numNodes; i++){
      data.push(Math.floor(Math.random() * 1000));
    }



    createTreeFromArray(renderTree, data);
    
  }

  const createTreeFromArray = (tree, data) => {

      setLoadingTree(true);
      setGeneratingTree(true);

      tree.getTreeFromValues(data);
      tree.resetLayout(tree.getRoot());
      tree.checkLayout(tree.getRoot());
      tree.resolveCoords(tree.getRoot());

      setNodes(tree.values(tree.getRoot()));

      setTree(tree);
  };


    return (
  
    <div className="tree-page">

    <Modal show={showModal} handleClose={closeModal} content={modalContent}/>
    
      <TreeOperationsPanel addNode={addNode} searchForNode={searchForNode} traverseTree={traverseTree} saveTree={saveTree} treeFromCSV={treeFromCSV} clearTree={clearTree} randomTree={randomTree} minNode={minNode} maxNode={maxNode} setShowModal={setShowModal} setModalContent={setModalContent}/>
      <MessageBar messages={operationMessages}/>
      <TreeMetaPanel treeFromCSV={treeFromCSV}/>

        <div id="svgContainer" ref={svgContainerEl}>
        <svg id="canvas" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight * 0.83}`}  ref={svgEl}>
              {nodes.map(node => {
                  return <Node key={node.id} node={node} deleteNode={deleteNode} />
              })}
        </svg>
      </div>
      
    </div>
    )
}