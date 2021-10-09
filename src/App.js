import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import Node from "./components/Node/Node";
import BST from "./classes/BST";
import Controls from "./components/Controls/Controls";


export default function App() {

  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(new BST());
   
  const addNode = (value) => {
    if(value != ""){
      tree.insert(parseInt(value));
      setNodes(tree.values());
    }
    return;
  }

  const searchForNode = (value) => {
    if(value != ""){
      tree.search(parseInt(value));
    }
  }

  return (
    <div className="App">

    <Controls addNode={addNode} searchForNode={searchForNode} />
      {/* <Canvas nodes={nodes}/> */}


      <svg width={window.innerWidth - 40} height="500">
            {nodes.map(node => {
            return <Node key={node.id} node={node} />
            })}
      </svg>

    </div>
  );
}
