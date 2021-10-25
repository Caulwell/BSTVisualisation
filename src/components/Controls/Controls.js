import {useState, useRef, useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {TextField, Button, Popper, Grow, Paper, Divider, ButtonGroup, Input, Stack} from "@mui/material";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import "./Controls.css";
import { UserContext } from "../../context/UserContext";


export default function Controls({addNode, searchForNode, traverseTree, saveTree, treeFromCSV}){

    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    

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
          console.log(e.target.name);
          switch(e.target.name){
            case "addButton":
                addNode(addInput);
                setAddInput("");
                break;
            case "searchButton":
                searchForNode(searchInput);
                setSearchInput("");
                break;
            case "inOrderButton":
                traverseTree("in");
                break;
            case "preOrderButton":
                traverseTree("pre");
                break;
            case "postOrderButton":
                traverseTree("post");
                break;
            case "saveButton":
                saveTree();
                break;
            case "generateButton":
                treeFromCSV(selectedFile);
                break;

          }
        
      };

      const handleToggle = () => {
          setOpen(prevOpen => !prevOpen);
      };

      const handleFileInput = e => {
          console.log(e.target.files);
          setSelectedFile(e.target.files[0]);
          setIsFilePicked(true);
      };

    return (

        <div className="controls">

            <BuildOutlinedIcon 
            ref={anchorRef} 
            fontSize="50px"
            color="action"
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}/>

            <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="right-end"
            transition
            disablePortal
            className="popper-menu"
            >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
                >
                <Paper>
                        <div className="popper-menu">
                        
                            <Divider>Insert</Divider>
                            <div className=" popper-menu-item">
                                <TextField className="popper-menu-item-input" size="small" type="number" label="New node" autoComplete="off" value={addInput} variant="filled" name="addInput" onChange={e => setAddInput(e.target.value)} inputProps={{maxLength: 4, }}  onKeyPress={handleKeypress}/>
                                <Button className="popper-menu-item-button" variant="contained" name="addButton" onClick={handleButtonPress}>Add</Button>
                            </div>
                            <Divider>Search</Divider>
                            <div className="popper-menu-item">
                                <TextField className="popper-menu-item-input" size="small" type="number" label="Search" autoComplete="off"  value={searchInput} variant="filled" name="searchInput" onChange={e => setSearchInput(e.target.value)} inputProps={{maxLength: 4, }} onKeyPress={handleKeypress}/>
                                <Button className="popper-menu-item-button" variant="contained" name="searchButton" onClick={handleButtonPress}>Search</Button>
                            </div>
                            <Divider>Traverse</Divider>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button onClick={handleButtonPress} name="inOrderButton">In-Order</Button>
                                <Button onClick={handleButtonPress} name="preOrderButton">Pre-Order</Button>
                                <Button onClick={handleButtonPress} name="postOrderButton">Post-Order</Button>
                            </ButtonGroup>

                            {userContext.token && 
                            <>
                                <Divider>Save Tree</Divider>
                                <Button onClick={handleButtonPress} variant="contained" name="saveButton">Save</Button>
                            </>
                            }

                            <Divider>CSV</Divider>
                            
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="contained-button-file">
                                    <Input style={{display: "none"}} accept="*.csv" id="contained-button-file" type="file" onChange={handleFileInput}/>
                                    <Button variant="contained" component="span">
                                    Upload
                                    </Button>
                                </label>
                                <Button variant="contained"  onClick={handleButtonPress} name="generateButton">
                                    Generate
                                </Button>
                            </Stack>

                            {isFilePicked ? (
                                <p>Filename: {selectedFile.name}</p>
                            ) : (
                                <p>Select a file</p>
                            )}

                        </div>
                </Paper>
                </Grow>
            )}
            </Popper>

        </div>
        
        
    )
}