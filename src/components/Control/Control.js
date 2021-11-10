import {ListItem, ListItemIcon, ListItemText, Popper, Paper, Button, TextField, Slider, Typography, Divider, Input, ClickAwayListener} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NatureIcon from '@mui/icons-material/Nature';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Control({type, props}){

    const [anchorEl, setAnchorEl] = useState(null);
    const [userContext, setUserContext] = useContext(UserContext);

    let popperTrue = false;

    const getContent = () => {

        switch(type){
            case "Tree Type":
                popperTrue = true;
                return ( 
                    <NatureIcon fontSize="large"/>
                );
            case "New Node":
                popperTrue = true;
                return (
                <AddCircleOutlineIcon fontSize="large"/>
                );
            case "Search":
                popperTrue = true;
                return (
                    <SearchIcon fontSize="large"/> 
                );
            case "In Order":
                return (
                    <NordicWalkingIcon fontSize="large"/>
                );
            case "Pre Order":
                return (
                    <NordicWalkingIcon fontSize="large"/> 
                );
            case "Post Order":
                return (
                    <NordicWalkingIcon fontSize="large"/>
                );
            case "Animation Speed":
                popperTrue = true;
                return (
                    <SpeedIcon fontSize="large"/>
                );
            case "Save Tree":
                popperTrue = true;
                return (
                    <SaveAltIcon fontSize="large"/>
                );
            case "Upload CSV":
                popperTrue = true;
                return (
                    <UploadFileIcon fontSize="large"/>
                );
        }
    };

    const handleClick = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        if(type === "In Order" || type === "Pre Order" || type === "Post Order"){
            props.handleButtonPress(e);
        }
    }

    const getPopperContent = () => {
        switch(type){
            case "Tree Type":
                return ( 
                    <>
                        <Button size="small" color="inherit" variant="outlined" data-close={true} component={Link} to={"/bst"}>BST</Button>
                        <Button size="small" color="inherit" variant="outlined" data-close={true} component={Link} to={"/avl"}>AVL</Button>
                        <Button size="small" color="inherit" variant="outlined" data-close={true} component={Link} to={"/red-black"}>Red-Black</Button>
                    </>
                )
            case "New Node":
                return (
                    <>
                    <TextField className="popper-menu-item-input" size="small"  type="number" label="New node" autoComplete="off" value={props.addInput} variant="filled" name="addInput" onChange={e => props.setAddInput(e.target.value)} inputProps={{maxLength: 4, "data-close": false }}  onKeyPress={props.handleKeypress}/>
                    <Button size="small" className="popper-menu-item-button" data-close={false} variant="contained" name="addButton" onClick={props.handleButtonPress}>Add</Button>
                    </>
                )
            case "Search":
                return (
                    <>
                    <TextField  className="popper-menu-item-input" size="small" type="number" label="Search" autoComplete="off"  value={props.searchInput} variant="filled" name="searchInput" onChange={e => props.setSearchInput(e.target.value)} inputProps={{maxLength: 4, "data-close": false }} onKeyPress={props.handleKeypress}/>
                    <Button size="small" className="popper-menu-item-button" data-close={false} variant="contained" name="searchButton" onClick={props.handleButtonPress}>Search</Button>
                    </>
                )

            case "Animation Speed":
                return (
                    <>
                    <Slider onChange={props.handleSpeedChange} data-close={false} onChangeCommitted={props.handleAnimationSpeed} min={0.1} max={1} step={0.1} value={props.speedInput} valueLabelDisplay="auto" marks/>
                    </>
                )
            case "Save Tree":
                return (
                    <>
                    <TextField value={props.saveInput} onChange={e => props.setSaveInput(e.target.value)} className="popper-menu-item-input" data-close={false} size="small" type="text" label="TreeName" autoComplete="off" variant="filled" name="treeNameInput" inputProps={{"data-close":false}}/>
                    <Button sx={{height: "30px"}} data-close={false} onClick={props.handleButtonPress} variant="contained" name="saveButton" size="small">Save</Button>
                    </>
                )
            case "Upload CSV":
                return(
                    <>
                    <label htmlFor="contained-button-file" data-close={false}>
                        <Input sx={{height: "30px"}} inputProps={{"data-close": false}} style={{display: "none"}} accept="*.csv" id="contained-button-file" type="file" onChange={props.handleFileInput} size="small"/>
                        <Button sx={{height: "30px"}} data-close={false} variant="contained" component="span" size="small">
                        Upload
                        </Button>
                    </label>
                    <Button sx={{height: "30px"}} data-close={false} variant="contained" size="small"  onClick={props.handleButtonPress} name="generateButton">
                        Generate
                    </Button>
                    </>
                )
                    
        }
    }

    
    const open = Boolean(anchorEl);
    const id = open ? type : undefined;

    const handleClickAway = (e) => {
        if(e.target.getAttribute("data-close") === null || e.target.getAttribute("data-close") === true){
            setAnchorEl(null);
        } else {
            return;
        }
        
    }


    return (
        <>
        <ClickAwayListener onClickAway={handleClickAway}>
        {type === "Save Tree" && !userContext.details ? 
            <>
            </>
        :
        <ListItem button aria-describedby={id} name={type} onClick={handleClick} sx={{height: "65px"}}>
            <ListItemIcon>
                {getContent()}
            </ListItemIcon>
            <ListItemText primary={type}/>
        </ListItem>
        }   
        </ClickAwayListener>


        {popperTrue && 
        
        <Popper id={id} open={open} anchorEl={anchorEl} placement="right" data-close={false}>
                    <Paper data-close={false} sx={{width: "350px", height: "65px", display: "flex", justifyContent: "space-evenly", alignItems: "center", paddingLeft: "10px", paddingRight: "10px"}}>
                        {getPopperContent()}
                    </Paper>
            </Popper>
       
            
           
        }
        
        </>
        

        
    )
}