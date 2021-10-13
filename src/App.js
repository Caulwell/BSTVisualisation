import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {useState } from "react";
import Node from "./components/Node/Node";
import BST from "./classes/BST";
import Controls from "./components/Controls/Controls";


export default function App() {

  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(new BST());
   
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

  return (
    <div className="App">

    <Controls addNode={addNode} searchForNode={searchForNode} traverseTree={traverseTree}/>
      {/* <Canvas nodes={nodes}/> */}


      <svg width={window.innerWidth - 40} height={window.innerHeight - 40}>
            {nodes.map(node => {
            return <Node key={node.id} node={node} deleteNode={deleteNode} />
            })}
      </svg>

    </div>
  );
}
