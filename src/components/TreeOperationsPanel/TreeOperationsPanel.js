import {useState,useContext, useEffect} from "react";
import "./TreeOperationsPanel.css";
import { UserContext } from "../../context/UserContext";


export default function TreeOperationsPanel({inputsDisabled, addNode, searchForNode, deleteNode, traverseTree, saveTree, treeFromCSV, treeFromFile, clearTree, randomTree, minNode, maxNode, setShowModal, setModalContent}){

    // user context
    const [userContext, setUserContext] = useContext(UserContext);

    // input state variables
    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [deleteInput, setDeleteInput] = useState("");
    const [speedInput, setSpeedInput] = useState(1);
    const [selectedCSV, setSelectedCSV] = useState(null);
    const [selectedTXT, setSelectedTXT] = useState(null);

    // additional sate variables
    const [lastFocused, setLastFocused] = useState(null);
    const [open, setOpen] = useState(true);


    // state change methods
    const handleCSVInput = e => {
        setSelectedCSV(e.target.files[0]);
    };

    const handleTXTInput = e => {
        setSelectedTXT(e.target.files[0]);
    };

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

    const handleNumberInput = (e) => {
        // handle number input, set state, disallow length above 4

        if(e.target.value.length >= 5){
            e.target.value = e.target.value.slice(0,4);
            return;
        } 

        if(e.target.name==="addInput") setAddInput(e.target.value);
        if(e.target.name==="searchInput") setSearchInput(e.target.value);
        if(e.target.name==="deleteInput") setDeleteInput(e.target.value);
    
        
      };

      const handleDropDownClick = () => {
          // collapse/show panel
            setOpen( open => !open);
      };

    // set speed input context on first render
    useEffect(() => {
        setUserContext(oldValues => {
            return {...oldValues, animationSpeed: 1 - (speedInput)};
        });
    }, []);

    // when inputsDisabled changes, if lastFocused, focus back on this input
    useEffect(() => {
        lastFocused && lastFocused.focus();
    },[inputsDisabled]);



    // handle form send via key and click
    const handleKeypress = e => {
        if(e.key === "Enter"){
            if(e.target.name === "addInput"){
                if(addInput !== ""){
                    addNode(addInput);
                    setAddInput("");
                    e.target.focus();
                  } 
            } else if(e.target.name === "searchInput"){
                if(searchInput !== ""){
                    searchForNode(searchInput);
                    setSearchInput("");
                    e.target.focus();
                }
            } else if(e.target.name === "deleteInput"){
                if(deleteInput !== ""){
                    deleteNode(deleteInput);
                    setDeleteInput("");
                    e.target.focus();
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
            case "deleteButton":
                deleteNode(deleteInput);
                setDeleteInput("");
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

     

    return (
        <div className="operations-drop-down">
            <div className="dropdown-control" onClick={handleDropDownClick}>
                Operations 
                    <svg className="svg-arrow" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                        {open ? <path xmlns="http://www.w3.org/2000/svg" d="M12.354 8.854l5.792 5.792a.5.5 0 01-.353.854H6.207a.5.5 0 01-.353-.854l5.792-5.792a.5.5 0 01.708 0z"/> : <path xmlns="http://www.w3.org/2000/svg" d="M11.646 15.146L5.854 9.354a.5.5 0 01.353-.854h11.586a.5.5 0 01.353.854l-5.793 5.792a.5.5 0 01-.707 0z"/>}
                    </svg>
            </div>
            {open && 
                <div className="dropdown-content">

                    {/* add node */}
                    <div className="dropdown-menu-item insert-node-menu">
                    <div className="dropdown-menu-item-label">Insert</div>
                        <input
                            type="number" 
                            autoComplete="off" 
                            value={addInput}  
                            name="addInput" 
                            onChange={handleNumberInput} 
                            onKeyPress={handleKeypress}
                            disabled={inputsDisabled}
                            onFocus={e => setLastFocused(e.target)}

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
                    <div className="dropdown-menu-item-label">Search</div>
                        <input
                            type="number" 
                            autoComplete="off" 
                            value={searchInput}  
                            name="searchInput" 
                            onChange={handleNumberInput} 
                            onKeyPress={handleKeypress}
                            disabled={inputsDisabled}
                            onFocus={e => setLastFocused(e.target)}
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
                    <div className="dropdown-menu-item-label">Delete</div>
                        <input
                            type="number" 
                            autoComplete="off" 
                            value={deleteInput}  
                            name="deleteInput" 
                            onChange={handleNumberInput} 
                            onKeyPress={handleKeypress}
                            disabled={inputsDisabled}
                            onFocus={e => setLastFocused(e.target)}
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
                    <div className="dropdown-menu-item-label">Traverse</div>
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
                    <div className="dropdown-menu-item-label">Get Min</div>
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
                    <div className="dropdown-menu-item-label">Get Max</div>
                        <button  
                            name="getMaxButton" 
                            onClick={handleButtonPress}
                            disabled={inputsDisabled}
                            >
                        Find
                        </button>
                    </div>

                    <div className="dropdown-header" >
                        Tree
                    </div>

                    {/* generate random tree */}
                    <div className="dropdown-menu-item random-tree-menu">
                    <div className="dropdown-menu-item-label">Generate Random Tree</div>
                        <button name="randomTreeButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Generate
                        </button>
                    </div>

                    {/* csv tree generation */}
                    <div className="dropdown-menu-item csv-tree-menu">
                    <div className="dropdown-menu-item-label">Generate Using CSV</div>
                        <input className="fileInput" id="fileInput" type="file" accept="*.csv" onChange={handleCSVInput} disabled={inputsDisabled}/>
                        <label className="fileInputLabel" htmlFor="fileInput">{selectedCSV ? selectedCSV.name : "Upload"}</label>
                        <button  name="generateButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Generate
                        </button>
                    </div>

                    {/* clear tree */}
                    <div className="dropdown-menu-item clear-tree-menu">
                    <div className="dropdown-menu-item-label">Clear Tree</div>
                        <button className="button-warning" name="clearButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Clear 
                        </button>
                    </div> 

                    {/* save to file */}
                    <div className="dropdown-menu-item clear-tree-menu">
                    <div className="dropdown-menu-item-label">Save To File</div>
                        <button  name="saveButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Save
                        </button>
                    </div> 

                    {/* load from file */}
                    <div className="dropdown-menu-item clear-tree-menu">
                    <div className="dropdown-menu-item-label">Load From File</div>
                        <input className="fileInput" id="txtFileInput" type="file" accept="*.txt" onChange={handleTXTInput} disabled={inputsDisabled}/>
                        <label className="fileInputLabel" htmlFor="txtFileInput">{selectedTXT ? selectedTXT.name : "Upload"}</label>
                        <button  name="txtGenerateButton" onClick={handleButtonPress} disabled={inputsDisabled}>
                            Generate
                        </button>
                    </div> 


                    <div className="dropdown-header" >
                        Animations
                    </div>

                    <div className="dropdown-menu-item speed-change">
                    <div className="dropdown-menu-item-label">Animation Speed</div>
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