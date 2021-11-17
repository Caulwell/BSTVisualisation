import {useState, useRef, useContext, useEffect} from "react";
import "./TreeOperationsPanel.css";
import { UserContext } from "../../context/UserContext";


export default function TreeOperationsPanel({addNode, searchForNode, traverseTree, saveTree}){

    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [deleteInput, setDeleteInput] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const [saveInput, setSaveInput] = useState("");

    const [open, setOpen] = useState(false);

    const controls = ["Tree Type", "New Node", "Search", "In Order", "Pre Order", "Post Order", "Upload CSV", "Animation Speed", "Save Tree"];

    const drawerWidth = 240;

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
      };

      const handleButtonPress = e => {
          switch(e.currentTarget.getAttribute("name")){
            case "addButton":
                addNode(addInput);
                setAddInput("");
                break;
            case "searchButton":
                searchForNode(searchInput);
                setSearchInput("");
                break;
            case "inOrder":
                traverseTree("in");
                break;
            case "preOrder":
                traverseTree("pre");
                break;
            case "postOrder":
                traverseTree("post");
                break;
            case "saveButton":
                saveTree(saveInput);
                break;
            default:
                break;

          }
        
      };

      const handleDropDownClick = () => {
            setOpen( open => !open);
      };

    return (
        <div className="operations-drop-down">
            <div className="dropdown-control" onClick={handleDropDownClick}>
                Operations
            </div>
            {open && 
                <div className="dropdown-content">

                    {/* add node */}
                    <div className="dropdown-menu-item insert-node-menu">
                        Insert
                        <input
                            type="number" 
                            autoComplete="off" 
                            value={addInput}  
                            name="addInput" 
                            onChange={e => setAddInput(e.target.value)} 
                            onKeyPress={handleKeypress}
                        />
                        <button  
                            name="addButton" 
                            onClick={handleButtonPress}>
                        Add
                        </button>
                    </div>

                    {/* search for node */}
                    <div className="dropdown-menu-item search-node-menu">
                        Search
                        <input
                            type="number" 
                            autoComplete="off" 
                            value={searchInput}  
                            name="searchInput" 
                            onChange={e => setSearchInput(e.target.value)} 
                            onKeyPress={handleKeypress}
                        />
                        <button  
                            name="searchButton" 
                            onClick={handleButtonPress}>
                        Search
                        </button>
                    </div>

                    {/* delete node */}
                    <div className="dropdown-menu-item delete-node-menu">
                        Delete
                        <input
                            type="number" 
                            autoComplete="off" 
                            value={deleteInput}  
                            name="deleteInput" 
                            onChange={e => setDeleteInput(e.target.value)} 
                            onKeyPress={handleKeypress}
                        />
                        <button  
                            name="deleteButton" 
                            onClick={handleButtonPress}>
                        Delete
                        </button>
                    </div>

                    {/* traverse tree */}
                    <div className="dropdown-menu-item traverse-tree-menu">
                        Traverse
                        <div className="btn-group">
                        <button  
                            name="inOrder" 
                            className="first-child"
                            onClick={handleButtonPress}>
                        In-Order
                        </button>
                        <button  
                            name="preOrder" 
                            className="middle-child"
                            onClick={handleButtonPress}>
                        Pre-Order
                        </button>
                        <button  
                            name="postOrder" 
                            className="last-child"
                            onClick={handleButtonPress}>
                        Post-Order
                        </button>
                        </div>
                        
                    </div>

                    {/* get min */}
                    <div className="dropdown-menu-item traverse-tree-menu">
                        Get Min
                        <button  
                            name="getMinButton" 
                            onClick={handleButtonPress}>
                        Find
                        </button>
                    </div>

                    {/* get max */}
                    <div className="dropdown-menu-item traverse-tree-menu">
                        Get Max
                        <button  
                            name="getMaxButton" 
                            onClick={handleButtonPress}>
                        Find
                        </button>
                    </div>
            </div>
            }
            
             

        </div>
           
           
    )
}