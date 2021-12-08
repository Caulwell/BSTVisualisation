import {useEffect, useState, useContext, useRef } from "react";
import TreeOperationsPanel from "../../components/TreeOperationsPanel/TreeOperationsPanel";
import Node from "../../components/Node/Node";
import BST from "../../classes/BST";
import "./Tree.css";
import {parse, stringify, toJSON} from "flatted";
import { UserContext } from "../../context/UserContext";
import AVL from "../../classes/AVL";
import RB from "../../classes/RB";
import { insertAnimation, deleteAnimation, moveNodes, searchAnimation, traversalAnimation, checkBalanceAnimation, quickInsert } from "../../util/animations";
import configureZoom from "../../util/zoomPan";
import MessageBar from "../../components/MessageBar/MessageBar";
import TreeMetaPanel from "../../components/TreeMetaPanel/TreeMetaPanel";
import Modal from "../../components/Modal/Modal";
import Alert from "../../components/Alert/Alert";
import OperationInfoPanel from "../../components/OperationInfoPanel/OperationInfoPanel";
import Converter from "../../components/Converter/Converter";
import { useHistory } from "react-router";


export default function Tree({type}){

  const [userContext, setUserContext] = useContext(UserContext);
  const [tree, setTree] = useState();
  const [nodes, setNodes] = useState([]);
  const [operationMessages, setOperationMessages] = useState([]);
  const [loadingTree, setLoadingTree] = useState(true);
  const [addingMessage, setAddingMessage] = useState(false);
  const [generatingTree, setGeneratingTree] = useState(false);
  const svgEl = useRef(null);
  const svgContainerEl = useRef(null);

  const [selectedOperation, setSelectedOperation] = useState(null);
  const [operationInfoPanelOpen, setOperationInfoPanelOpen] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const [alert, setAlert] = useState({type: "", content: ""});
  const [showAlert, setShowAlert] = useState(false);

  const [inputsDisabled, setInputsDisabled] = useState(false);

  const history = useHistory();

  const timer = ms => new Promise(res => setTimeout(res, ms));


  const closeModal = () => {
    setShowModal(false);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };
  
  /// USE EFFECTS //////

  // On first render - configure zoom and panning on svg element - and if coming from random tree button, render random tree
  useEffect(() => {
    configureZoom(svgEl, svgContainerEl);

  },[]);


  // when showAlert is set to true, set it to false after 5 seconds
  useEffect(() => {
    if(showAlert){
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  },[showAlert]);

  // On changing type of tree - reset state and if a tree already in memory, load it
  useEffect(() => {
    setNodes([]);
    setOperationMessages([]);
    setSelectedOperation(null);
    if(type === "bst"){
      setTree(new BST());
      if(userContext.currentBST) renderCurrentTree(userContext.currentBST, userContext.currentBSTMessages || [], userContext.selectedBSTOperation);
    } else if(type === "avl"){
      setTree(new AVL());
      if(userContext.currentAVL) renderCurrentTree(userContext.currentAVL, userContext.currentAVLMessages || [], userContext.selectedAVLOperation);
    } else {
      setTree(new RB());
      if(userContext.currentRB) renderCurrentTree(userContext.currentRB, userContext.currentRBMessages || [], userContext.selectedRBOperation);  
    }


    if(userContext.randomTree){
      randomTree();
    }

    setUserContext(oldValues => {
      return {...oldValues, randomTree: false};
    });

    
    
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

  useEffect(() => {

    if(type === "bst"){
      setUserContext(oldValues => {
        return {...oldValues,selectedBSTOperation: selectedOperation};
      });
    } else if(type === "avl"){
      setUserContext(oldValues => {
        return {...oldValues, selectedAVLOperation: selectedOperation};
      });
    } else {
      setUserContext(oldValues => {
        return {...oldValues,selectedRBOperation: selectedOperation};
      });
    }

  },[selectedOperation])

  // only when tree state changes on uploading csv - save generated tree to memory
  useEffect(() => {
    if(generatingTree){
      saveCurrentTree();
      setGeneratingTree(false);
    }
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
        return {...oldValues, currentBSTMessages: operationMessages, selectedBSTOperation: selectedOperation};
      });
    } else if(type === "avl"){
      setUserContext(oldValues => {
        return {...oldValues, currentAVLMessages: operationMessages, selectedAVLOperation: selectedOperation};
      });
    } else {
      setUserContext(oldValues => {
        return {...oldValues, currentRBMessages: operationMessages, selectedRBOperation: selectedOperation};
      });
    }

  };

  // method to set operation messages state, to initiate use effect only when new ones added, not when resetting to empty array
  const getAndSetOperationMessages = () => {  
    let operationMessage = {...tree.operationMessage};
    setAddingMessage(true);
    setOperationMessages([operationMessage, ...operationMessages]);
    setAddingMessage(false);

    setSelectedOperation(operationMessage);
   
  };

  // method to render the tree saved in memory, based on type of tree currently selected
  const renderCurrentTree = (tree, messages, operation) => {

    setLoadingTree(true);

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    let newRoot = renderTree.getTreeFromJSON(tree)[0];
    renderTree.setRoot(newRoot);

    let nodesToRender = renderTree.values(renderTree.getRoot());
    setOperationMessages(messages);
    setSelectedOperation(operation);
    setNodes(nodesToRender);

    renderTree.numNodes = nodesToRender.length;
    renderTree.numInsertedTotal = nodesToRender.length;

    setTree(renderTree);
    
  };

  /////// OPERATIONS /////

  // insertion method
  async function addNode(value){

    if(value !== ""){

      setInputsDisabled(true);

      // set internal data structure
      let insertedNode = tree.insert(parseInt(value));
      // render node in intitial position
      setNodes(tree.values(tree.getRoot()));

      await timer(100);
      // play insertion animation
      await insertAnimation(tree.operationAnimation.highlightNodes, tree.operationAnimation.node, userContext.animationSpeed);


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
      setInputsDisabled(false);
    }
  }

  // search for node method
  async function searchForNode(value){
    if(value !== ""){
      setInputsDisabled(true);
      tree.search(parseInt(value));
      await searchAnimation([...tree.getAffectedNodes()], tree.foundNode, userContext.animationSpeed);
      getAndSetOperationMessages();
      setInputsDisabled(false);
    }
  };

  // deletion method
  async function deleteNode(node){

    if(!nodes.length){
      setAlert({type: "failure", content: "The Tree is Empty!"});
      setShowAlert(true);
      return;
    }
    
    setInputsDisabled(true);

    let deletedParent = null;

    // deletion by typing value in or by clicking node
    if(typeof node === "string"){
      deletedParent = tree.deleteByValue(parseInt(node));
    } else {
      deletedParent = tree.deleteNode(node);
    }

    const animationDone = await deleteAnimation(tree.operationAnimation.highlightNodes, tree.operationAnimation.node, userContext.animationSpeed);

    if(!deletedParent){
      console.log("no deleted parent");
      getAndSetOperationMessages();
      setInputsDisabled(false);
      return;
    }

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
        console.log("type is rb");
        console.log(tree.deleteFixNode);
        if(tree.deleteFixNode){
          console.log("calling fixOnDelete");
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
    setInputsDisabled(false);

  };

  // traversal method
  async function traverseTree(order){
    if(!nodes.length){
      setAlert({type: "failure", content: "The Tree is Empty!"});
      setShowAlert(true);
      return;
    }
    tree.traversal(order);
    setInputsDisabled(true);
    await traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    setInputsDisabled(false);
    getAndSetOperationMessages();

  };

  // max node
  async function maxNode (){
    if(!nodes.length){
      setAlert({type: "failure", content: "The Tree is Empty!"});
      setShowAlert(true);
      return;
    }
    setInputsDisabled(true);
    tree.getMaxNode();
    await traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    setInputsDisabled(false);
    getAndSetOperationMessages();
  };

  // min node
  async function minNode (){
    if(!nodes.length){
      setAlert({type: "failure", content: "The Tree is Empty!"});
      setShowAlert(true);
      return;
    }
    setInputsDisabled(true);
    tree.getMinNode();
    await traversalAnimation([...tree.getAffectedNodes()], userContext.animationSpeed);
    setInputsDisabled(false);
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
  const saveTree = () => {

    // create a new object, removing uncessessary attributes
    let savingTree = {};
    savingTree.root = tree.root;
    savingTree.type = type;

    // stringify circular structure - third party library allows this
    let treeJSON = stringify(savingTree);
    treeJSON = toJSON(treeJSON);
    
    // save as text file
    var a = document.createElement("a");
    var file = new Blob([treeJSON], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = `${type}.txt`;
    a.click();
  };

  // method to generate tree from CSV input
  const treeFromCSV = file => {

    // display error alert if no file specified
    if(!file){
      setAlert({type: "failure", content: "No file was specified. Please upload a file and then click generate"});
      setShowAlert(true);
      return;
    }

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    setNodes([]);
    setAddingMessage(true);
    setOperationMessages([]);
    setSelectedOperation(null);
    
    let reader = new FileReader();

    reader.onload = e => {
      const text = e.target.result;
      const data = text.split(",");

      let error = false;

      data.forEach((number, index) => {
        if(isNaN(parseInt(number))) error = true;
        data[index] = parseInt(number);
      });

      // if CSV not just numbers and commas, will present error - show alert if error encountered
      if(error){
        setAlert({type: "failure", content: "There was a problem with your file - please make sure it is made of comma seperated numbers"});
        setShowAlert(true);
        return;
      }

      createTreeFromArray(renderTree, data);
    };

    reader.readAsText(file);

  };

  const treeFromFile = file => {

    if(!file || file.type !== "text/plain"){
      setAlert({type: "failure", content: "The file type must be .txt for this function to work"});
      setShowAlert(true);
      return; // set alert that file type is wrong
    }

    setGeneratingTree(true);
    setNodes([]);
    setAddingMessage(true);
    setOperationMessages([]);
    setSelectedOperation(null);

    let tree = "";

    file.text()
      .then(result => {
        tree = result;
        let treeObject = parse(tree);
        if(treeObject.type !== type){
          setAlert({type: "failure", content: "The loaded tree is a " + treeObject.type + " - please load this tree on the " + treeObject.type + " page"});
          setShowAlert(true);
          return; // set alert that it is the wrong type - provide what type the file is
        }
        renderCurrentTree(treeObject, []);
      })
      .catch(err => {
        setAlert({type: "failure", content: "Something went wrong, please try another file"});
        setShowAlert(true);
      });

      
  };

  const randomTree = () => {

    const renderTree = type === "bst" ? new BST() : type === "avl" ? new AVL() : new RB();
    setAddingMessage(true);
    setOperationMessages([]);
    setSelectedOperation(null);

   

    let data = [];

    let numNodes = Math.floor(Math.random() * (20 - 3) + 3);

    for(let i = 0; i < numNodes; i++){
      data.push(Math.floor(Math.random() * 1000));
    }

    createTreeFromArray(renderTree, data);
    
  };

  const convertTree = (treeTo) =>{

    const currentTreeAsArray = nodes
      .sort((a,b) => a.id - b.id)
      .map(node => node.value);

    const renderTree = treeTo === "bst" ? new BST() : treeTo === "avl" ? new AVL() : new RB();

    renderTree.getTreeFromValues(currentTreeAsArray);
    renderTree.resetLayout(renderTree.getRoot());
    renderTree.checkLayout(renderTree.getRoot());
    renderTree.resolveCoords(renderTree.getRoot());

    if(treeTo === "bst"){
      setUserContext(oldValues => {
        return {...oldValues, currentBST: renderTree};
      });
      history.push("/bst");
    } else if (treeTo === "avl"){
      setUserContext(oldValues => {
        return {...oldValues, currentAVL: renderTree};
      });
      history.push("/avl");
    } else {
      setUserContext(oldValues => {
        return {...oldValues, currentRB: renderTree};
      });
      history.push("/red-black");
    }

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
    <Alert type={alert.type} content={alert.content} show={showAlert} handleClose={closeAlert}></Alert>
      <TreeOperationsPanel 
        inputsDisabled={inputsDisabled}
        addNode={addNode} 
        searchForNode={searchForNode} 
        deleteNode={deleteNode}
        traverseTree={traverseTree} 
        saveTree={saveTree} 
        treeFromCSV={treeFromCSV} 
        treeFromFile={treeFromFile}
        clearTree={clearTree} 
        randomTree={randomTree} 
        minNode={minNode} 
        maxNode={maxNode} 
        setShowModal={setShowModal} 
        setModalContent={setModalContent}

      />
      <MessageBar 
        messages={operationMessages} 
        selectedOperation={selectedOperation} 
        setSelectedOperation={setSelectedOperation} 
        operationInfoPanelOpen={operationInfoPanelOpen}
        setOperationInfoPanelOpen={setOperationInfoPanelOpen}

      />
      <TreeMetaPanel type={type}/>
      <Converter type={type} convertTree={convertTree}/>
      

        <div id="svgContainer" ref={svgContainerEl}>
        <svg id="canvas" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight * 0.83}`}  ref={svgEl}>
              {nodes.map(node => {
                  return <Node key={node.id} node={node} deleteNode={deleteNode} />
              })}
        </svg>
      </div>
      <OperationInfoPanel operation={selectedOperation} open={operationInfoPanelOpen} setOpen={setOperationInfoPanelOpen}/>
      
    </div>
    )
}