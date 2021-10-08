import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import {Form, Button} from "react-bootstrap";
import Node from "./components/Node";
import BST from "./classes/BST";


export default function App() {

  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(new BST());
   
  const addNode = () => {
    tree.insert(parseInt(input));
    setNodes(tree.values());
    setInput("");
  }

  const handleKeypress = e => {
    if(e.key === "Enter"){
      if(input != "") addNode();
    }
  }

  return (
    <div className="App">
      <Form.Group className="d-flex">

        <Form.Control
          type="input"
          placeholder="New node"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{width: "100px", marginRight: "10px"}}
          maxLength={4}
          autoFocus={true}
          onKeyPress={handleKeypress}
        />

        <Button
          variant="primary"
          onClick={addNode}
        >
          Add
        </Button>

      </Form.Group>
      {/* <Canvas nodes={nodes}/> */}

      <svg width={window.innerWidth - 40} height="500">
            {nodes.map(node => {
            return <Node key={node.id} node={node} />
            })}
      </svg>

    </div>
  );
}
