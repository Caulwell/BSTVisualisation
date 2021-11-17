import {useState, useRef, useContext, useEffect} from "react";
import "./TreeOperationsPanel.css";
import { UserContext } from "../../context/UserContext";


export default function TreeOperationsPanel({addNode, searchForNode, traverseTree, saveTree, treeFromCSV, clearTree}){

    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [deleteInput, setDeleteInput] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const [saveInput, setSaveInput] = useState("");
    const [speedInput, setSpeedInput] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

    const [open, setOpen] = useState(true);

    

    const handleFileInput = e => {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0]);
    };

   

    useEffect(() => {
        setUserContext(oldValues => {
            return {...oldValues, animationSpeed: 1 - (speedInput)};
        });
    }, []);


    const handleSpeedChange = e => {
        console.log(e.target.value);
        setSpeedInput(e.target.value);
    };

    const handleAnimationSpeed = () => {

        console.log(speedInput);

      let newSpeed = 1 - (speedInput);

          if(newSpeed !== userContext.animationSpeed){
              setUserContext(oldValues => {
                  return {...oldValues, animationSpeed: newSpeed};
              });
          }
    };

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
            case "generateButton":
                treeFromCSV(selectedFile);
                break;
            case "clearButton":
                clearTree();
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

                    <div className="dropdown-control" >
                        Tree
                    </div>

                    {/* generate random tree */}
                    <div className="dropdown-menu-item random-tree-menu">
                        Generate Random Tree
                        <button >
                            Generate
                        </button>
                    </div>

                    {/* csv tree generation */}
                    <div className="dropdown-menu-item csv-tree-menu">
                        Generate Using CSV
                        <input className="fileInput" id="fileInput" type="file" accept="*.csv" onChange={handleFileInput}/>
                        <label className="fileInputLabel" for="fileInput">{selectedFile ? selectedFile.name : "Upload"}</label>
                        <button  name="generateButton" onClick={handleButtonPress}>
                            Generate
                        </button>
                    </div>

                    {/* clear tree */}
                    <div className="dropdown-menu-item clear-tree-menu">
                        Clear Tree
                        <button name="clearButton" onClick={handleButtonPress}>
                            Clear 
                        </button>
                    </div> 

                    <div className="dropdown-control" >
                        Animations
                    </div>

                    <div className="dropdown-menu-item speed-change">
                    Animation Speed
                <input 
                    type="range"
                    className="speedInput"
                    onChange={handleSpeedChange} 
                    onMouseUp={handleAnimationSpeed}
                    min={0.1} 
                    max={1} 
                    step={0.1} 
                    value={speedInput} 
                > 
                </input>
            </div>
            </div>
            }
            
             

        </div>
           
           
    )
}