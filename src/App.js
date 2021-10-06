import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import {Form, Button} from "react-bootstrap";
import Canvas from "./components/Canvas";
import BST from "./classes/BST";


export default function App() {

  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [tree, setTree] = useState(new BST());
   
  const addNode = () => {
    tree.insert(parseInt(input));
    setNodes(tree.values());
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
        />

        <Button
          variant="primary"
          onClick={addNode}
        >
          Add
        </Button>

      </Form.Group>
      <Canvas nodes={nodes}/>
    </div>
  );
}
