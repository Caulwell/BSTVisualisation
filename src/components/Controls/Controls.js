import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button} from "react-bootstrap";


export default function Controls({addNode}){

    const [addInput, setAddInput] = useState("");

    const handleKeypress = e => {
        if(e.key === "Enter"){
          if(addInput != ""){
            addNode(addInput);
            setAddInput("");
          } 
        }
      }

      const handleButtonPress = (e) => {
        addNode(addInput);
        setAddInput("");
      }

    return (
        <Form.Group className="d-flex">

        <Form.Control
          type="input"
          placeholder="New node"
          value={addInput}
          onChange={e => setAddInput(e.target.value)}
          style={{width: "100px", marginRight: "10px"}}
          maxLength={4}
          autoFocus={true}
          onKeyPress={handleKeypress}
        />

        <Button
          variant="primary"
          onClick={handleButtonPress}
        >
          Add
        </Button>

      </Form.Group>
    )
}