import {useState,useContext, useEffect} from "react";
import "./TreeOperationsPanel.css";
import { UserContext } from "../../context/UserContext";


export default function TreeOperationsPanel({inputsDisabled, addNode, searchForNode, traverseTree, saveTree, treeFromCSV, treeFromFile, clearTree, randomTree, minNode, maxNode, setShowModal, setModalContent}){

    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [deleteInput, setDeleteInput] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const [speedInput, setSpeedInput] = useState(1);
    const [selectedCSV, setSelectedCSV] = useState(null);
    const [selectedTXT, setSelectedTXT] = useState(null);

    const [open, setOpen] = useState(true);

    const handleCSVInput = e => {
        setSelectedCSV(e.target.files[0]);
    };

    const handleTXTInput = e => {
        setSelectedTXT(e.target.files[0]);
    }

    useEffect(() => {
        setUserContext(oldValues => {
            return {...oldValues, animationSpeed: 1 - (speedInput)};
        });
    }, []);


    const handleSpeedChange = e => {
        setSpeedInput(e.target.value);
    };

    const handleAnimationSpeed = () => {


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
                setShowModal(true);
                setModalContent({title: "Save Tree to File", main: "Click below to save tree to file", approveFunction: saveTree});
                break;
            case "generateButton":
                treeFromCSV(selectedCSV);
                break;
            case "txtGenerateButton":
                treeFromFile(selectedTXT);
                break;
            case "clearButton":
                setShowModal(true);
                setModalContent({title: "Clear Tree", main: "Are you sure you want to remove all nodes?", approveFunction: clearTree});
                break;
            case "randomTreeButton":
                randomTree();
                break;
            case "getMinButton":
                minNode();
                break;
            case "getMaxButton":
                maxNode();
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
                            disabled={inputsDisabled}
                        />
                        <button  
                            name="addButton" 
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
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
                            disabled={inputsDisabled}
                        />
                        <button  
                            name="searchButton" 
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
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
                            disabled={inputsDisabled}
                        />
                        <button  
                            name="deleteButton" 
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
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
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
                        In-Order
                        </button>
                        <button  
                            name="preOrder" 
                            className="middle-child"
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
                        Pre-Order
                        </button>
                        <button  
                            name="postOrder" 
                            className="last-child"
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
                        Post-Order
                        </button>
                        </div>
                        
                    </div>

                    {/* get min */}
                    <div className="dropdown-menu-item traverse-tree-menu">
                        Get Min
                        <button  
                            name="getMinButton" 
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
                        Find
                        </button>
                    </div>

                    {/* get max */}
                    <div className="dropdown-menu-item traverse-tree-menu">
                        Get Max
                        <button  
                            name="getMaxButton" 
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
                        Find
                        </button>
                    </div>

                    <div className="dropdown-control" >
                        Tree
                    </div>

                    {/* generate random tree */}
                    <div className="dropdown-menu-item random-tree-menu">
                        Generate Random Tree
                        <button name="randomTreeButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Generate
                        </button>
                    </div>

                    {/* csv tree generation */}
                    <div className="dropdown-menu-item csv-tree-menu">
                        Generate Using CSV
                        <input className="fileInput" id="fileInput" type="file" accept="*.csv" onChange={handleCSVInput} disabled={inputsDisabled}/>
                        <label className="fileInputLabel" for="fileInput">{selectedCSV ? selectedCSV.name : "Upload"}</label>
                        <button  name="generateButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Generate
                        </button>
                    </div>

                    {/* clear tree */}
                    <div className="dropdown-menu-item clear-tree-menu">
                        Clear Tree
                        <button className="button-warning" name="clearButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Clear 
                        </button>
                    </div> 

                    {/* save to file */}
                    <div className="dropdown-menu-item clear-tree-menu">
                        Save to file
                        <button  name="saveButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Save
                        </button>
                    </div> 

                    {/* load from file */}
                    <div className="dropdown-menu-item clear-tree-menu">
                        Load from file
                        <input className="fileInput" id="txtFileInput" type="file" accept="*.txt" onChange={handleTXTInput} disabled={inputsDisabled}/>
                        <label className="fileInputLabel" for="txtFileInput">{selectedTXT ? selectedTXT.name : "Upload"}</label>
                        <button  name="txtGenerateButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Generate
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
                    disabled={inputsDisabled}
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