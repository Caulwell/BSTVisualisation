import {useEffect, useRef, useState, useContext } from "react";
import Controls from "../../components/Controls/Controls";
import Node from "../../components/Node/Node";
import BST from "../../classes/BST";
import "./Tree.css";
import {stringify, parse, toJSON, fromJSON} from "flatted";
import { UserContext } from "../../context/UserContext";


export default function Tree(){

  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(new BST());
  const [userContext, setUserContext] = useContext(UserContext);

  const addNode = (value) => {
    if(value !== ""){
      tree.insert(parseInt(value));
      setNodes(tree.values(tree.getRoot()));
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
    let treeJSON = stringify(nodes);
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
                let data = await response.json();
                let tree = fromJSON(data.tree);

              } else {
                console.log(response);
              }
              
            });
  }
;
    return (
      <>
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