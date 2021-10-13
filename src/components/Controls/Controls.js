import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button} from "react-bootstrap";


export default function Controls({addNode, searchForNode, traverseTree}){

    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handleKeypress = e => {
        if(e.key === "Enter"){
            if(e.target.name === "addInput"){
                if(addInput !== ""){
                    addNode(addInput);
                    setAddInput("");
                  } 
            } else if(e.target.name === "searchInput"){
                if(searchInput !== ""){
                    searchForNode(searchInput);
                    setSearchInput("");
                }
            }
          
        }
      }

      const handleButtonPress = e => {
          if(e.target.name === "addButton"){
            addNode(addInput);
            setAddInput("");
          } else if(e.target.name === "searchButton"){
            searchForNode(searchInput);
            setSearchInput("");
          } else if(e.target.name === "inOrderButton"){
            traverseTree("in");
          } else if(e.target.name === "preOrderButton"){
            traverseTree("pre");
          } else if(e.target.name === "postOrderButton"){
            traverseTree("post");
          }
        
      }

    return (
        <div className = "d-flex justify-content-between">
            <Form.Group className="d-flex">
                <Form.Control
                    type="input"
                    placeholder="New node"
                    name="addInput"
                    value={addInput}
                    onChange={e => setAddInput(e.target.value)}
                    style={{width: "100px", marginRight: "10px"}}
                    maxLength={4}
                    autoFocus={true}
                    onKeyPress={handleKeypress}
                />
                <Button
                    variant="primary"
                    name="addButton"
                    onClick={handleButtonPress}
                    >
                    Add
                </Button>
            </Form.Group>

            <Form.Group className="d-flex">
                <Form.Control
                    type="input"
                    placeholder="Search"
                    name="searchInput"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    style={{width: "100px", marginRight: "10px"}}
                    maxLength={4}
                    autoFocus={false}
                    onKeyPress={handleKeypress}
                />
                <Button
                    variant="primary"
                    name="searchButton"
                    onClick={handleButtonPress}
                >
                Search
                </Button>

            </Form.Group>

            <Form.Group className="d-flex">
                <Button
                    variant="primary"
                    name="inOrderButton"
                    onClick={handleButtonPress}
                    style={{marginRight: "10px"}}
                >
                In-order
                </Button>
                <Button
                    variant="primary"
                    name="preOrderButton"
                    onClick={handleButtonPress}
                    style={{marginRight: "10px"}}
                >
                Pre-order
                </Button>
                <Button
                    variant="primary"
                    name="postOrderButton"
                    onClick={handleButtonPress}
                    style={{marginRight: "10px"}}
                >
                Post-order
                </Button>
            </Form.Group>
        </div>
        
    )
}