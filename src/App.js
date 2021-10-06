import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import {Form, Button} from "react-bootstrap";
import Node from "./components/Node";


export default function App() {

  console.log("h")

  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [numNodes, setNumNodes] = useState(0);
   
  const addNode = () => {
    setNodes([...nodes, {value: input}]);
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
    
      <svg width="500" height="1000">
        {nodes.map(node => {
          return <Node key={node.value} value={node.value}/>
        })}
      </svg>
    </div>
  );
}
