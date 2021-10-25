import {useEffect, useRef, useState, useContext } from "react";
import Controls from "../../components/Controls/Controls";
import Node from "../../components/Node/Node";
import BST from "../../classes/BST";
import "./Tree.css";
import {stringify, parse, toJSON, fromJSON} from "flatted";
import { UserContext } from "../../context/UserContext";
import {Alert} from "@mui/material";


export default function Tree(){

  const [userContext, setUserContext] = useContext(UserContext);
  const [alert, setAlert] = useState({});
  const [tree, setTree] = useState(new BST());
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    if(userContext.currentTree){

      console.log(fromJSON(userContext.currentTree.tree));

      let insertingNodes = tree.getTreeFromJSON(fromJSON(userContext.currentTree.tree));
      const timer = ms => new Promise(res => setTimeout(res, ms));

      async function insertAll(){

        for(let i = 0; i < insertingNodes.length; i++){
          addNode(insertingNodes[i].value);
          await timer(1000);
        }
      }

      insertAll();

    }
  },[]);

  const addNode = (value) => {
    if(value !== ""){
      tree.insert(parseInt(value));
      setNodes(tree.values(tree.getRoot()));
      console.log(nodes);
    }
    return;
  };

  const searchForNode = (value) => {
    if(value !== ""){
      tree.search(parseInt(value));
    }
  };

  const deleteNode = (node) => {
    tree.delete(node);
    setNodes(tree.values(tree.getRoot()));
  };

  const traverseTree = (order) => {
    tree.traversal(order);
  };

  const saveTree = () => {
    let treeJSON = stringify(tree);
    treeJSON = toJSON(treeJSON);
    console.log(treeJSON);
    
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
  }
;
    return (
      <>
      {alert ? <Alert severity={alert.severity}>{alert.text}</Alert>: null}
    <div className="Tree flex">
    <Controls addNode={addNode} searchForNode={searchForNode} traverseTree={traverseTree} saveTree={saveTree} />
        <svg width={window.innerWidth - 200} height={window.innerHeight - 300} viewBox={`0 0 ${window.innerWidth-200} ${window.innerHeight-300}`} name="viewBox">
              {nodes.map(node => {
                  return <Node key={node.id} node={node} deleteNode={deleteNode} />
              })}
        </svg>
    </div>
    
    </>
    )
}