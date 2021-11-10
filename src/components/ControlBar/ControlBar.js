import {useState, useRef, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Divider, Drawer, Toolbar, List, Typography} from "@mui/material";
import "./ControlBar.css";
import Control from "../Control/Control";
import { UserContext } from "../../context/UserContext";


export default function Controls({addNode, searchForNode, traverseTree, saveTree, treeFromCSV}){

    const [addInput, setAddInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState();
    const [speedInput, setSpeedInput] = useState(0.5);
    const [saveInput, setSaveInput] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);

    const controls = ["Tree Type", "New Node", "Search", "In Order", "Pre Order", "Post Order", "Upload CSV", "Animation Speed", "Save Tree"];

    const drawerWidth = 240;
    

    useEffect(() => {
        setUserContext(oldValues => {
            return {...oldValues, animationSpeed: speedInput}
        });
    }, []);

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
            case "In Order":
                traverseTree("in");
                break;
            case "Pre Order":
                traverseTree("pre");
                break;
            case "Post Order":
                traverseTree("post");
                break;
            case "saveButton":
                saveTree(saveInput);
                break;
            case "generateButton":
                treeFromCSV(selectedFile);
                break;
            default:
                break;

          }
        
      };

      const handleFileInput = e => {
          console.log(e.target.files);
          setSelectedFile(e.target.files[0]);
          setIsFilePicked(true);
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

    return (


        <Drawer sx={{width: drawerWidth, 
                    flexShrink: 0, 
                    "& .MuiDrawer-paper": {width: drawerWidth, boxSizing: "border-box",},}}
                variant="permanent"
                anchor="left"
        >
        <Toolbar>
        <Typography variant="h6" component={Link} to={"/"}>
                TreeVis
              </Typography>
        </Toolbar>
        <Divider/>
        <List>
            {controls.map((control, index) => {
                return (<Control type={control} key={index}
                    props={control === "New Node" ? {addInput, setAddInput, handleKeypress, handleButtonPress} :
                            control === "Search" ? {searchInput, setSearchInput, handleKeypress, handleButtonPress} :
                            control === "Animation Speed" ? {speedInput, handleSpeedChange, handleAnimationSpeed} :
                            control === "Save Tree" ? {handleButtonPress, saveInput, setSaveInput} :
                            (control === "In Order" || control === "Pre Order" || control === "Post Order") ? {handleButtonPress} :
                            control === "Upload CSV" ? {handleButtonPress, handleFileInput} :
                            null
                    }   
                />)
                
            })}
        </List>
        </Drawer>
        
        
    )
}